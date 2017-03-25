const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = 'mongodb://localhost:27017/aromeda';
const USER = 'user';
const CHAT = 'chat';
var passwordHash = require('password-hash');

module.exports = {
  existUser: function (userName, callback) {
    MongoClient.connect(config, function connect(err, db) {
      if (err) throw err;
      db.collection(USER).findOne({
        username: userName
      }, function (err, result) {
        callback(err, result);
      });
      db.close();
    })
  },

  existMail: function (mail, callback) {
    MongoClient.connect(config, function connect(err, db) {
      if (err) throw err;
      db.collection(USER).findOne({
        email: mail
      }, function (err, result) {
        callback(err, result);
      });
      db.close();
    })
  },

  //Die neuen Daten in die DB speichern
  userSave: function (userData, callback) {
    MongoClient.connect(config, function connect(err, db) {
      if (err) throw err;
      console.log('Verbunden mit MongoDB');
      db.collection(USER).insertOne({
        name: userData.name,
        nachname: userData.nachName,
        email: userData.mail,
        data: userData.date,
        username: userData.userName,
        passwort: passwordHash.generate(userData.passOne),
        key: userData.key,
        status: false

      }, function (err, result) {
        callback(err, result);
      });
      db.close();
    })
  },

  updateStatusOnline: function (userName, callback) {
    MongoClient.connect(config, function connect(err, db) {
      if (err) throw err;
      db.collection(USER).updateOne(
        { username : userName },
        { $set: { status : true } }
        , function (err, result) {
          callback(err, result);
        });
        db.close();
      })
    },

    updateStatusOffline: function (userName, callback) {
      MongoClient.connect(config, function connect(err, db) {
        if (err) throw err;
        db.collection(USER).updateOne(
          { username : userName },
          { $set: { status : false } }
          , function (err, result) {
            callback(err, result);
          });
          db.close();
        })
      },

      saveChat: function (data, callback) {
        MongoClient.connect(config, function connect(err,db) {
          if (err) throw err;
          db.collection(CHAT).insertOne({
            nameClient: data.name,
            textClient: data.text,
            timeClient: data.time
          }, function(err, result) {
            callback(err, result)
          });
          db.close();
        })
      },

      loadChat: function (callback) {
        MongoClient.connect(config, function connect(err, db) {
          if (err) throw err;
          db.collection(CHAT).find({}).limit(40).sort({timeClient:-1}).toArray(function (err, result){
            callback(err, result);
          });
          db.close();
        })
      },

      isUserOnline: function (callback) {
        MongoClient.connect(config, function connect(err, db) {
          if (err) throw err;
          db.collection(USER).find({status: true}).toArray(function (err, result) {
            callback(err, result);
          })
          db.close();
        })
      }
    };
