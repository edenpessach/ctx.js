'use strict';
var child_process = require('child_process');
var base = Symbol();

function defineGetters(object, base, properties) {
    properties.forEach(function (property) {
        Object.defineProperty(object, property, {
            get: function () {
                base = base ? base + ' ' : '';
                return exec(base + property, true);
            }
        });
    });
}

function exec(cmd, json, args){
    var ctx = json? 'ctx -j ' : 'ctx ';
    cmd = args? ctx+cmd+" '@"+JSON.stringify(args)+"'" : ctx+cmd;
    var output = child_process.execSync(cmd).toString();
    return json ? JSON.parse(output) : output;
}

function logMessage(base, level, message){
    message = typeof message !== 'string' ? JSON.stringify(message) : message;
    exec(base+' '+level, false, message);
}

class Logger {
    constructor(){
        this[base]= 'logger';
    }
    debug(message) {
        logMessage(this[base], 'debug', message);
    };
    info(message) {
        logMessage(this[base], 'info', message);
    };
    warn(message) {
        logMessage(this[base], 'warn', message);
    };
    warning(message) {
        logMessage(this[base], 'warning', message);
    };
    error(message) {
        logMessage(this[base], 'error', message);
    };
    fatal(message) {
        logMessage(this[base], 'fatal', message);
    };
    critical(message) {
        logMessage(this[base], 'critical', message);
    };
}

class NodeContext {
    constructor(){
        this[base] = 'node';
        defineGetters(this, this[base], ['id', 'name', 'properties', 'type', 'type_hierarchy']);
    }
}

//TODO this[base] is not private allthroughout the code.
class InstanceContext {
    constructor(){
        var self = this;
        this[base] = 'instance';
        //TODO 'relationships' don't work currently.
        defineGetters(this, this[base], ['id', 'host_ip', 'relationships'], {});

        this.runtime_properties = Proxy.create({
            //TODO undefined properties return {}
            get: function(reciever, name){
                return exec(self[base]+' runtime_properties '+name, true);
            },
            set: function(obj, prop, value){
                return exec(self[base]+' runtime_properties '+prop, false, value);
            }
        },{});
    }

    update() {
        exec(this[base] + ' update');
    }
}

class OperationContext{
    constructor(){
        this[base] = 'operation';
        defineGetters(this, this[base], ['name', 'retry_number', 'max_retries']);
    };

    //This is deprecated, should use retry_execution instead.
    retry(message, retry_after){
        exec(this[base]+' retry', false, {message: message, retry_after: retry_after});
        //process.exit(1);
    }
}

class CapabilitiesContext{
    constructor(){
        this[base] = 'capabilities';
        defineGetters(this, this[base], ['get_all']);
    };
}

class BlueprintContext{
    constructor(){
        this[base] = 'blueprint';
        defineGetters(this, this[base], ['id']);
    };
}

class DeploymentContext{
    constructor(){
        this[base] = 'deployment';
        defineGetters(this, this[base], ['id']);
    };
}

// As of 3.4 not required
//class AgentContext{
//    constructor(){
//        this[base] = 'agent';
//    };
//
//    init_script(agent_config){
//        exec(this[base]+' init_script', false, agent_config);
//    }
//}

var download_resource = function(resource_path, target_path){
    exec('download_resource', false, {resource_path: resource_path, target_path: target_path});
};

var get_resource = function(resource_path){
    return exec('get_resource', true, resource_path)
};

var get_resource_and_render = function(resource_path, template_variables){
    return exec('get_resource_and_render', true,{resource_path: resource_path, template_variables: template_variables})
};

var abort_operation = function(message){
    exec('abort_operation', false, message);
};

var retry_operation = function(message, retry_after){
    exec('retry_operation', false, {message: message, retry_after: retry_after});
};


module.exports = {
    logger: new Logger(),
    node: new NodeContext(),
    instance: new InstanceContext(),
    operation: new OperationContext(),
    capabilities: new CapabilitiesContext(),
    blueprint: new BlueprintContext(),
    deployment: new DeploymentContext(),
    //agent: new AgentContext(),
    download_resource: download_resource,
    get_resource: get_resource,
    get_resource_and_render: get_resource_and_render,
    abort_operation: abort_operation,
    retry_operation: retry_operation
};
//TODO not working currenlty - 'source' , 'target'
var contextProperties = ['host_ip', 'type', 'execution_id', 'workflow_id', 'task_id', 'task_name', 'task_target', 'task_queue', 'plugin', 'provider_context', 'bootstrap_context', 'source', 'target'];
defineGetters(module.exports, null, contextProperties);

