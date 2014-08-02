// Define the module
var eyeApp = angular.module('eyeApp', []);

// Define the editor controller
eyeApp.controller('eyeEditorController', ['$scope','$http','$rootScope','EditorService',function ($scope,$http,$rootScope,editorService) {
  
  $scope.openedDocuments = [];
  
  // Register event handlers
  $rootScope.$on('load-opened-file-content',$.proxy(function(eventInfo, fileName,fileContent){
    var fileId = 'editor-' + fileName.replace(/[^\w\s]/gi, '');
    this.openedDocuments.push({
      id:fileId,
      name:fileName
    });
    this.$apply();
    this.$emit('init-editor-with-timeout',fileId,fileContent);
  },$scope));
  $rootScope.$on('init-editor-with-timeout',$.proxy(function(eventInfo,fileId,fileContent){
    setTimeout($.proxy(function(fileId,fileContent){
        this.initEditor(fileId);
        this.loadContent(fileId,fileContent)
      },this,fileId,fileContent),1000);
  },editorService));
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
  $rootScope.$on('file-open',$.proxy(fsService.openFile,$scope));
  $rootScope.$on('file-openfolder',fsService.openFolder);
  $rootScope.$on('file-savefile',fsService.saveFile);
  $rootScope.$on('file-savefileas',fsService.saveFileAs);
}]);