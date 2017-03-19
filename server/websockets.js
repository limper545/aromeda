var mongoDB = require('./mongo');

exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.emit('chat', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });

        socket.on('join', function (room) {
            socket.join(room);
            console.log('Joindes room: ', room);
        });

        socket.on('logout', function(userName) {
            mongoDB.updateStatusOffline(userName, function (err, result) {
                socket.emit('sucLogout', result);
            })
        });

        socket.on('chat', function (data) {
            // so wird dieser Text an alle anderen Benutzer gesendet
            io.sockets.emit('chat', { zeit: new Date(), name: data.name || 'Anonym', text: data.text });
        });




        // socket.on('test', function (data) {
        //     console.log(data);
        //     io.sockets.in('user').emit('funzt', 'Server funzt')
        // });

    })


};