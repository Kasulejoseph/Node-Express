"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ObjectID = _require.ObjectID;

var connectionURL = 'mongodb://127.0.0.1:27017';
var dbName = 'task-manager';
MongoClient.connect(connectionURL, {
  useNewUrlParser: true
}, function (error, client) {
  if (error) {
    return console.log('Unable to connect to database');
  }

  var db = client.db(dbName);
  console.log('Connected successfully...'); // update one

  db.collection('users').updateOne({
    _id: new ObjectID('5d456d618f70f25a2315b1c9')
  }, {
    $set: {
      name: 'Joseph'
    }
  }).then(function (results) {
    console.log(results);
  })["catch"](function (error) {
    console.log(error);
  }); //Update many

  db.collection('users').updateMany({
    name: 'benedicte'
  }, {
    $inc: {
      age: 2
    }
  }).then(function (results) {
    console.log(results);
  })["catch"](function (error) {
    console.log(error);
  }); //Delete field

  db.collection('users').deleteMany({
    age: 26
  }).then(function (result) {
    console.log(result);
  })["catch"](function (error) {
    console.log(error);
  });
});
//# sourceMappingURL=mongodb.js.map