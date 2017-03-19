angular.module('header', [])
    .component('header', {
        templateUrl: 'Components/Header/header.html',
        controller: function ($scope, $location, toastr, socket) {
            this.$onInit = function () {
                $scope.cookie2 = $.cookie("session");
            };

            // $scope.test = function () {
            //     $.removeCookie("session");
            //     $scope.cookie = '';
            // };
        }
    });
