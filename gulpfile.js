var
  path = require('path'),
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  gulpsync = $.sync(gulp),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  PluginError = $.util.PluginError,
  del = require('del');

var Q = require('q');
var _ = require('lodash');
var streamToPromise = require('stream-to-promise');

// production mode (see build task)
var isProduction = false;
// styles sourcemaps
var useSourceMaps = false;


// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// MAIN PATHS
var paths = {
  app: 'public/app/',
  markup: 'app/',
  styles: 'resources/sass/',
  scripts: 'app/',
  public: 'public/',
  assets: 'resources/assets/'
};

// VENDOR CONFIG
var vendor = {
  // vendor scripts required to start the app
  base: {
    source: require('./vendor.base.json'),
    js: 'base.js',
    css: 'base.css'
  },
  // vendor scripts to make the app work. Usually via lazy loading
  app: {
    source: require('./vendor.json'),
    dest: 'public/vendor'
  }
};


// SOURCES CONFIG
var source = {
  index: 'node_modules/scp-angle/dist/index.html',
  scripts: [
    paths.scripts + 'app.module.js',

    // modules
    paths.scripts + '**/*.module.js',
    paths.scripts + '**/*.js'
  ],
  templates: {
    views: [paths.markup + '**/*.pug']
  },
  assets: [paths.assets + '**/*']
};

// BUILD TARGET CONFIG
var build = {
  scripts: paths.app + 'js',
  styles: paths.app + 'css',
  assets: paths.public + 'assets',
  templates: {
    views: paths.app,
  },
};

// PLUGINS OPTIONS

var vendorUglifyOpts = {
  mangle: {
    except: ['$super'] // rickshaw requires this
  }
};

var pugOptions = {
  doctype: 'html',
  basedir: __dirname,
  pretty: false,
};

var compassOpts = {
  project: __dirname,
  css: 'public/app/css',
  sass: paths.styles,
  image: 'public/assets/img'
};

var tplCacheOptions = {
  root: 'app',
  filename: 'templates.js',
  //standalone: true,
  module: 'app.core',
  base: function (file) {
    return file.path.split('pug')[1];
  }
};

var filter = {
  js: makeJsFilter,
  css: makeCssFilter,
};

var cssnanoOpts = {
  safe: true,
  discardUnused: false, // no remove @font-face
  reduceIdents: false // no change on @keyframes names
};

//---------------
// TASKS
//---------------


// JS APP
gulp.task('scripts:app', function () {
  log('Building scripts..');
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(source.scripts)
    .pipe($.jsvalidate())
    .on('error', handleError)
    .pipe($.if(useSourceMaps, $.sourcemaps.init()))
    .pipe($.concat('app.js'))
    .pipe($.ngAnnotate())
    .on('error', handleError)
    .pipe($.if(isProduction, $.uglify({
      preserveComments: 'some'
    })))
    .on('error', handleError)
    .pipe($.if(useSourceMaps, $.sourcemaps.write()))
    .pipe(gulp.dest(build.scripts))
    .pipe(reload({
      stream: true
    }));
});


// VENDOR BUILD
gulp.task('vendor', ['vendor:base', 'vendor:app', 'vendor:exports'], function(done) {
  done();
});

// Build the base script to start the application from vendor assets
gulp.task('vendor:base', function () {
  log('Copying base vendor assets..');
  var jsFilter = filter.js();
  var cssFilter = filter.css();

  return gulp
    .src(vendor.base.source, { follow: true })
    .pipe($.expectFile(vendor.base.source))
    .pipe(jsFilter)
    .pipe($.concat(vendor.base.js))
    //TODO (breaks) .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
    .pipe(gulp.dest(build.scripts))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.concat(vendor.base.css))
    .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
    .pipe(gulp.dest(build.styles))
    .pipe(cssFilter.restore())
    .pipe(reload({
      stream: true
    }));
});

