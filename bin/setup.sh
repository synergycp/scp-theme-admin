#!/bin/bash

sudo apt install -y ruby-dev dirmngr || exit 1

gpg2 --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

curl -L https://get.rvm.io | bash -s stable || exit 1
source ~/.rvm/scripts/rvm || exit 1
echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc

rvm autolibs enable
rvm install 2.1.2
rvm use 2.1.2 --default
ruby -v

gem install sass compass
