#!/usr/bin/env node --harmony-proxies
var path = require('path');
process.env.NODE_PATH = process.cwd()+path.delimiter+ process.cwd() + '/node_modules';
require('module').Module._initPaths();

var ctx = require('ctx');

if(ctx.operation.retry_number === 0){
    ctx.retry_operation('retrying');
}

ctx.abort_operation('Success: aborting operation!');


