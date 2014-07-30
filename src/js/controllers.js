// Define the module
var eyeApp = angular.module('eyeApp', []);

// Define the controller
eyeApp.controller('eyeMenuCtrl', ['$scope','$http','FileSystemService',function ($scope,$http,fsService) {
  $http.get('config/menu.json').success(function(data) {
    $scope.menus = data;
  });
  
  // Handle clicks done on menu items
  $scope.handleMenuItemClick = function(){
    // Determine which element was clicked through the id
    switch(window.event.target.id){
      // File-> Open File
      case 'menuitem-open':
        fsService.openFile();
        break;
    }
    
  }
}]);