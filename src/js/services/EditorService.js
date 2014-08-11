eyeApp.factory("EditorService",function(){
  // Init Ace
  var aceEditors = [],
      editorWidth = 0,
      editorHeight = 0,
      fileNameIdReplacePattern = /[^\w\s]/gi;
  // Define the services
  var service = {
    // Initialize the Ace editor
    initEditor:function(containerId){
      var aceEdit = ace.edit(containerId);

      var editor = $('#' + containerId);
      // If this is the first time an editor is being rendered, calculate the height and width and cache it
      if (editorWidth===0 && editorHeight===0){
        //Set its height and width according to the screens resolution, we do this because ace expects absolute values for height and width
        editorWidth = editor.parent().width();
        editorHeight = screen.height*88.5/100;
      }

      editor.css('width',editorWidth);
      editor.css('height',editorHeight);

      // Maintain a mapping between the containerId and the actual aceeditor
      aceEditors[containerId] = aceEdit;

      return aceEdit;
    },
    // Helper function to load given content into the mapped ace editor
    loadContent:function(fileId,fileContent){
      var currentEditor = aceEditors[fileId];
      // If the mapping is present in the ace editor map, load the ace editor with the given content
      if (currentEditor){
        currentEditor.setValue(fileContent);
        currentEditor.navigateTo(0, 0);
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
    },
    generateNewFileName:function(){
      return (Math.random()*1+1000);
    },
    getTabIdFromFileName:function(fileName){
      return 'editor-' + this.getIdFromFileName(fileName);
    },
    getIdFromFileName:function(fileName){
      if (typeof fileName == 'string')
        return fileName.replace(fileNameIdReplacePattern, '');
      else if (typeof fileName == 'number')
        return Math.floor(fileName);
    }
  };
  return service;
});
