$(function(){
  $('#tab-list a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  })
});