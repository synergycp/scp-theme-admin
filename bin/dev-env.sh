#!/usr/bin/env bash

. ~/.nvm/nvm.sh

while [ ! -f ../dependencies/tmp/init ]; do
  sleep 2
done

exec ./node_modules/.bin/gulp serve