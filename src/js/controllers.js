// Define the module
var eyeApp = angular.module('eyeApp', []);

// Define the editor controller
eyeApp.controller('eyeEditorController', ['$scope','$http','$rootScope','EditorService',function ($scope,$http,$rootScope,editorService) {
  editorService.initEditor('editor');
}]);

// Define the menu controller
eyeApp.controller('eyeMenuController', ['$scope','$http','$rootScope','FileSystemService',function ($scope,$http,$rootScope,fsService) {
  
  // Inject Service
  $scope.fsService = fsService;
  $http.get('config/menu.json').success(function(data) {
    $scope.menus = data;
  });
  
  // Handle clicks done on menu items
  $scope.handleMenuItemClick = function(){
    var clickedMenuItem = $(window.event.target);
    //Check if this menu item has an event associated with it, if yes, broadcast it
    if (typeof clickedMenuItem.data('event') === 'string'){
      $rootScope.$broadcast(clickedMenuItem.data('event'));
    }
  }
}]);