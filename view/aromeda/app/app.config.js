var app = angular.module('Spiel')

    .config(function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                template: "<registrierung></registrierung>"
            })
            .when("/login", {
                template: "<login></login>"
            })
            .when("/main", {
                template: "<main-page></main-page>"
            })
            .when("/support", {
                template: "<chat></chat>"
            })
    });