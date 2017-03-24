var mongoDB = require('./mongo');

exports = module.exports = function (io) {
  io.on('connection', function (socket) {

    socket.on('join', function (room) {
      socket.join(room);
    });

    socket.on('logout', function(userName) {
      mongoDB.updateStatusOffline(userName, function (err, result) {
        socket.emit('sucLogout', result);
      })
    });

    socket.on('disconnect', function() {
    })

    // Es wird ein Remove Listener benötigt in der Factory
    socket.on('joinChat', function (data) {
      socket.join('chat');
      mongoDB.isUserOnline( function(err, res){
        socket.emit('userOnlineChat', res);
      })
      mongoDB.loadChat( function (err, result) {
        socket.emit('findAllChats', result);
      })
    })

    socket.on('chat', function (data) {

      mongoDB.saveChat(data, function (err, result) {

        io.sockets.in('chat').emit('chat', { zeit: new Date(), name: data.name || 'Anonym', text: data.text });
      });
    });
  })
};
