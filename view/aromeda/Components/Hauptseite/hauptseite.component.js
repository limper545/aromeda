angular.module('mainPage', [])
    .component('mainPage', {
        templateUrl: 'Components/Hauptseite/hauptseite.html',
        controller: function ($scope, $window, $timeout, socket) {

            $scope.notLoading = true;
            this.$onInit = function () {
                $scope.loggedIn = false;
                socket.emit('join', 'user');
                socket.emit('getAllAcrticel', 'null');
                socket.emit('getAllUser', 'null');

                if ($.cookie("session")) {
                    $scope.loggedIn = true;
                } else {
                    $scope.loggedIn = false;
                }
            };

            socket.on('acrticelFromServer', function (article) {
                $scope.articelsForPage = article;
            });

            socket.on('allUserInfo', function (users) {
                $scope.allUserInfo = users;
            });

            $scope.goReg = function () {
                $window.location = '#/registrierung'
            };

            var url = 'http://localhost:3000';
            $scope.getLoginData = function (loginData) {
                $scope.notLoading = false;
                $(function () {
                    $.post(url + '/login', loginData, function (res) {
                        if (res.login) {
                            $.cookie("session", loginData.user);
                            $timeout(function () {
                                $window.location.reload();
                            }, 4000);
                        } else if (!res.login) {
                            if (res.user) {
                                $scope.notLoading = true;
                                toaster.pop('error', "Fehler", "Benutzer nicht gefunden");
                            } else if (res.passwort) {
                                $scope.notLoading = true;
                                toaster.pop('error', "Fehler", "Falsches Passwort");
                            } else if (res.online) {
                                $scope.notLoading = true;
                                toaster.pop('error', "Fehler", "User ist bereits Online");
                            }
                        }
                    })
                })
            }
        }
    });
