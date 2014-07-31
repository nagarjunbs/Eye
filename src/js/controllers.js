// Define the module
var eyeApp = angular.module('eyeApp', []);

// Define the editor controller
eyeApp.controller('eyeEditorController', ['$scope','$http','EditorService',function ($scope,$http,editorService) {
  editorService.initEditor('editor');
}]);

// Define the menu controller
eyeApp.controller('eyeMenuController', ['$scope','$http','FileSystemService',function ($scope,$http,fsService) {
  
  // Inject Service
  $scope.fsService = fsService;
  $http.get('config/menu.json').success(function(data) {
    $scope.menus = data;
  });
  
  // Handle clicks done on menu items
  $scope.handleMenuItemClick = function(){
    // Determine which element was clicked through the id
    switch(window.event.target.id){
      // File-> Open File
      case 'menuitem-open':
        $scope.fsService.openFile();
        break;
      case '':
        break;
    }
    
  }
}]);