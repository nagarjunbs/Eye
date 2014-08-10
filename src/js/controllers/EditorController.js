// Define the editor controller
eyeApp.controller('EditorController', ['$scope','$http','$rootScope','EditorService',function ($scope,$http,$rootScope,editorService) {
  
  $scope.openedDocuments = [];
  
  // Register scoped event handlers
  $rootScope.$on('load-opened-file-content',$.proxy(function(editorService,eventInfo, fileName,fileContent){
    // The fileId has the pattern editor-<fileName><extension> Notice that the dots have been replaced in the filename so catalina.sh's id will be catalinash
    var fileId = editorService.getTabIdFromFileName(fileName);
    
    editorService.trackFile(this.openedDocuments,fileId,fileName);
    
    // Call the angular apply function to update the dom with the editor id
    this.$apply();
    
    // Call the service to init the editor on the target div
    var editorObj = editorService.initEditor(fileId);
    
    // Load the file content into the editor
    editorService.loadContent(fileId,fileContent);
    
    // Add event handlers to the editor
    editorObj.getSession().selection.on('changeCursor', $.proxy(function(editorObj) {
      // Emit this event every time the cursor position changes
      this.$emit('update-line-column-count',editorObj.selection.getCursor());
    },this,editorObj));
    
  },$scope,editorService));
  
  // Handle spawning new tabs through the service
  $rootScope.$on('spawn-new-tab',$.proxy(function(editorService,eventInfo){
    var fileName = editorService.generateNewFileName(),
        fileId = editorService.getTabIdFromFileName(fileName);
    
    editorService.trackFile(this.openedDocuments,fileId,'New File*');
    //this.$apply();
    setTimeout($.proxy(function(){
      this.$apply();
      editorService.initEditor(fileId);
    },this),10);
  },$scope,editorService));
}]);