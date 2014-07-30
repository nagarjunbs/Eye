$(function(){
  //Init Ace
  ace.edit("editor");
  
  var editor = $('#editor'),
  //Set its height and width according to the screens resolution, we do this because ace expects absolute values for height and width
  width = editor.parent().width()-250,
  height = (screen.height*90/100);
  
  editor.css('width',width);
  editor.css('height',height);
})
