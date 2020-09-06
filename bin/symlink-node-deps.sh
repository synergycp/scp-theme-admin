#!/usr/bin/env bash

npm i

ls node_modules | grep scp- | while read DEP
do
  DEST=node_modules/$DEP
  SRC=/scp/theme/$DEP
  echo "Symlinking $DEST to $SRC"
  rm -r $DEST
  ln -s $SRC $DEST
done

