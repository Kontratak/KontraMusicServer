var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.getFromCollection = getFromCollection;
exports.insertToCollection = insertToCollection;

var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("KontraMusicPlayer");
});

async function getFromCollection(collectionName){
    return new Promise((resolve,reject) =>{
        dbo.collection(collectionName).find({}).toArray(function(err, result) {
            if (err) throw err;
            resolve(result);
        });
    })
}

async function insertToCollection(collectionName,data){
    dbo.collection(collectionName).insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
}



