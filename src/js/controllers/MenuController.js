// Define the menu controller
eyeApp.controller('MenuController', ['$scope','$http','$rootScope','FileSystemService',function ($scope,$http,$rootScope,fsService) {
  
  // Inject Service
  $scope.fsService = fsService;
  
  $http.get('config/menu.json').success(function(data) {
    $scope.menus = data;
  });
  
  // Handle clicks done on menu items
  $scope.handleMenuItemClick = function(){
    var clickedMenuItem = $(window.event.target);
    var eventName = clickedMenuItem.data('event');
    //Check if this menu item has an event associated with it, if yes, broadcast it
    if (angular.isString(eventName)){
      $rootScope.$emit(eventName);
    }
  };
  
  // Register event handlers for services
  // Handler for the new file event
  $rootScope.$on('file-new',$.proxy(function(){
    this.$emit('spawn-new-tab');
  },$scope));
  
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
            },this,fileObject);
            fileObject.file(callback);
          }
      },this);
      
      // Trigger the file browser dialog in chrome
      chrome.fileSystem.chooseEntry({
          type: 'openFile'
      },chooseFileEntryCallback);
  },$scope));
  $rootScope.$on('file-openfolder',fsService.openFolder);
  $rootScope.$on('file-savefile',fsService.saveFile);
  $rootScope.$on('file-savefileas',fsService.saveFileAs);
}]);