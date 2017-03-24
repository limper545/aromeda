angular.module('registrierung', [])
.component('registrierung', {
  templateUrl: 'Components/Registrierung/registrierung.html',
  controller: function ($scope, $window, $timeout, toaster) {
    $scope.notLoading = true;

    var url = 'http://localhost:3000';

    $scope.getAllRegData = function (getData) {

      $scope.notLoading = false;
      var isPasswortEqual = checkPasswortIsEqual(getData.passOne, getData.passTwo);

      if (isPasswortEqual) {
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
                toaster.pop('error', "Fehler", "Die E-Mail wird bereits verwendet");
              } else if (res.user) {
                toaster.pop('error', "Fehler", "Der Benutzername wird bereits verwendet");
              }
            }
          })
        })

      } else {
        $scope.notLoading = true;
        toaster.pop('error', "Fehler", "Die Passwörter sind nicht identisch");
      }
    };

    var checkPasswortIsEqual = function (passwortOne, passwortTwo) {
      if (passwortOne === passwortTwo) {
        return passwortOne === passwortTwo;
      } else {
        return !passwortOne === passwortTwo;
      }
    }

  }
});
