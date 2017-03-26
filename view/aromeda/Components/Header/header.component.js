angular.module('header', [])
.component('header', {
  templateUrl: 'Components/Header/header.html',
  controller: function ($scope, $window, $timeout, toaster, socket, $interval) {
    $scope.auswahlHead = function (headData) {
      $scope.auswahl = headData;
    };
    var url = 'http://localhost:3000/#/'

    $scope.logout = function () {
      socket.emit('logout', $.cookie("session"));
    };

    socket.on('sucLogout', function (data){
      if(data.nModified == 1){
        $.removeCookie("session");
        $scope.showHeader = false;
          window.location.href = '#/';
          $window.location.reload();

      }else {
        toaster.pop('error', 'Error', 'Fehler beim Logout');
      }
    });

    $scope.supportChat = function () {
      socket.getSocket().removeAllListeners();
      $window.location.href = "#/support";
    }

    $interval(function () {
      if ($.cookie("session")) {
        $scope.showHeader = true;
      } else {
        $scope.showHeader = false;
      }
    }, 10)
  }
});
