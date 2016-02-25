#!/usr/bin/env node --harmony-proxies
var path = require('path');
process.env.NODE_PATH = process.cwd()+path.delimiter+ process.cwd() + '/node_modules';
require('module').Module._initPaths();

var ctx = require('ctx');

//process.on('uncaughtException',function(){
//    ctx.logger.info('exited');
//});
ctx.abort_operation('DIE!');
//ctx.logger.info('after abort');

//ctx.retry_operation('Live Again!', 0);
