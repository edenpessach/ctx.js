#!/usr/bin/env node

var path = require('path');
process.env.NODE_PATH = process.cwd()+path.delimiter+ process.cwd() + '/node_modules';
require('module').Module._initPaths();

var fs = require('fs');
var expect = require('expect.js');
var ctx = require('ctx');

//logger
ctx.logger.debug('_______________________');
ctx.logger.info('_______________________');
ctx.logger.warn('_______________________');
ctx.logger.warning('_______________________');
ctx.logger.error('_______________________');
ctx.logger.fatal('_______________________');
ctx.logger.critical('_______________________');

//node
expect(ctx.node.id).to.be('tests');
expect(ctx.node.name).to.be('tests');
expect(ctx.node.properties).to.eql({"ip":"","install_agent":false,"cloudify_agent":{}});
expect(ctx.node.type).to.be('cloudify.nodes.Compute');
expect(ctx.node.type_hierarchy).to.eql(["cloudify.nodes.Root","cloudify.nodes.Compute"]);

//instance
expect(ctx.instance.id).to.match(/^tests_.{5}$/);
expect(ctx.instance.host_ip).to.be('10.10.1.10');
//ctx.logger.info(ctx.instance.relationships);
ctx.instance.runtime_properties.eden = 'heyyyy!!!';
ctx.instance.update();
expect(ctx.instance.runtime_properties.eden).to.be('heyyyy!!!');

//operation
expect(ctx.operation.name).to.be('cloudify.interfaces.lifecycle.start');
expect(ctx.operation.retry_number).to.be(0);
expect(ctx.operation.max_retries).to.be(0);
//ctx.operation.retry('AGAIN!', 2);

//capabilities
expect(JSON.stringify(ctx.capabilities.get_all)).to.match(/^{"my_host_.{5}":{"ip":"10.10.1.10"}}$/);

//blueprint
expect(ctx.blueprint.id).to.be('local');

//deployment
expect(ctx.deployment.id).to.be('local');

//context properties
//ctx.logger.info(ctx.host_ip);
expect(ctx.type).to.be('node-instance');
expect(ctx.execution_id).to.match(/^.{8}-.{4}-.{4}-.{4}-.{12}$/);
expect(ctx.workflow_id).to.be('install');
expect(ctx.task_id).to.match(/^.{8}-.{4}-.{4}-.{4}-.{12}$/);
expect(ctx.task_name).to.be('script_runner.tasks.run');
expect(ctx.task_target).to.be(null);
expect(ctx.task_queue).to.be(null);
expect(ctx.plugin).to.be('script');
expect(ctx.provider_context).to.eql({});
//ctx.logger.info(ctx.bootstrap_context);
//ctx.logger.info(ctx.target);
//ctx.logger.info(ctx.source);

//context functions
expect(ctx.get_resource('spec/resource.txt')).to.be("I'm a resource. version: {{version}}");
expect(ctx.get_resource_and_render('spec/resource.txt', {version:'1.4'})).to.be("I'm a resource. version: 1.4");
var newResourceName = 'spec/resource'+Date.now()+'.txt';
ctx.download_resource('spec/resource.txt', newResourceName);
var stats = fs.statSync(newResourceName);
expect(stats.isFile()).to.be(true);
fs.unlinkSync(newResourceName);
