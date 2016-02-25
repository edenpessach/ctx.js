set -e
ctx logger info $(ctx instance runtime_properties eden)

q
# ctx logger error "$(ctx -j get_resource guy.js)"
#TODO
#ctx logger error "$(ctx -j get_resource_and_render guy.js '@{\"version\": \"2\"}')"

#returns the full path to the target path
#ctx logger error "$(ctx -j download_resource guy.js ~/dev_env/guy.js)"

#only for 1.4 - script plugin , 3.4 -common plugins
#run the execSync process with a set -e;
#exit with error code 1
#ctx abort_operation 'eden'

#only for 1.4 - script plugin , 3.4 -common plugins
#should exit the JS
#ctx.retry_operation(message, retry_after);



# intenally called by retry_operation
# backward compabillity
#ctx.operation.retry() TODO
