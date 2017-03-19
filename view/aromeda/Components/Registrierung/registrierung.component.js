angular.module('registrierung', [])
    .component('registrierung', {
        templateUrl: 'Components/Registrierung/registrierung.html',
        controller: function ($scope, toastr) {
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
                                    toastr.error('Die E-Mail wird bereits verwendet', 'Fehler');
                                } else if (res.user) {
                                    toastr.error('Der Benutzername wird bereits verwendet', 'Fehler');
                                }
                            }
                        })
                    })

                } else {
                    toastr.error('Die Passwörter sind nicht identisch', 'Fehler');
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
