eyeApp.factory("EditorService",['$rootScope',function($rootScope){
  //Init Ace
  var aceEditors = [];
  
  //Define the services
  var service = {
    //Initialize the Ace editor
    initEditor:function(containerId){
      var aceEdit = ace.edit(containerId);
  
      var editor = $('#' + containerId),
      
      //Set its height and width according to the screens resolution, we do this because ace expects absolute values for height and width
      width = editor.parent().width(),
      height = (screen.height*90/100);
      
      editor.css('width',width);
      editor.css('height',height);
      
      aceEditors[containerId] = aceEdit;
    },
    //helper function to load given content into the ace editor
    loadContent:function(event, fileContent){
      
      if (aceEdit){
        aceEdit.setValue(fileContent.target.result);
      }
    }
  };
  return service;
}]);

eyeApp.factory("FileSystemService", ['$rootScope',function($rootScope) {
  var service = {
    newFile:function(){
      
    },
    openFile: function (evt, args) {
      chrome.fileSystem.chooseEntry({
          type: 'openFile'
      },
      function(fileObject){
        // This callback is invoked from the global scope
        fileObject.file(function(file) {
         var reader = new FileReader();
         reader.onload = function(file) {
           // Hack to get around problematic closure scope which doesnt pass on the fileName to the below function
           angular.element("[ng-controller]").scope().$emit('register-opened-file',file);
           return function(e){
             // Get the scope of the first controller that is found in the dom and emit an event. This is a hack as of now because chrome executes callbacks to file system API's in the global scope
             angular.element("[ng-controller]").scope().$emit('load-opened-file-content',e);
           }
         }(file);
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
  return service;
}]);