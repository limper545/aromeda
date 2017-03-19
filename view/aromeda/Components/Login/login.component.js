angular.module('login', [])
    .component('login', {
        templateUrl: 'Components/Login/login.html',
        controller: function ($scope, $window, $timeout, toastr, socket) {
            $scope.notLoading = true;

            var url = 'http://localhost:3000';
            $scope.getLoginData = function (loginData) {
                $scope.notLoading = false;
                $(function () {
                    $.post(url + '/login', loginData, function (res) {
                        if (res.login) {
                            $.cookie("session", loginData.user);
                            $timeout(function () {
                                $window.location = '#/main';
                            }, 4000);
                            //$window.location = "#/main"
                        } else if (!res.login) {
                            if (res.user) {
                                $scope.notLoading = true;
                                toastr.error('Benutzer nicht gefunden', 'Fehler');
                            } else if (res.passwort) {
                                $scope.notLoading = true;
                                toastr.error('Falsches Passwort', 'Fehler');
                            }
                        }
                    })
                })

            }
        }
    });
