angular.module('login', [])
.component('login', {
  templateUrl: 'Components/Login/login.html',
  controller: function ($scope, $window, $timeout, toaster, socket) {
    $scope.notLoading = true;

    var url = 'http://localhost:3000';
    $scope.getLoginData = function (loginData) {
      $scope.notLoading = false;
      $(function () {
        $.post(url + '/login', loginData, function (res) {
          if (res.login) {
            $.cookie("session", loginData.user);
            $timeout(function () {
              $window.location = '#/';
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
