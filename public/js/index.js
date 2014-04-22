$(document).ready(function (){
  $.mobile.defaultPageTransition = "slide"

  
  tappable(".major_box", {
    onTap: function(e, target){
      MajorId = $(target).attr("value")
      window.localStorage.setItem("selectedMajorId", MajorId);
      $.ajax({
        url: "/quest/large" ,
        type: "POST",
        data: {
          selectedMajorId: window.localStorage.getItem("selectedMajorId"),
        },
        success: function(data) {
          location.href= "#index"
          if (data.error_code ==1) {
            $(".major_circle-active").each(function(index) { $(this).removeClass("major_circle-active").addClass("major_circle") })
            $(target).children(".major_circle").removeClass("major_circle").addClass("major_circle-active")
            $("#main_frame").contents().find("#content_box").html("")
            for (i = 0; i < data.title.length; i++) {
              $("#main_frame").contents().find("#content_box").append(" " +
                "<div class = 'list_box' id='each_quest' value='"+ data.quest_id[i] + "'>"  +
                  "<div class = 'list_rt red'>" +
                  "</div>" +
                  "<div class = 'list_lt'>" +
                    (parseInt(i) + 1) +
                  "</div>" +
                  "<div class = 'list_ct'>" +
                    data.title[i]  +
                  "</div>" +
                "</div>" +
              " ")
            }
            $( "#leftpanel_index" ).panel( "close" );
            document.getElementById('main_frame').src = "main_frame.html#index"
          } else {
            alert(data.error_msg);
          }
        }
      });
    }
  });

  tappable("#each_quest", {
    onTap: function(e, target){
      window.localStorage.setItem("selectedQuest", $(target).attr("value"));
      $.ajax({
        url: "/quest/small" ,
        type: "POST",
        data: {
          questId:$(target).attr("value")
        },
        success: function(data) {
          if (data.error_code ==1) {
            $("#detail_content_box").html("")
            $("#detail_title_box").text(data.large_title)
            for (i = 0; i < data.title.length; i++) {
              $("#detail_content_box").append(" " +
                "<div class = 'list_box_of_detail'>" +
                 "<div class = 'list_lt_of_detail'>" +
                    (parseInt(i)+1) +
                  "</div>" +
                  "<div class = 'list_ct_of_detail'>" +
                     data.title[i] +
                  "</div>" +
                "</div>" +
            "")}
            location.href= "#detail_quest"
          } else {
            alert(data.error_msg);
          }
        }
      });
    }
  });

  tappable('#go_menu', function(){

    $.ajax({
      url: "/api/menu" ,
      type: "POST",
      data: {
      },
      success: function(data) {
        $("#main_frame").contents().find("#menu_box").html("")
        if (data.error_code ==1) {
          for (i = 0; i < data.day_array.length; i++) {
            $("#main_frame").contents().find("#menu_box").append(" " +
            "<div class = 'list_box'>" +
              "<div class = 'list_lt'>" +
                 data.day_array[i] +
              "</div>" +
              "<div class = 'list_ct'>"+
              "</div>" +
            "</div>" +
            "<div class = 'list_box' style='border-bottom:0'>" +
              "<div class = 'list_lt'>" +
              "</div>" +
              "<div class = 'list_ct'> 점심 : " +
                 data.lunch_array[i] +
              "</div>" +
            "</div>" +
            "<div class = 'list_box'>" +
              "<div class = 'list_lt'>" +
              "</div>" +
              "<div class = 'list_ct'> 저녁 : " +
                 data.dinner_array[i] +
              "</div>" +
            "</div>" +
            " ")
          }
          document.getElementById('main_frame').src = "main_frame.html#menu"
        } else {
          alert(data.error_msg);
        }
      }
    });
  });


  tappable('#target1', function(){
    location.href= "#page1"
  });
  tappable('#target2', function(){
    location.href= "#page2"
  });
  tappable('.date_box_lt', function(){
    history.back();
  });
  tappable('#qna', function(){
  //  var selectedMajor = window.localStorage.getItem("selectedMajor");
    var selectedMajor = 1
    $("#content_list").html("") 
    $.ajax({
      url: "/qna/list" ,
      type: "POST",
      data: {
        selectedMajor: selectedMajor,
      },
      success: function(data) {
        if (data.error_code ==1) {
          for (i = 0; i < data.writer.length; i++) {
            $("#content_list").append(" " +
            "<div class = 'list_box_of_detail' id='qna_" + data.id[i] + "'>" +
              "<div class = 'list_lt_of_qna1'>" +
                (i + 1) +
              "</div>" +
              "<div class = 'list_lt_of_qna2'>" +
                 data.writer[i] +
              "</div>" +
              "<div class = 'list_ct_of_qna'>" +
                 data.content[i] +
              "</div>" +
            "</div>" +
            " ")
            tappable("#qna_" + data.id[i], {
              onTap: function(e, target){
                var qna_content = $(target).children(".list_ct_of_qna").text();
                var qna_name = $(target).children(".list_lt_of_qna2").text();
                $("#each_qna_name").text(qna_name)
                $("#each_qna_content").text(qna_content)
                location.href= "#qnadetail"
              }
            });

          }
          location.href= "#qnapage"
        } else {
          alert(data.error_msg);
        }
      }
    });
  });
  tappable('#submit_qna', function(){
    var selectedMajor = 1
    var content = $("#content_qna").val();
    var name = $("#name_qna").val();
    if (content == "")  {
      alert("빈칸을 모두 채워주십시오")
      return
    }
    if (name == "")  {
      alert("빈칸을 모두 채워주십시오")
      return
    }
    $.ajax({
      url: "/qna/write" ,
      type: "POST",
      data: {
        selectedMajor: selectedMajor,
        content: content,
        name: name
      },
      success: function(data) {
        if (data.error_code ==1) {
          $("#content_list").append(" " +
          "<div class = 'list_box_of_detail'>" +
            "<div class = 'list_lt_of_qna1'>" +
              data.number +
            "</div>" +
            "<div class = 'list_lt_of_qna2'>" +
               name +
            "</div>" +
            "<div class = 'list_ct_of_qna'>" +
               content +
            "</div>" +
          "</div>" +
          " ")
        } else {
          alert(data.error_msg);
        }
      }
    });
  });
  tappable('#target3', function(){
    location.href= "#page3"
  });
  tappable('#target3', function(){
    location.href= "#page3"
  });
  tappable('#target3', function(){
    location.href= "#page3"
  });
  tappable('#target3', function(){
    location.href= "#page3"
  });
  tappable('#syllabus', function(){
    document.getElementById('main_frame').src = "main_frame.html#syllabus_page"
    $("#rightpannel_index").pannel("close");
  });
  tappable('#logbook', function(){
    document.getElementById('main_frame').src = "main_frame.html#index"
  });
  tappable('#menu_lt_index', function(){
    $( "#leftpanel_index" ).panel( "open");
  });
  tappable('#menu_rt_index', function(){
    $( "#rightpanel_index" ).panel( "open");
  });
  tappable('#menu_lt_page2', function(){
    $( "#leftpanel_page2" ).panel( "open");
  });
  tappable('#menu_rt_page2', function(){
    $( "#rightpanel_page2" ).panel( "open");
  });
  tappable('#menu_lt_qnapage', function(){
    $( "#leftpanel_qnapage" ).panel( "open");
  });
  tappable('#menu_rt_qnapage', function(){
    $( "#rightpanel_qnapage" ).panel( "open");
  });
  tappable('#menu_lt_qnadetail', function(){
    $( "#leftpanel_qnadetail" ).panel( "open");
  });
  tappable('#menu_rt_qnadetail', function(){
    $( "#rightpanel_qnadetail" ).panel( "open");
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
    
