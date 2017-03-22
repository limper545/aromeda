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

    socket.on('disconnect', function() {
      console.log('disconnect');
    })

    // Es wird ein Remove Listener benötigt in der Factory
    socket.on('joinChat', function (data) {
      socket.join('chat');
      mongoDB.loadChat( function (err, result) {
        socket.emit('findAllChats', result);
      })
    //  socket.emit('chat2', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!'});
    })

    socket.on('chat', function (data) {

      mongoDB.saveChat(data, function (err, result) {

        io.sockets.in('chat').emit('chat', { zeit: new Date(), name: data.name || 'Anonym', text: data.text });
      });
    });




    // socket.on('test', function (data) {
    //     console.log(data);
    //     io.sockets.in('user').emit('funzt', 'Server funzt')
    // });

  })


};
