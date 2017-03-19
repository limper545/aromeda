angular.module('login', [])
    .component('login', {
        templateUrl: 'Components/Login/login.html',
        controller: function ($scope, $location, toastr) {

            var url = 'http://localhost:3000';
            $scope.getLoginData = function (loginData) {
                console.log(loginData);
                $(function () {
                    $.post(url + '/login', loginData, function (res) {
                        console.log(res);
                        if (res.login) {

                        } else if (!res.login) {
                            if (res.user) {
                                toastr.error('Benutzer nicht gefunden', 'Fehler');
                            } else if (res.passwort) {
                                toastr.error('Falsches Passwort', 'Fehler');
                            }
                        }
                    })
                })

            }
        }
    });
