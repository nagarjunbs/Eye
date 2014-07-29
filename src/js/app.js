var eyeApp = angular.module('eyeApp', []);

eyeApp.controller('eyeMenuCtrl', ['$scope','$http',function ($scope,$http) {
  $http.get('menu.json').success(function(data) {
    $scope.menus = data;
  });
}]);