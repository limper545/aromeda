exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('join', function (room) {
            socket.join(room);
            console.log('Joindes room: ', room);
        });

        // socket.on('test', function (data) {
        //     console.log(data);
        //     io.sockets.in('user').emit('funzt', 'Server funzt')
        // });

        socket.on('disconnect', function() {
            console.log('Disconnect');
        })
    })


};