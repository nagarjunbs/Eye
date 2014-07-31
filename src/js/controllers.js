// Define the module
var eyeApp = angular.module('eyeApp', []);

// Define the editor controller
eyeApp.controller('eyeEditorController', ['$scope','$http','$rootScope','EditorService',function ($scope,$http,$rootScope,editorService) {
  //editorService.initEditor('editor');
  $scope.openedDocuments = [];
  // Register event handlers
  $rootScope.$on('load-opened-file-content',editorService.loadContent);
  
  $rootScope.$on('register-opened-file',function(event,file){
    $scope.$apply(function() {
      // Update goes here
      // Convert this into a filter later
      file.id = 'editor-' + file.name.replace(/[^\w\s]/gi, '');
      $scope.openedDocuments.push(file);
      setTimeout(function(){
        editorService.initEditor(file.id);
      }, 3000);
    });
  });
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
      $rootScope.$emit(clickedMenuItem.data('event'));
    }
  }
  
  // Register event handlers for services
  $rootScope.$on('file-new',fsService.newFile);
  $rootScope.$on('file-open',fsService.openFile);
  $rootScope.$on('file-openfolder',fsService.openFolder);
  $rootScope.$on('file-savefile',fsService.saveFile);
  $rootScope.$on('file-savefileas',fsService.saveFileAs);
}]);