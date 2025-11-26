#!/usr/bin/env sh

exit_with_error() {
  CODE=$?
  echo "ERROR: $@" > /dev/stderr
  exit $CODE
}

mkdir -p build
./node_modules/.bin/gulp prod build || exit_with_error "Gulp build failed"
tar -zcvf "build/admin.tar.gz" \
  --transform 's,^public,admin,' \
  --exclude='public/vendor/*/node_modules' \
  --exclude='node_modules' \
  public || exit_with_error "Archive build failed"
