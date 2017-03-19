exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log(socket.id);
        socket.on('join', function (socket) {
            console.log(socket);
        })
    })
};