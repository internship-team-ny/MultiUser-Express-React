var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  // Connection URL
  var url = 'mongodb://localhost:27017/users';

//GRAB CURRENT TIME IN SECONDS TO ENSURE A RANDOM NUMBER IS GENERATED
function random(){
  var seed = (new Date).getTime() / 1000;
  return Math.floor(Math.sin(seed) * 10000);
}

//FUNCTION TO UPDATE THE SESSION NUMBER AFTER A USER LOGS IN
function updateSession(db, json, session){
  var session_id = random();
  session.push(session_id);
  var users = db.collection('users');

  users.updateOne({username: json.username}, {$set: {session: session_id}},
                  function(err, r){
                    return;
                  })
}

//GET CURRENT SESSION NUMBER FOR A SPECIFIC USER
function getSessionID(db, json, session){
  var users = db.collection('users')
  users.find({username: json.username}).toArray(function(err,docs){
    assert.equal(err, null);
    session.push(docs[0].session);
    return;
  })
}

//INSERTS NEWLY LOGGED IN USER AND CREATES A SESSION ID
var insertUser = function(db, json, session) {
  var session_id = random();
  session.push(session_id);
  // Get the documents collection
  var users = db.collection('users');
  // Insert some documents
  users.insertMany([
    {username: json.username, password: json.password, session: session_id}
  ], function(err, result) {
    return
  });
}


//FIND USER IF THEY EXIST IN THE MONGODB
var findUser = function(db, json, callback) {
  // Get the documents collection
  var success = true;
  var users = db.collection('users');

  users.find({username: json.username}).toArray(function(err, docs){
    assert.equal(err, null);
    var session = [];
    //CASE FOR IF USER DOESN'T EXIST IN THE MONGODB
    if(docs.length == 0){
      console.log("User not registered in the db.")
      insertUser(db, json, session)
    } else{
      console.log("User already exists in the db.")
      //IF PASSWORDS DON'T MATCH LOGIN FAILED
      if(docs[0].password != json.password){
        console.log("password doesn't match")
        success = false;
      }
      //ELSE NOW NEED TO UPDATE THE SESSION ID
      else{
        updateSession(db, json, session)
      }
    }
    callback(success, session[0])
  });
}



module.exports = {
  login: function(json, res){
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      findUser(db, json, function(success, session){
        db.close();
        res.json({success: success, session: session});
      });
    });
  },

  checkSession: function(json, res){
    // Use connect method to connect to the server
    console.log(json)
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      var users = db.collection('users')
      users.find({username: json.username}).toArray(function(err, docs){
        assert.equal(err, null);
        var success = false;
        if(docs.length == 0){
          console.log("User doesn't even exist in db.")
        } else{
          if((docs[0].password != json.password) || (docs[0].session != json.session)){
            console.log("Incorrect passsword or session id.")
          } else{
            success = true
          }
          db.close();
          res.json({success: success})
        }
      })
    });
  },

  clear: function(){
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      var users = db.collection('users')
      users.deleteMany({});
      db.close();
    });
  },

  show: function(){
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      var users = db.collection('users')
      users.find({}).toArray(function(err,docs){
        console.log(docs);
      })
      db.close();
    });
  }
};
