#!/usr/bin/env fish

while [ ! -f ../dependencies/tmp/init ]; do
  sleep 2
end

exec ./node_modules/.bin/gulp serve