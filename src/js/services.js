eyeApp.factory("EditorService",['$rootScope',function($rootScope){
  //Init Ace
  var aceEditors = [],
      editorWidth = 0,
      editorHeight = 0,
      fileNameIdReplacePattern = /[^\w\s]/gi;
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
    },
    trackFile:function(openedDocuments,fileId,fileName){
      //Loop through earlier recorded document tabs and set their active state to false
      $.each(openedDocuments,function(currentDoc){
        currentDoc.active = false;
      });
      
      // Push in the newest opened document with active set to true
      openedDocuments.push({
        id:fileId,
        name:fileName,
        active:true
      });
      return openedDocuments;
    },
    getTabIdFromFileName:function(fileName){
      return 'editor-' + this.getIdFromFileName(fileName)
    },
    getIdFromFileName:function(fileName){
      return fileName.replace(fileNameIdReplacePattern, '');
    }
  };
  return service;
}]);

eyeApp.factory("FileSystemService", [function() {
  var service = {
    newFile:function(){
      
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