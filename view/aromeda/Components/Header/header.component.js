angular.module('header', [])
    .component('header', {
        templateUrl: 'Components/Header/header.html',
        controller: function ($scope, $window, $timeout, toaster, socket, $interval) {
            $scope.auswahlHead = function (headData) {
                $scope.auswahl = headData;
            };

            $scope.logout = function () {
                socket.emit('logout', $.cookie("session"));
            };

            socket.on('sucLogout', function (data){
                if(data.nModified == 1){
                    $.removeCookie("session");
                    $scope.showHeader = false;
                    $window.location = '#/login';
                }else {
                    toaster.pop('error', 'Error', 'Fehler beim Logout');
                }
            });

            $interval(function () {
                if ($.cookie("session")) {
                    $scope.showHeader = true;
                } else {
                    $scope.showHeader = false;
                }
            }, 10)
        }
    });
