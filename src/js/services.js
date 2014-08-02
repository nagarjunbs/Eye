eyeApp.factory("EditorService",['$rootScope',function($rootScope){
  //Init Ace
  var aceEditors = [],
      editorWidth = 0,
      editorHeight = 0;
  //Define the services
  var service = {
    //Initialize the Ace editor
    initEditor:function(containerId){
      var aceEdit = ace.edit(containerId);
  
      var editor = $('#' + containerId);
      // If this is the first time an editor is being rendered, calculate the height and width and cache it
      if (editorWidth==0 && editorHeight==0){
        //Set its height and width according to the screens resolution, we do this because ace expects absolute values for height and width
        editorWidth = editor.parent().width(),
        editorHeight = (screen.height*85/100);
      }
      
      editor.css('width',editorWidth);
      editor.css('height',editorHeight);
      
      aceEditors[containerId] = aceEdit;
    },
    // Helper function to load given content into the mapped ace editor
    loadContent:function(fileId,fileContent){
      // If the mapping is present in the ace editor map, load the ace editor with the given content
      if (aceEditors[fileId]){
        aceEditors[fileId].setValue(fileContent);
      }
    }
  };
  return service;
}]);

eyeApp.factory("FileSystemService", [function() {
  var service = {
    newFile:function(){
      
    },
    // Scoped utility function to trigger a file open dialog using the chrome FileSystem API's.
    openFile: function (evt, args) {
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