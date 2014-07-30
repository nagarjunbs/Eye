eyeApp.factory("FileSystemService", function() {
  var service = {
    newFile:function(){
      
    },
    openFile: function () {
      chrome.fileSystem.chooseEntry({
          type: 'openFile'
      }, 
      function(fileObject){
        
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
});