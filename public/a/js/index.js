$(document).ready(function (){
  tappable('#target1', function(){
    location.href= "#page1"
  });
  tappable('#target2', function(){
    location.href= "#page2"
  });
  tappable('#target3', function(){
    location.href= "#page3"
  });
  tappable('#target4', function(){
    location.href= "#page4"
  });
  tappable('#target5', function(){
    location.href= "#page5"
  });
  tappable('#target6', function(){
    location.href= "#page6"
  });
  tappable('#logbook', function(){
    location.href= "#main_page"
  });
  tappable('#practice_notice', function(){
    location.href= "#practice"
  });
  $("#body").css("height","100%").css("height","-=0px");
  $("#logs_box").css("height","100%").css("height","-=200px");
  $("#body").css("max-height","100%").css("max-height","-=240px");
    width = $(window).width();
  $("label").css("width",width/5).css("width","-=3.19%").css("text-align","center");
  $(".ui-controlgroup-controls").css("width","100%");
  $(".ui-input-btn").css("height","100%").css("padding",0).css("margin",0).css("line-height","120px").css("background-color","#223A85").addClass("white_bold").css("font-size","30px");
  $("div.modal-inner").css("width","100%").css("width","-=60px");
    
 tappable('#submit' , function(){    
    var formData = new FormData($('#valuation')[0])
      $.ajax(
      {
         type: "POST",
         url: 'http://asanapp.com:8888/practice/valuation',
         type: 'POST',
         data: formData,
         async: false,
         cache: false,
         contentType: false,
         processData: false,
         beforeSend: function(data){
           window.location.replace('#result_modal');},
         success: function (data) {
           if (data.error_code == 1){
             $("#result_modal2").text("성공적으로 등록되었습니다")
           }
         },
         error: function(data)
         {
             $("#result_modal2").text("등록에 실패하였습니다")
         }
      });
 });
});
    
