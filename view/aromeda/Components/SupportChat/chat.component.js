angular.module('chat', [])
    .component('chat', {
        templateUrl: 'Components/SupportChat/chat.html',
        controller: function ($scope, $window, $timeout, toaster, socket) {

            $(function () {
                socket.on('chat', function (data) {
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
                   //$('body').scrollTop($('body')[0].scrollHeight);
                });
                // Nachricht senden
                function senden(){
                    // Eingabefelder auslesen
                    var name = 'Sascha';
                    var text = $('#chatSend').val();
                    // Socket senden
                    socket.emit('chat', { name: name, text: text });
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
