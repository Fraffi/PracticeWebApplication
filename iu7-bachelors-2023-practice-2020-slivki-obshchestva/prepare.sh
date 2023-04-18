#!/bin/bash

set -e
set -v

rm -rf ./node_modules/
rm -rf ./client/node_modules/
rm -f ./package-lock.json
rm -f ./client/package-lock.json
rm cache clean --force
rm -f ./yarn.lock
rm -f ./client/yarn.lock

yarn
yarn --cwd client install