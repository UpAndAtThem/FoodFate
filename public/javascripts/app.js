
var app = angular.module('myApp', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider.
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registerCtrl'
            }).
            when('/comment', {
                templateUrl: 'views/comment.html',
                controller: 'commentCtrl'
            }).
            when('/main', {
                templateUrl: 'private/views/main.html',
                controller: 'mainCtrl'
            }).
            otherwise({
                redirectTo: '/login'
            });

        $httpProvider.interceptors.push('authInterceptor');
    }]);


app.controller('registerCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.submit = function () {
        $http.post('api/register', $scope.form)
            .then(function (response) {
                console.log(response);
                $location.path("/login");
            });
    }
}]);

app.controller('loginCtrl', ['$scope', '$http', 'authService', '$location', '$rootScope', function($scope, $http, authService, $location, $rootScope){
    $scope.submit = function(){
        $http.post('api/login', $scope.form)
            .then(function (response) {
                authService.saveToken(response.data);
                $rootScope.user = authService.getUser();
                $location.path("/main");
            });
    };
}]);

app.controller('navCtrl', ['authService','$scope','$rootScope','$location', function(authService, $scope,$rootScope, $location){
    $rootScope.user = authService.getUser();

    if($rootScope.user && $rootScope.user.username){
        $location.path('/main');
    }

    $scope.logout = function(){
        authService.logout();
        $rootScope.user = authService.getUser();
        $location.path("/login");
    }
}]);

app.controller('mainCtrl', ['$scope', '$http','$rootScope', function($scope, $http, $rootScope){
     $scope.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $scope.search = function(){

        console.log("the state is",$scope.searchterm.state, "the city is", $scope.searchterm.city, "the type is", $scope.searchterm.type  );
        $http({
            method: 'GET',
            url: '/api/yelp?location=' + $scope.searchterm.city + ', ' + $scope.searchterm.state + '&radius_filter=8500&term=' + $scope.searchterm.type
        }).success(function(data) {

            $scope.restaurants = data;
            $scope.restaurant = data.businesses[$scope.getRandomInt(0, $scope.restaurants.businesses.length-1 )];

            console.log("the single rest is",$scope.restaurant);

        })
    };
}]);

app.controller('commentCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

        $http({
            method: 'GET',
            url: '/api/comment'
        }).success(function(data) {

            $scope.comments = data;
        });

    $scope.deleteComment = function (id, index) {
        $http({
            method: 'DELETE',
            url: '/api/comment',
            data: {
                id: id
            },
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function (data) {
                $scope.comments.splice(index, 1);
            });
    };


    $scope.submit = function () {
        $http.post('api/comment', $scope.form)
            .then(function (response) {
                console.log(response);

                $scope.form.restname = '';
                $scope.form.mealeaten = '';
                $scope.form.rating = '';
                $scope.form.additional = '';


            }, function(err) {
                console.log(err);
            });

        $http({
            method: 'GET',
            url: '/api/comment'
        }).success(function(data) {

            $scope.comments = data;
        });

    }
}]);

app.service('authService', ['$window', function ($window) {

    this.parseJwt = function (token) {
        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        } else return {};
    };

    this.saveToken = function (token) {
        $window.localStorage.jwtToken = token;
        console.log('Saved token:',$window.localStorage.jwtToken);
    };

    this.getToken = function () {
        //console.log("the token is "+ $window.localStorage.jwtToken);
        return $window.localStorage.jwtToken;
    };

    this.isAuthed = function () {
        var token = this.getToken();
        if (token) {
            var params = this.parseJwt(token);
            var notExpired = Math.round(new Date().getTime() / 1000) <= params.exp;
            if (!notExpired) {
                this.logout();
            }
            return notExpired;
        } else {
            return false;
        }
    };

    this.logout = function () {
        delete $window.localStorage.jwtToken;
    };

    // expose user as an object
    this.getUser = function () {
        return this.parseJwt(this.getToken())
    };
}]);

app.factory('authInterceptor', ['$q', '$location', 'authService', function ($q, $location, authService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (authService.isAuthed()) {
                config.headers.Authorization = 'Bearer ' + authService.getToken();
            }
            return config;
        },
        response: function (response) {

            if (response.status === 401) {

                // handle the case where the user is not authenticated
                $location.path("/login");
            }
            return response || $q.when(response);
        }, responseError: function (response) {
            if (response.status === 401) {
                $location.path("/login");

            } else {
                console.log(response);
            }
            return $q.reject(response);
        }
    };
}]);