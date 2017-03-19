angular.module('header', [])
    .component('header', {
        templateUrl: 'Components/Header/header.html',
        controller: function ($scope, $location, toastr, socket, $interval) {

            $scope.auswahlHead = function (headData) {
                $scope.auswahl = headData;
            }
        }
    });