// copy files from vendor folder into the app vendor folder
gulp.task('vendor:app', function () {
  log('Copying vendor assets..');
  var jsFilter = filter.js();
  var cssFilter = filter.css();

  return gulp
    .src(vendor.app.source, {
      base: './',
      follow: true,
    })
    .pipe($.expectFile(vendor.app.source))
    .pipe(jsFilter)
    .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
    .pipe(cssFilter.restore())
    .pipe(gulp.dest(vendor.app.dest))
    .pipe(reload({
      stream: true
    }));

});

gulp.task('vendor:exports', function (done) {
  log('Copying vendor exports..');
  var Exports = require('./exports');

  Q.all(
    _.map(Exports, resolve)
  ).then(done.bind(done, null), done);

  function resolve(Export) {
    return Export
      .all()
      .then(makeTasks)
      ;


    function makeTasks(exported) {
      return Q.all(
        _(exported)
          .map(makeTask)
          .map(streamToPromise)
          .value()
      );
    }

    function makeTask(exp) {
      var jsFilter = filter.js();
      var cssFilter = filter.css();
      var opts = {
        cwd: exp.dirname,
        base: exp.dirname,
        follow: true,
      };

      return gulp
        .src(exp.files, opts)
        .pipe($.expectFile(opts, exp.files))
        .pipe($.rename(addPrefixFolder.bind(null, exp.name)))
        .pipe(jsFilter)
        .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(cssFilter.restore())
        .pipe(gulp.dest(vendor.app.dest))
        .pipe(reload({
          stream: true
        }))
        ;
    }
  }
});

function addPrefixFolder (folder, file) {
  file.dirname = folder + '/' + file.dirname;

  return file;
}

// JADE
gulp.task('templates:views', function () {
  log('Building views.. ');

  return gulp.src(source.templates.views)
    .pipe($.if(!isProduction, $.changed(build.templates.views, {
      extension: '.html'
    })))
    .pipe($.pug(pugOptions))
    .on('error', handleError)
    .pipe(gulp.dest(build.templates.views))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('templates:index', function () {
  log('Copying index...');

  return gulp
    .src(source.index)
    .pipe(gulp.dest(paths.public))
    ;
});

gulp.task('assets:raw', function () {
  return gulp
    .src(source.assets)
    .pipe(gulp.dest(build.assets))
    .pipe(reload({
      stream: true
    }));
});

//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function () {
  log('Watching source files..');

  gulp.watch(source.scripts, ['scripts:app']);
  gulp.watch(source.templates.views, ['templates:views']);
  gulp.watch(source.assets, ['assets:raw']);

});

// Serve files with auto reaload
gulp.task('browsersync', function () {
  log('Starting BrowserSync..');

  browserSync.init({
    notify: false,
    server: {
      baseDir: 'public/',
    },
    port: 8080,
  });

});

// Remove all files from the build paths
gulp.task('clean', function (done) {
  var delconfig = [].concat(
    build.styles,
    build.scripts,
    build.templates.views + 'views',
    build.templates.views + 'pages',
    vendor.app.dest
  );

  log('Cleaning: ' + $.util.colors.blue(delconfig));
  // force: clean files outside current directory
  del(delconfig, {
    force: true
  }, done);
});

//---------------
// MAIN TASKS
//---------------

// build for production (minify)
gulp.task('build', gulpsync.sync([
  'prod',
  'vendor',
  'assets'
]));

gulp.task('prod', function () {
  log('Starting production build...');
  isProduction = true;
});

// Server for development
gulp.task('serve', gulpsync.sync([
  'default',
  'browsersync'
]), done);

// Server for production
gulp.task('serve-prod', gulpsync.sync([
  'build',
  'browsersync'
]), done);

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function () {
  useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
  'vendor',
  'assets',
  'watch'
]));

gulp.task('assets', [
  'scripts:app',
  'templates:views',
  'templates:index',
  'assets:raw'
]);


/////////////////////

function done() {
  log('************');
  log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
  log('************');
}

// Error handler
function handleError(err) {
  log(err.toString());
  this.emit('end');
}

// log to console using
function log(msg) {
  $.util.log($.util.colors.blue(msg));
}

function makeJsFilter() {
  return $.filter('**/*.js', {
    restore: true
  });
}

function makeCssFilter() {
  return $.filter('**/*.css', {
    restore: true
  });
}
