var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    rls = require('readline-sync');

// Connection URL
var url = 'mongodb://infinite:infinite23874@ds053638.mongolab.com:53638/creativebulb';

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('members');
  // Find some documents
  collection.find([]).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

var insertDocuments = function(db, Num, Name, Part, callback) {
  // Get the documents collection
  var collection = db.collection('members');
  // Insert some documents
  collection.insert([{
    Num : Num,
    Name : Name,
    Part : Part
  }], function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

function ask(db) {
  var question = [
    "=======================",
    "1. Show all the members",
    "2. Insert a new member",
    "3. Exit",
    "> "
  ];

  var ans = rls.question(question.join("\n"));
  switch(ans.trim()) {
    case '1':
      findDocuments(db, function(docs) {
        console.log(docs);
        ask(db);
      });
      break;
    case '2':
      var Num = rls.question("Num : ");
      var Name = rls.question("Name : ");
      var Part = rls.question("Part : ");
      insertDocuments(db, Num, Name, Part, function(docs) {
        console.log("Ok.");
        ask(db);
      });
      break;
    case '3':
      console.log("Bye.");
      db.close();
      return;
    default:
      console.log('Please type again...');
      ask(db);
      break;
  }
}

console.log("Connecting to server...");
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  ask(db);
});
