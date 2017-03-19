angular.module('registrierung', [])
    .component('registrierung', {
        templateUrl: 'Components/Registrierung/registrierung.html',
        controller: function ($scope) {
            $scope.notLoading = true;

            var url = 'http://localhost:3000';

            $scope.getAllRegData = function (getData) {
                $scope.notLoading = false;
                console.log(getData);
                if (getData === null) throw new Error();

                var isPasswortEqual = checkPasswortIsEqual(getData.passOne, getData.passTwo);

                if (isPasswortEqual) {
                    //GET und POST und keine Socket verbindung
                    $(function () {
                        $.post(url + '/userReg', getData, function (res) {
                            console.log(res);
                            if (res.saved) {
                            } else if (!res.saved) {
                                if (res.email) {
                                    document.getElementById('test').innerHTML = 'E-Mail ist schon vergeben';
                                } else if (res.user) {
                                    document.getElementById('test').innerHTML = 'Benutzname ist schon vergeben.'
                                }
                            }
                        })
                    })

                } else {
                    //Meldung an den Nutzer, dass Passwörter nicht identisch sind
                }
                $scope.notLoading = true;
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
