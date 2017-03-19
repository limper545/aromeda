angular.module('mainPage', [])
    .component('mainPage', {
        templateUrl: 'Components/Hauptseite/hauptseite.html',
        controller: function ($scope, $location, toastr, socket) {
            this.$onInit = function () {
                $scope.cookie = $.cookie("session");
                socket.emit('join', 'user');
            };

            // $scope.test = function () {
            //     $.removeCookie("session");
            //     $scope.cookie = '';
            // };


            socket.on('funzt', function (data) {
                console.log(data);
            })
        }
    });
