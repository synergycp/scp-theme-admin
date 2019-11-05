#!/bin/bash

VERSION=$1

exit-with-error() {
  CODE=$?
  echo "ERROR: $@" > /dev/stderr
  exit $CODE
}

DEST="/scp/install.synergycp.com/bm/${VERSION}/theme/default/admin.tar.gz"
gulp prod build || exit-with-error "Gulp build failed"
tar -zcf "$DEST" --transform 's,^public,admin,' public || exit-with-error "Building archive failed"
echo "Successfully built the latest theme files to:"
echo "$DEST"
