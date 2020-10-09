#!/usr/bin/env sh

npm i

ls node_modules | grep scp- | while read DEP
do
  DEST=node_modules/$DEP
  SRC=../../$DEP
  echo "Symlinking $DEST to $SRC"
  rm -r $DEST
  ln -s $SRC $DEST
done

