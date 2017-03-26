var app = angular.module('Spiel')

    .config(function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/registrierung', {
                template: "<registrierung></registrierung>"
            })
            .when("/login", {
                template: "<login></login>"
            })
            .when("/", {
                template: "<main-page></main-page>"
            })
            .when("/support", {
                template: "<chat></chat>"
            })
    });