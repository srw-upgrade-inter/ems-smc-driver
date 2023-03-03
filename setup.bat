@echo off

node node-gyp-python.js

node npm-python.js

node-gyp configure

node-gyp configure --msvs_version=2017

node-gyp build

