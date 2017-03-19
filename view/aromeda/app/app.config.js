var app = angular.module('Spiel')

    .config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });
        $routeProvider
            .when('/', {
                template: "<registrierung></registrierung>"
            })
            .when("/login", {
                template: "<login></login>"
            })
    });