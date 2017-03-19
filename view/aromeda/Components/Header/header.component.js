angular.module('header', [])
    .component('header', {
        templateUrl: 'Components/Header/header.html',
        controller: function ($scope, $location, toastr, socket, $interval) {
            $scope.auswahlHead = function (headData) {
                $scope.auswahl = headData;
            };

            stop = $interval(function () {
                console.log('Interval');
                if ($.cookie("session")) {

                    $scope.showHeader = true;
                    $interval.cancel(stop);
                } else {
                    $scope.showHeader = false;
                }
            }, 500)
        }
    });
