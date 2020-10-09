#!/bin/bash

exit-with-error() {
  CODE=$?
  echo "ERROR: $@" > /dev/stderr
  exit $CODE
}

./node_modules/.bin/gulp prod build || exit-with-error "Gulp build failed"
tar -zcvf "../build/admin.tar.gz" --transform 's,^public,admin,' public || exit-with-error "Archive build failed"
