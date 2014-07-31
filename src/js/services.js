eyeApp.factory("EditorService",['$rootScope',function($rootScope){
  //Init Ace
  var aceEdit;
  
  //Define the services
  var service = {
    //Initialize the Ace editor
    initEditor:function(containerId){
      aceEdit = ace.edit(containerId);
  
      var editor = $('#' + containerId),
      
      //Set its height and width according to the screens resolution, we do this because ace expects absolute values for height and width
      width = editor.parent().width()-280,
      height = (screen.height*90/100);
      
      editor.css('width',width);
      editor.css('height',height);
    },
    loadContent:function(){
      var ace = ace.edit("editor");
          ace.setValue(e.target.result);
    }
  };
  return service;
}]);

eyeApp.factory("FileSystemService", ['$rootScope',function($rootScope) {
  var service = {
    newFile:function(){
      
    },
    openFile: function () {
      chrome.fileSystem.chooseEntry({
          type: 'openFile'
      }, 
      function(fileObject){
        fileObject.file(function(file) {
         var reader = new FileReader();
         reader.onload = function(e) {
           
         };
         reader.readAsText(file);
       });
      });
    },
    openFolder:function(){
      
    },
    saveFile:function(){
      
    },
    saveFileAs:function(){
      
    }
  };
  //Event handlers for services
  $rootScope.$on('file-new',service.newFile);
  $rootScope.$on('file-open',service.openFile);
  $rootScope.$on('file-openfolder',service.openFolder);
  $rootScope.$on('file-savefile',service.saveFile);
  $rootScope.$on('file-savefileas',service.saveFileAs);
  
  return service;
}]);