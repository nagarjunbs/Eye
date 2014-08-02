// Define the module
var eyeApp = angular.module('eyeApp', []);

// Define the editor controller
eyeApp.controller('eyeEditorController', ['$scope','$http','$rootScope','EditorService',function ($scope,$http,$rootScope,editorService) {
  
  $scope.openedDocuments = [];
  
  // Register scoped event handlers
  $rootScope.$on('load-opened-file-content',$.proxy(function(eventInfo, fileName,fileContent){
    // The fileId has the pattern editor-<fileName><extension> Notice that the dots have been replaced in the filename so catalina.sh's id will be catalinash
    var fileId = 'editor-' + fileName.replace(/[^\w\s]/gi, '');
    // Keep a track of the opened documents
    this.openedDocuments.push({
      id:fileId,
      name:fileName
    });
    // Call the angular apply function to update the dom with the editor id
    this.$apply();
    this.$emit('init-editor-with-timeout',fileId,fileContent);
    debugger;
  },$scope));
  // Handle the init-editor-with-timeout which allows the ace editor to be created, then loads the file content after a timeout.
  $rootScope.$on('init-editor-with-timeout',$.proxy(function(eventInfo,fileId,fileContent){
    //Set a timeout
    setTimeout($.proxy(function(fileId,fileContent){
        //Call the service to init the editor on the target div
        this.initEditor(fileId);
        //Load the file content into the editor
        this.loadContent(fileId,fileContent);
      },this,fileId,fileContent),200);
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