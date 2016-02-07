/* global $routeParams */

var myApp = angular.module("MyModule", ['ngRoute']);

myApp.service('messagePassing', function () {
    var thisdata = '';
    this.setData = function (data) {
        thisdata = data;
    };

    this.getData = function () {
        return thisdata;
    };
});




myApp.controller("myController1", function ($scope, $http) {
    $http.get("http://api.football-data.org/v1/soccerseasons/?season=2015",
            {headers: {'X-Auth-Token': '4d803eb6a8504c88a617a2607163f35e'}})
            .then(function (response) {
                $scope.leagues = response.data;
            });
});

myApp.controller("myController2", function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    //alert($scope.id);
    $http.get("http://api.football-data.org/v1/soccerseasons/" + $scope.id + "/teams",
            {headers: {'X-Auth-Token': '4d803eb6a8504c88a617a2607163f35e'}})
            .then(function (response) {
                $scope.teams = response.data.teams;
            });
});

myApp.controller("myController3", function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    //alert($scope.id);
    $http.get("http://api.football-data.org/v1/teams/" + $scope.id + "/players",
            {headers: {'X-Auth-Token': '4d803eb6a8504c88a617a2607163f35e'}})
            .then(function (response) {
                $scope.players = response.data.players;
            });
});

myApp.controller("myController4", function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    //alert($scope.id);
    $http.get("http://api.football-data.org/v1/teams/" + $scope.id + "/fixtures",
            {headers: {'X-Auth-Token': '4d803eb6a8504c88a617a2607163f35e'}})
            .then(function (response) {
                $scope.fixtures = response.data.fixtures;
            });
});


myApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'leagues.html',
                    controller: 'myController1'
                }).
                when('/teams/:id', {
                    templateUrl: 'teams.html',
                    controller: 'myController2'
                }).
                when('/players/:id', {
                    templateUrl: 'players.html',
                    controller: 'myController3'
                }).
                when('/fixtures/:id', {
                    templateUrl: 'fixtures.html',
                    controller: 'myController4'
                });
    }]);








