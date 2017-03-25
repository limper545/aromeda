var mongoDB = require('./mongo');

exports = module.exports = function (io) {
  io.on('connection', function (socket) {

    socket.on('join', function (room) {
      console.log(socket.id)
      socket.join(room);
    });

    socket.on('logout', function(userName) {
      mongoDB.updateStatusOffline(userName, function (err, result) {
        socket.emit('sucLogout', result);
      })
    });


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

    socket.on('getAllAcrticel', function() {
      mongoDB.getArticels( function(err, res) {
        socket.emit('acrticelFromServer', res);
      })
    })

      socket.on('getAllUser', function() {
        mongoDB.getAllUserInfo( function (err, res) {
          socket.emit('allUserInfo', res);
        })
      })
  })
};
