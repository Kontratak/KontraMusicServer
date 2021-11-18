var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

exports.getFromCollection = getFromCollection;
exports.insertToCollection = insertToCollection;
exports.removeFromCollectionById = removeFromCollectionById;
exports.getFromCollectionbyId = getFromCollectionbyId;
exports.removeAllFromCollection = removeAllFromCollection;

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

async function getFromCollectionbyId(collectionName,id){
    var myquery = { _id: new mongodb.ObjectID(id) };
    return new Promise((resolve,reject) =>{
        dbo.collection(collectionName).findOne({},myquery,(err, result) => {
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

async function removeFromCollectionById(collectionName,id){
    var myquery = { _id: new mongodb.ObjectID(id) };
    dbo.collection(collectionName).deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
    });
}

async function removeAllFromCollection(collectionName){
    dbo.collection(collectionName).remove({}, function(err, obj) {
        if (err) throw err;
        console.log("Document Emptied");
    });
}



