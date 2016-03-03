#!/usr/bin/env node

var path = require('path');
process.env.NODE_PATH = process.cwd()+path.delimiter+ process.cwd() + '/node_modules';
require('module').Module._initPaths();

var expect = require('expect.js');
var ctx = require('ctx');

//source
expect(ctx.source.instance.id).to.match(/^tests_.{5}$/);
expect(ctx.source.instance.host_ip).to.be('10.10.1.10');
expect(ctx.source.instance.runtime_properties.eden).to.be('heyyyy!!!');


//target
expect(ctx.target.instance.id).to.match(/^my_host_.{5}$/);
expect(ctx.target.instance.host_ip).to.be('10.10.1.10');
expect(ctx.target.instance.runtime_properties.eden).to.eql({});
