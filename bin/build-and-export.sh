#!/usr/bin/env sh

exit_with_error() {
  CODE=$?
  echo "ERROR: $@" > /dev/stderr
  exit $CODE
}

mkdir -p build
./node_modules/.bin/gulp prod build || exit_with_error "Gulp build failed"

find public/vendor -type d -name 'node_modules' -exec rm -rf {} + 2>/dev/null || true

tar -zcvf "build/admin.tar.gz" \
  --transform 's,^public,admin,' \
  public || exit_with_error "Archive build failed"
