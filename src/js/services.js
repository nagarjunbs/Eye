eyeApp.factory("EditorService",function(){
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
    }
  };
  return service;
});

eyeApp.factory("FileSystemService", function() {
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
           var ace = ace.edit("editor");
          ace.setValue(e.target.result);
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
  return service;
});