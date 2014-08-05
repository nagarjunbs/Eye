// Define the module
var eyeApp = angular.module('eyeApp', ['ui.bootstrap']);

// Define the editor controller
eyeApp.controller('eyeEditorController', ['$scope','$http','$rootScope','EditorService',function ($scope,$http,$rootScope,editorService) {
  
  $scope.openedDocuments = [];
  
  // Register scoped event handlers
  $rootScope.$on('load-opened-file-content',$.proxy(function(editorService,eventInfo, fileName,fileContent){
    // The fileId has the pattern editor-<fileName><extension> Notice that the dots have been replaced in the filename so catalina.sh's id will be catalinash
    var fileId = 'editor-' + fileName.replace(/[^\w\s]/gi, '');
    // Keep a track of the opened documents
    this.openedDocuments.push({
      id:fileId,
      name:fileName
    });
    // Call the angular apply function to update the dom with the editor id
    this.$apply();
    // Handle the init-editor-with-timeout which allows the ace editor to be created, then loads the file content after a timeout.
    //Set a timeout
    setTimeout($.proxy(function(fileId,fileContent){
        //Call the service to init the editor on the target div
        this.initEditor(fileId);
        //Load the file content into the editor
        this.loadContent(fileId,fileContent);
        //Add an event handler to the newly added tab, done this way so that all tab elements dont get a handler added over and over again
        var lastTabAdded = $('#tab-list a:last');
        lastTabAdded.tab('show');
        lastTabAdded.click(function (e) {
          lastTabAdded.tab('show');
        });
      },editorService,fileId,fileContent),200);
  },$scope,editorService));
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
  //Handler for the new file event
  $rootScope.$on('file-new',fsService.newFile);
  //Handler for the file open event
  $rootScope.$on('file-open',$.proxy(function(){
    // Preserve the scope passed to this function via jquery proxies throughout this chain since chrome switches to global scope given no scope
      var chooseFileEntryCallback = $.proxy(function(fileObject){
          //Check if the user pressed the cancel button, in which case, there would be no fileObject
          if (fileObject){
            // File available callback
            var callback = $.proxy(function(fileEntry,chosenFileObject) {
              // Make a new file reader
              var reader = new FileReader();
              //Create a proxy with an injected scope
              var readerProxy = $.proxy(function(fileEntry,chosenFileObject,event){
                //Emit an event after reading is done
                this.$emit('load-opened-file-content',fileEntry.name,event.target.result);
              },this,fileEntry,chosenFileObject);
              // Attach the scoped event handler
              reader.onloadend = readerProxy;
              // Trigger the read operation, which will call the handler above after it finishes
              reader.readAsText(chosenFileObject);
            },this,fileObject)
            fileObject.file(callback);
          }
      },this);
      
      // Trigger the file browser dialog in chrome
      chrome.fileSystem.chooseEntry({
          type: 'openFile'
      },chooseFileEntryCallback);
  }));
  $rootScope.$on('file-openfolder',fsService.openFolder);
  $rootScope.$on('file-savefile',fsService.saveFile);
  $rootScope.$on('file-savefileas',fsService.saveFileAs);
}]);