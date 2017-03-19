angular.module('registrierung', [])
    .component('registrierung', {
        templateUrl: 'Components/Registrierung/registrierung.html',
        controller: function ($scope, $window, $timeout, toastr) {
            $scope.notLoading = true;

            var url = 'http://localhost:3000';

            $scope.getAllRegData = function (getData) {

                $scope.notLoading = false;
                var isPasswortEqual = checkPasswortIsEqual(getData.passOne, getData.passTwo);

                if (isPasswortEqual) {

                    //GET und POST und keine Socket verbindung
                    $(function () {
                        $.post(url + '/userReg', getData, function (res) {
                            if (res.saved) {
                                $scope.notLoading = false;
                                $timeout(function () {
                                    $window.location = "#/login"
                                }, 4000);
                            } else if (!res.saved) {

                                $scope.notLoading = true;
                                if (res.email) {
                                    toastr.error('Die E-Mail wird bereits verwendet', 'Fehler');
                                } else if (res.user) {

                                    toastr.error('Der Benutzername wird bereits verwendet', 'Fehler');
                                }
                            }
                        })
                    })

                } else {
                    $scope.notLoading = true;
                    toastr.error('Die Passwörter sind nicht identisch', 'Fehler');
                }
            };

            //Dokumentation: Author, erstellt, rückgabewert
            var checkPasswortIsEqual = function (passwortOne, passwortTwo) {
                if (passwortOne === passwortTwo) {
                    return passwortOne === passwortTwo;
                } else {
                    return !passwortOne === passwortTwo;
                }
            }

        }
    });
