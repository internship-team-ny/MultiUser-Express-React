var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  // Connection URL
  var url = 'mongodb://localhost:27017/users';

  var insertUser = function(db, json) {
    // Get the documents collection
    var users = db.collection('users');
    // Insert some documents
    users.insertMany([
      {username: json.username, password: json.password}
    ], function(err, result) {
      return
    });
  }


  var findUser = function(db, json, callback) {
    // Get the documents collection
    var success = true;
    var users = db.collection('users');

    users.find({username: json.username}).toArray(function(err, docs){
      assert.equal(err, null);
      if(docs.length == 0){
        console.log("User not registered in the db.")
        insertUser(db, json)
      } else{
        console.log("User already exists in the db.")
        if(docs[0].password != json.password){
          success = false;
        }
      }
      callback(success)
    });
}



module.exports = {
  login: function(json, res){
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      // var users = db.collection('users')
      // users.deleteMany({});

      findUser(db, json, function(success){
        db.close();
        res.json({success: success});
      });
    });
  }
};
