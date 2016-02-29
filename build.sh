virtualenv cloudify-cli
source cloudify-cli/bin/activate
nvm use
pip install https://github.com/cloudify-cosmo/cloudify-cli/archive/master.zip -r https://raw.githubusercontent.com/cloudify-cosmo/cloudify-cli/master/dev-requirements.txt