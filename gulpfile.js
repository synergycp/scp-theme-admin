var gulp = require("gulp"),
  ngGulp = require("scp-ng-gulp")(require("gulp"));
($ = require("gulp-load-plugins")()),
  (browserSync = require("browser-sync").create()),
  (reload = browserSync.reload),
  (PluginError = $.util.PluginError);

var createVersions = ngGulp.require("create-versions")();

var Q = require("q");
var _ = require("lodash");
var streamToPromise = require("stream-to-promise");

// production mode (see build task)
var isProduction = false;
// styles sourcemaps
var useSourceMaps = false;

// MAIN PATHS
var paths = {
  app: "public/app/",
  markup: "app/",
  scripts: "app/",
  public: "public/",
  assets: "resources/assets/",
};

// VENDOR CONFIG
var vendor = {
  // vendor scripts required to start the app
  base: {
    source: require("./vendor.base.json"),
    js: "base.js",
    css: "base.css",
  },
  // vendor scripts to make the app work. Usually via lazy loading
  app: {
    source: require("./vendor.json"),
    dest: "public/vendor",
  },
};

// SOURCES CONFIG
var source = {
  index: "node_modules/scp-angle/dist/index.html",
  scripts: [
    paths.scripts + "app.module.js",

    // modules
    paths.scripts + "**/*.module.js",
    paths.scripts + "**/*.js",
  ],
  templates: {
    views: [paths.markup + "**/*.pug"],
  },
  assets: [paths.assets + "**/*"],
};

// BUILD TARGET CONFIG
var build = {
  scripts: paths.app + "js",
  styles: paths.app + "css",
  assets: paths.public + "assets",
  templates: {
    views: paths.app,
  },
};

// PLUGINS OPTIONS

var pugOptions = {
  doctype: "html",
  basedir: __dirname,
  pretty: false,
};

var filter = {
  js: makeJsFilter,
  css: makeCssFilter,
};

var cssnanoOpts = {
  safe: true,
  discardUnused: false, // no remove @font-face
  reduceIdents: false, // no change on @keyframes names
};

//---------------
// TASKS
//---------------

// JS APP
exports["scripts:app"] = function () {
  log("Building scripts..");
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp
    .src(source.scripts)
    .pipe($.jsvalidate())
    .on("error", handleError)
    .pipe($.if(useSourceMaps, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.concat("app.js"))
    .pipe($.ngAnnotate())
    .on("error", handleError)
    .pipe(
      $.if(
        isProduction,
        $.uglify({
          preserveComments: "some",
        })
      )
    )
    .on("error", handleError)
    .pipe($.if(useSourceMaps, $.sourcemaps.write("./")))
    .pipe(gulp.dest(build.scripts))
    .pipe(
      reload({
        stream: true,
      })
    );
};

// Build the base script to start the application from vendor assets
gulp.task("vendor:base", function () {
  log("Copying base vendor assets..");
  var jsFilter = filter.js();
  var cssFilter = filter.css();

  return (
    gulp
      .src(vendor.base.source, { follow: true })
      .pipe($.expectFile(vendor.base.source))
      .pipe(jsFilter)
      .pipe(
        $.if(
          useSourceMaps,
          $.sourcemaps.init({ loadMaps: true, largeFile: true })
        )
      )
      .pipe($.concat(vendor.base.js))
      //TODO (breaks) .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
      .pipe($.if(useSourceMaps, $.sourcemaps.write("./")))
      .pipe(gulp.dest(build.scripts))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.concat(vendor.base.css))
      .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
      .pipe(gulp.dest(build.styles))
      .pipe(cssFilter.restore())
      .pipe(
        reload({
          stream: true,
        })
      )
  );
});

// copy files from vendor folder into the app vendor folder
gulp.task("vendor:app", function (done) {
  if (!vendor.app.source.length) {
    done();
    return;
  }

  log("Copying vendor assets..");
  var jsFilter = filter.js();
  var cssFilter = filter.css();

  return (
    gulp
      .src(vendor.app.source, {
        base: "./",
        follow: true,
      })
      .pipe($.expectFile(vendor.app.source))
      .pipe(jsFilter)
      //  .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
      .pipe(cssFilter.restore())
      .pipe(gulp.dest(vendor.app.dest))
      .pipe(
        reload({
          stream: true,
        })
      )
  );
});

