angular.module('mainPage', [])
    .component('mainPage', {
        templateUrl: 'Components/Hauptseite/hauptseite.html',
        controller: function ($scope, $window, socket) {
            this.$onInit = function () {
                $scope.cookie = $.cookie("session");
                socket.emit('join', 'user');
            };
        }
    });
