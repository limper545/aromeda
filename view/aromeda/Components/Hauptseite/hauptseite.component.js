angular.module('mainPage', [])
    .component('mainPage', {
        templateUrl: 'Components/Hauptseite/hauptseite.html',
        controller: function ($scope, $window, socket) {
            this.$onInit = function () {
                socket.emit('join', 'user');
                socket.emit('getAllAcrticel', 'null');
                socket.emit('getAllUser', 'null');
            };

            socket.on('acrticelFromServer', function (article) {
                $scope.articelsForPage = article;
            });

            socket.on('allUserInfo', function (users) {
                $scope.allUserInfo = users;
            });
        }
    });
