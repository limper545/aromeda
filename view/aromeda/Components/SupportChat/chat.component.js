angular.module('chat', [])
    .component('chat', {
        templateUrl: 'Components/SupportChat/chat.html',
        controller: function ($scope, $window, $timeout, toaster, socket) {


            var idleTime = 0;
            $(document).ready(function () {
                //Increment the idle time counter every minute.
                var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

                //Zero the idle timer on mouse movement.
                $(this).mousemove(function (e) {
                    idleTime = 0;
                });
                $(this).keypress(function (e) {
                    idleTime = 0;
                });
            });

            function timerIncrement() {
                idleTime = idleTime + 1;
                if (idleTime > 19) { // 20 minutes
                    window.location.reload();
                }
            }

            $scope.chatMessages = [];
            $scope.userArrayOnline = [];
            $scope.userNameOnlineCookie = $.cookie("session");


            socket.on('findAllChats', function (data) {
                $scope.chatMessages = data;

            })

            this.$onInit = function () {
                socket.emit('joinChat', 'null');
            }

            socket.on('userOnlineChat', function (data) {
                for (var key in data) {
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

                    $timeout(function () {
                        $("#bodyChatText").scrollTop($("#bodyChatText")[0].scrollHeight, 200);
                    }, 100)

                });

                function senden() {

                    // Eingabefelder auslesen
                    var name = $.cookie("session");
                    var text = $('#inputText').val();
                    // Socket senden
                    console.log('Senden CLient');
                    var time = new Date();
                    socket.emit('chat', {name: name, text: text, time: time});
                    // Text-Eingabe leeren
                    $('#inputText').val('');
                }

                // bei einem Klick
                $('#sendMessage').click(senden);

                $('#inputText').keypress(function (e) {
                    if (e.which == 13) {
                        senden();
                    }
                });
            })
        }
    });
