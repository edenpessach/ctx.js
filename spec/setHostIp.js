#!/usr/bin/env node --harmony-proxies
var path = require('path');
process.env.NODE_PATH = process.cwd()+path.delimiter+ process.cwd() + '/node_modules';
require('module').Module._initPaths();

var ctx = require('ctx');

ctx.instance.runtime_properties.ip = '10.10.1.10';
