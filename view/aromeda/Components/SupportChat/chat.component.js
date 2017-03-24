angular.module('chat', [])
.component('chat', {
  templateUrl: 'Components/SupportChat/chat.html',
  controller: function ($scope, $window, $timeout, toaster, socket) {

    $scope.chatMessages = [];
    $scope.userArrayOnline = [];

    socket.on('findAllChats', function (data) {
      $scope.chatMessages = data;
    })

    this.$onInit = function () {
      socket.emit('joinChat', 'null');
    }

    socket.on('userOnlineChat', function (data){
      for(var key in data){
        $scope.userArrayOnline.push(data[key].username)
      }
    })

    $(function () {

      socket.on('chat', function (data) {
        var newMessage = {
          timeClient: data.zeit,
          nameClient: data.name,
          textClient: data.text
        }
        $scope.chatMessages.push(newMessage)
      });
      //TODO Umbauen auf angular
      function senden(){
        // Eingabefelder auslesen
        var name = $.cookie("session");
        var text = $('#chatSend').val();
        // Socket senden
        console.log('Senden CLient');
        var time = new Date();
        socket.emit('chat', { name: name, text: text, time: time });
        // Text-Eingabe leeren
        $('#chatSend').val('');
      }
      // bei einem Klick
      $('#sendenText').click(senden);

      $('#chatSend').keypress(function (e) {
        if (e.which == 13) {
          senden();
        }
      });
    })
  }
});
