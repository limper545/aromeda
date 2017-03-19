const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mongoDB = require('./server/mongo.js');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/view/aromeda'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});



function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

app.post('/userReg', function (req, res) {
    mongoDB.existUser(req.body.userName, function (err, response1) {
        if (response1 == null) {
            mongoDB.existMail(req.body.mail, function (err, response2) {
                if (response2 == null) {
                    req.body.key = makeid();
                    mongoDB.userSave(req.body, function (err, response3) {
                        res.send({saved:true});
                    })
                }else {
                    res.send({email:true});
                }
            })
        } else
            res.send({user:true});
    });

});

app.listen(port, function (req, res) {
    console.log('Server läuft auf Port: ' + port);
});
