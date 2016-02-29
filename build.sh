#getting node path from PATH env variable
array=(${PATH//:/ })
node_path=${array[$(for i in "${!array[@]}"; do
   if [[ "${array[$i]}" =~ "node" ]]; then
       echo "${i}";
   fi
done)]}"/node"

node_bin=$node_path"orig"
mv $node_path $node_bin
echo "$node_bin --harmony-proxies \"\$@\"" > $node_path
chmod +x $node_path
virtualenv cloudify-cli
source cloudify-cli/bin/activate
pip install https://github.com/cloudify-cosmo/cloudify-cli/archive/master.zip -r https://raw.githubusercontent.com/cloudify-cosmo/cloudify-cli/master/dev-requirements.txt
npm test