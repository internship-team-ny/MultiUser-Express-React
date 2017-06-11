var Etcd = require('node-etcd');
var etcd = new Etcd();

module.exports = {
  login: function(json){
    etcd.set("key", "value");
    etcd.get("key", console.log);
    // etcd.set(json.username, json.password);
    // etcd.get(json.username, function callback(err, res){
    //   if(err){
    //     console.log("NOT-FOUND: ", err);
    //
    //   } else{
    //     console.log("FOUND: ", res);
    //   }
    // });
  }
};
