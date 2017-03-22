angular.module('chat', [])
.component('chat', {
  templateUrl: 'Components/SupportChat/chat.html',
  controller: function ($scope, $window, $timeout, toaster, socket) {

    $scope.loggedIn = false;

    socket.on('findAllChats', function (data) {

      for(var key in data){

        var zeit = new Date(data[key].timeCLient);
        $('#text').append(
          $('<li></li>').append(
            // Uhrzeit
            $('<span>').text('[' +
            (zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
            + ':' +
            (zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
            + '] '
          ),
          // Name
          $('<b>').text(typeof(data[key].nameClient) != 'undefined' ? data[key].nameClient + ': ' : ''),
          // Text
          $('<span>').text(data[key].textClient))
        );
      }
    })

    $scope.loginChat = function () {
      socket.emit('joinChat', 'null');
      $scope.loggedIn = true;
    }

    $(function () {

      socket.on('chat', function (data) {
        console.log('Empfangen vom Server');
        var zeit = new Date(data.zeit);
        $('#text').append(
          $('<li></li>').append(
            // Uhrzeit
            $('<span>').text('[' +
            (zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
            + ':' +
            (zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
            + '] '
          ),
          // Name
          $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
          // Text
          $('<span>').text(data.text))
        );
        // nach unten scrollen
        $('body').scrollTop($('body')[0].scrollHeight);
      });
      // Nachricht senden
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
