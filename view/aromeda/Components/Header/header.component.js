angular.module('header', [])
    .component('header', {
        templateUrl: 'Components/Header/header.html',
        controller: function ($scope, $location, toastr, socket, $interval) {
            $scope.cookie2 = undefined;
            if ($scope.cookie2 == undefined) {
                $interval(function () {
                    $scope.cookie2 = $.cookie("session");
                }, 200)
            }
            // $scope.test = function () {
            //     $.removeCookie("session");
            //     $scope.cookie = '';
            // };
        }
    });
