var mongoDB = require('./mongo');

exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('join', function (room) {
            socket.join(room);
            console.log('Joindes room: ', room);
        });

        socket.on('logout', function(userName) {
            mongoDB.updateStatusOffline(userName, function (err, result) {
            socket.emit('sucLogout', result);
            })
        });

        // socket.on('test', function (data) {
        //     console.log(data);
        //     io.sockets.in('user').emit('funzt', 'Server funzt')
        // });

    })


};