gulp.task("vendor:exports", function (done) {
  log("Copying vendor exports..");
  var Exports = require("./exports");

  Q.all(_.map(Exports, resolve)).then(done.bind(done, null), done);

  function resolve(Export) {
    return Export.all().then(makeTasks);

    function makeTasks(exported) {
      return Q.all(_(exported).map(makeTask).map(streamToPromise).value());
    }

    function makeTask(exp) {
      var jsFilter = filter.js();
      var cssFilter = filter.css();
      var opts = {
        cwd: exp.dirname,
        base: exp.dirname,
        follow: true,
      };

      console.log(exp, opts);
      // exp.files = _.map(exp.files, function (file) {
      //   if (_.startsWith(file, __dirname)) {
      //     return file.substr(__dirname.length + 1);
      //   }
      //   return file;
      // });
      return (
        gulp
          .src(exp.files, opts)
          .pipe($.expectFile(opts, exp.files))
          .pipe($.rename(addPrefixFolder.bind(null, exp.name)))
          // .pipe(jsFilter)
          //  .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
          // .pipe(jsFilter.restore())
          // .pipe(cssFilter)
          // .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
          // .pipe(cssFilter.restore())
          .pipe(gulp.dest(vendor.app.dest))
          .pipe(
            reload({
              stream: true,
            })
          )
      );
    }
  }
});

// VENDOR BUILD
gulp.task(
  "vendor",
  gulp.series(["vendor:base", "vendor:app", "vendor:exports"])
);

function addPrefixFolder(folder, file) {
  file.dirname = folder + "/" + file.dirname;

  return file;
}

// JADE
exports["templates:views"] = function () {
  log("Building views.. ");

  return gulp
    .src(source.templates.views)
    .pipe(
      $.if(
        !isProduction,
        $.changed(build.templates.views, {
          extension: ".html",
        })
      )
    )
    .pipe($.pug(pugOptions))
    .on("error", handleError)
    .pipe(gulp.dest(build.templates.views))
    .pipe(
      reload({
        stream: true,
      })
    );
};

gulp.task("templates:index", function () {
  log("Copying index...");

  return gulp.src(source.index).pipe(gulp.dest(paths.public));
});

exports["assets:raw"] = () =>
  gulp
    .src(source.assets)
    .pipe(gulp.dest(build.assets))
    .pipe(
      reload({
        stream: true,
      })
    );

// Serve files with auto reaload
gulp.task("browsersync", function () {
  log("Starting BrowserSync..");

  browserSync.init({
    notify: false,
    server: {
      baseDir: "public/",
    },
    port: 8001,
  });
});

// Remove all files from the build paths
gulp.task("clean", function (done) {
  var delconfig = [].concat(
    build.styles,
    build.scripts,
    build.templates.views + "views",
    build.templates.views + "pages",
    vendor.app.dest
  );

  log("Cleaning: " + $.util.colors.blue(delconfig));
  // force: clean files outside current directory
  del(
    delconfig,
    {
      force: true,
    },
    done
  );
});

gulp.task("create-versions", createVersions);

// build with sourcemaps (no minify)
gulp.task("usesources", function (done) {
  useSourceMaps = true;
  done();
});

//---------------
// MAIN TASKS
//---------------

gulp.task("prod", function (done) {
  log("Starting production build...");
  isProduction = true;
  done();
});

gulp.task(
  "assets",
  gulp.parallel([
    exports["scripts:app"],
    exports["templates:views"],
    "templates:index",
    exports["assets:raw"],
  ])
);

// build for production (minify)
gulp.task(
  "build",
  gulp.series(
    [
      "prod",
      gulp.parallel(["vendor", "assets"]),
      isProduction ? "create-versions" : null,
    ].filter((e) => !!e)
  )
);

//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task("watch", function (done) {
  log("Watching source files..");

  gulp.watch(source.scripts, exports["scripts:app"]);
  gulp.watch(source.templates.views, exports["templates:views"]);
  gulp.watch(source.assets, exports["assets:raw"]);
  done();
});

// default (no minify)
gulp.task("default", gulp.series(["vendor", "assets", "watch"]));

gulp.task("sourcemaps", gulp.series(["usesources", "default"]));

// Server for development
gulp.task(
  "serve",
  gulp.series(["usesources", "default", "create-versions", "browsersync", done])
);

// Server for production
gulp.task("serve-prod", gulp.series(["build", "browsersync", done]));

/////////////////////

function done(next) {
  log("************");
  log(
    "* All Done * You can start editing your code, BrowserSync will update your browser after any change.."
  );
  log("************");
  next();
}

// Error handler
function handleError(err) {
  log(err.toString());
  this.emit("end");
}

// log to console using
function log(msg) {
  $.util.log($.util.colors.blue(msg));
}

function makeJsFilter() {
  return $.filter("**/*.js", {
    restore: true,
  });
}

function makeCssFilter() {
  return $.filter("**/*.css", {
    restore: true,
  });
}
