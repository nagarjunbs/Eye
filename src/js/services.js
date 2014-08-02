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
    loadContent:function(fileId,fileContent){
      aceEditors[fileId].setValue(fileContent);
    }
  };
  return service;
}]);

eyeApp.factory("FileSystemService", ['$rootScope',function($rootScope) {
  var service = {
    newFile:function(){
      
    },
    openFile: function (evt, args) {
      //Preserve the scope passed to this function via jquery proxies
      var chooseFileEntryCallback = $.proxy(function(fileObject){
          var callback = $.proxy(function(fileEntry,chosenFileObject) {
            var reader = new FileReader();
            var readerProxy = $.proxy(function(fileEntry,chosenFileObject,event){
              this.$emit('load-opened-file-content',fileEntry.name,event.target.result);
            },this,fileEntry,chosenFileObject);
            reader.onloadend = readerProxy;
            reader.readAsText(chosenFileObject);
          },this,fileObject)
          fileObject.file(callback);
      },this);
      
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