const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = 'mongodb://localhost/aromeda';
const USER = 'user';
var passwordHash = require('password-hash');
//const uid = require('uuid-node');
//Abfrage ob Benutzername oder E-Mail gibt
module.exports = {
    existUser: function (userName, callback) {
        MongoClient.connect(config, function connect(err, db) {
            if (err) throw err;
            console.log('Verbunden mit MongoDB');
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
            console.log('Verbunden mit MongoDB');
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
            console.log('Verbunden mit MongoDB');
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
            console.log('Verbunden mit MongoDB');
            db.collection(USER).updateOne(
                { username : userName },
                { $set: { status : false } }
                , function (err, result) {
                    callback(err, result);
                });
            db.close();
        })
    }
};
