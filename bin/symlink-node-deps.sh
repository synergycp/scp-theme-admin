#!/usr/bin/env sh

npm i || exit 1

ls node_modules | grep scp- | while read DEP
do
  DEST=node_modules/$DEP
  SRC=../../$DEP
  echo "Symlinking $DEST to $SRC"
  rm -r $DEST
  ln -s $SRC $DEST || exit 1
done

