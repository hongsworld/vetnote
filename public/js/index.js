var host_url = "http://asanapp.com:8888"
var selectedMajor = 11 


$(document).ready(function (){
  $.mobile.defaultPageTransition = "slide"
    $.ajax({
      url: "/practice/daily" ,
      type: "POST",
      data: {selectedMajor: selectedMajor},
      success: function(data) {
        if (data.error_code ==1) {
          for (i = 0; i < data.log_title.length; i++) {
          $("#daily_logbook_box").append("" +
            "<div class = 'list_box_of_detail' id='daily_logbook_" + data.log_quest_id[i] + "'>" +
              "<div class = 'list_lt_of_detail'>" +
                (parseInt(i) + 1) +
              "</div>" +
              "<div class = 'daily_quest_title'>" +
                data.log_title[i] +
              "</div>" +
              "<div class = 'daily_quest_case'>" +
                "Case Number" +
                "<br>" +
                "#"  +  data.log_case_number[i] +
              "</div>" +
              "<div class = 'daily_quest_arrow'>" +
              "</div>" +
              "<div class = 'daily_add_camera' id='camera" + i + "'>" +
              "</div>" +
            "</div>" +
          "")
          $("#camera" + i).css("background-image","url('/img/" + data.log_picture_url[i] + "')");
          $("#camera" + i).css("border-radius","100px")
            tappable(".list_box_of_detail", {
              onTap: function(e, target){
                questId = $(target).attr("id").substr(14,2);
                $.ajax({
                  url: "/quest/small" ,
                  type: "POST",
                  data: {
                    questId: questId
                  },
                  success: function(data) {
                    if (data.error_code ==1) {
                      $("#detail_content_box").html("")
                      $("#detail_title_box").text(data.major)
                        $("#detail_content_box").append(" " +

                    "<div class = 'list_box_of_detail'>" +
                      "<div class = 'quest_ct_of_detail'>" +
                       data.large_title +
                      "</div>" +
                    "</div>" +
                    "")
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
          } 
          if (data.log_title.length == 0) {
            $("#daily_logbook_box").append("" +
              "<div class = 'list_box_of_detail' id='daily_logbook_" + "0" + "'>" +
                "<div class = 'list_lt_of_detail'>" +
                  "-" +
                "</div>" +
                "<div class = 'daily_quest_title'>" +
                  "기록된 로그북이 없습니다" +
                "</div>" +
                "<div class = 'daily_quest_case'>" +
                "</div>" +
                "<div class = 'daily_quest_arrow'>" +
                "</div>" +
                "<div class = 'daily_add_camera' id='camera_no'>" +
                "</div>" +
              "</div>" +
            "")
            $("#camera_no").css("background-color","#f1cdcc");
            $("#camera_no").css("border-radius","100px")
              tappable("#daily_logbook_0", {
                onTap: function(e, target){
                  $.ajax({
                    url: "/quest/large" ,
                    type: "POST",
                    data: {
                      selectedMajorId: selectedMajor
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
          }



          $("#daily_qna_box").html("")
          for (i = 0; i < data.qna_content.length; i++) {
            $("#daily_qna_box").append( "" +
            "<div class = 'list_box_of_detail' id='daily_qna_" + data.qna_id[i] + "'>" +
              "<div class = 'daily_list_rt gray'>" +
              "</div>" +
              "<div class = 'list_lt_of_detail'>" +
                (parseInt(i) + 1) +
              "</div>" +
              "<div class = 'daily_quest_title'>" +
               data.qna_content[i] + 
              "</div>" +
            "</div>" +
            "")

            tappable("#daily_qna_" + data.qna_id[i], {
              onTap: function(e, target){
                var qna_content = $(target).children(".daily_quest_title").text();
                $("#each_qna_content").text(qna_content)
                location.href= "#qnadetail"
              }
            });

          } 
          $("#more_learn_list").html("")
          for (i = 0; i < data.more_learn_text.length; i++) {
            $("#more_learn_list").append( "" +
            "<div class = 'list_box_of_detail' id='daily_more_learn_" + data.more_learn_id[i] + "'>" +
              "<div class = 'list_lt_of_detail'>" +
                "" +
              "</div>" +
              "<div class = 'daily_quest_title'>" +
               data.more_learn_text[i] + 
              "</div>" +
            "</div>" +
            "")

            tappable("#daily_more_learn_" + data.more_learn_id[i], {
              onTap: function(e, target){
                var more_learn_content = $(target).children(".daily_quest_title").text();
                $("#detail_more_learn").text(more_learn_content)
                location.href= "#morelearndetail"
              }
            });

          }
          if (data.comment_code == 2) {
            $("#student_comment_box").html("")
            $("#student_comment_box").removeClass("list_box_of_memo").addClass("list_box_of_detail_after_comment")
            $("#student_comment_box").append("" +
            "<div class = 'comment_box_of_detail'>" +
              "<div class = 'daily_textarea'>" +
              data.comment_text +
              "</div>"+
            "</div>"+
            "")
          } 
        } else {
          alert(data.error_msg);
        }
      }
    });

  $("#datepicker").change(function () {
      console.log($("#datepicker").val())

      $.ajax({
        url: "/practice/change_date" ,
        type: "POST",
        data: {
          input_date: $("#datepicker").val(),
          selectedMajor: selectedMajor
        },
        success: function(data) {
          $("#daily_logbook_box").html("")
          if (data.error_code ==1) {
            for (i = 0; i < data.log_title.length; i++) {
            $("#daily_logbook_box").append("" +
              "<div class = 'list_box_of_detail' id='daily_logbook_" + data.log_quest_id[i] + "'>" +
                "<div class = 'list_lt_of_detail'>" +
                  (parseInt(i) + 1) +
                "</div>" +
                "<div class = 'daily_quest_title'>" +
                  data.log_title[i] +
                "</div>" +
                "<div class = 'daily_quest_case'>" +
                  "Case Number" +
                  "<br>" +
                  "#"  +  data.log_case_number[i] +
                "</div>" +
                "<div class = 'daily_quest_arrow'>" +
                "</div>" +
                "<div class = 'daily_add_camera' id='camera" + i + "'>" +
                "</div>" +
              "</div>" +
            "")
            $("#camera" + i).css("background-image","url('/img/" + data.log_picture_url[i] + "')");
            $("#camera" + i).css("border-radius","100px")
              tappable(".list_box_of_detail", {
                onTap: function(e, target){
                  questId = $(target).attr("id").substr(14,2);
                  $.ajax({
                    url: "/quest/small" ,
                    type: "POST",
                    data: {
                      questId: questId
                    },
                    success: function(data) {
                      if (data.error_code ==1) {
                        $("#detail_content_box").html("")
                        $("#detail_title_box").text(data.major)
                          $("#detail_content_box").append(" " +

                      "<div class = 'list_box_of_detail'>" +
                        "<div class = 'quest_ct_of_detail'>" +
                         data.large_title +
                        "</div>" +
                      "</div>" +
                      "")
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
            } 

          if (data.log_title.length == 0) {
            $("#daily_logbook_box").append("" +
              "<div class = 'list_box_of_detail' id='daily_logbook_" + "0" + "'>" +
                "<div class = 'list_lt_of_detail'>" +
                  "-" +
                "</div>" +
                "<div class = 'daily_quest_title'>" +
                  "기록된 로그북이 없습니다" +
                "</div>" +
                "<div class = 'daily_quest_case'>" +
                "</div>" +
                "<div class = 'daily_quest_arrow'>" +
                "</div>" +
                "<div class = 'daily_add_camera' id='camera_no'>" +
                "</div>" +
              "</div>" +
            "")
            $("#camera_no").css("background-color","#f1cdcc");
            $("#camera_no").css("border-radius","100px")
              tappable("#daily_logbook_0", {
                onTap: function(e, target){
                  $.ajax({
                    url: "/quest/large" ,
                    type: "POST",
                    data: {
                      selectedMajorId: selectedMajor
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
          }


            $("#daily_qna_box").html("")
            for (i = 0; i < data.qna_content.length; i++) {
              $("#daily_qna_box").append( "" +
              "<div class = 'list_box_of_detail' id='daily_qna_" + data.qna_id[i] + "'>" +
                "<div class = 'daily_list_rt gray'>" +
                "</div>" +
                "<div class = 'list_lt_of_detail'>" +
                  (parseInt(i) + 1) +
                "</div>" +
                "<div class = 'daily_quest_title'>" +
                 data.qna_content[i] + 
                "</div>" +
              "</div>" +
              "")

              tappable("#daily_qna_" + data.qna_id[i], {
                onTap: function(e, target){
                  var qna_content = $(target).children(".daily_quest_title").text();
                  $("#each_qna_content").text(qna_content)
                  location.href= "#qnadetail"
                }
              });

            } 
            $("#more_learn_list").html("")
            for (i = 0; i < data.more_learn_text.length; i++) {
              $("#more_learn_list").append( "" +
              "<div class = 'list_box_of_detail' id='daily_more_learn_" + data.more_learn_id[i] + "'>" +
                "<div class = 'list_lt_of_detail'>" +
                  "" +
                "</div>" +
                "<div class = 'daily_quest_title'>" +
                 data.more_learn_text[i] + 
                "</div>" +
              "</div>" +
              "")

              tappable("#daily_more_learn_" + data.more_learn_id[i], {
                onTap: function(e, target){
                  var more_learn_content = $(target).children(".daily_quest_title").text();
                  $("#detail_more_learn").text(more_learn_content)
                  location.href= "#morelearndetail"
                }
              });

            }
            if (data.comment_code == 2) {
              $("#student_comment_box").html("")
              $("#student_comment_box").removeClass("list_box_of_memo").addClass("list_box_of_detail_after_comment")
              $("#student_comment_box").append("" +
              "<div class = 'comment_box_of_detail'>" +
                "<div class = 'daily_textarea'>" +
                data.comment_text +
                "</div>"+
              "</div>"+
              "")
            } else if (data.comment_code ==1){
              $("#student_comment_box").addClass("list_box_of_memo").removeClass("list_box_of_detail_after_comment")
              $("#student_comment_box").html(""+ 
                "<div>" + 
                "<br>" + 
                "<div id='daily_more_learn' class='daily_textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow' style='height: 265px;'>등록된 학생 코멘트가 없습니다.</div>" +
                "</div>" +
              "")



            }


          } else {
            alert(data.error_msg);
          }
        }
      });


    })
    .change();
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
            $("#detail_title_box").text(data.major)
              $("#detail_content_box").append(" " +

          "<div class = 'list_box_of_detail'>" +
            "<div class = 'quest_ct_of_detail'>" +
             data.large_title +
            "</div>" +
          "</div>" +
          "")
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
          $("#rightpanel_index").panel("close");
          document.getElementById('main_frame').src = "main_frame.html#menu"
        } else {
          alert(data.error_msg);
        }
      }
    });
  });

  tappable('#temptemp', function(){
    location.href= "#detail_quest"
  });

  tappable('#go_daily_practice', function(){
    document.getElementById('main_frame').src = "main_frame.html#daily_practice"
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
    var selectedMajor = window.localStorage.getItem("selectedMajorId");
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
    $("#rightpanel_index").panel("close");
    document.getElementById('main_frame').src = "main_frame.html#syllabus_page"
  });
  tappable('#logbook', function(){
    $("#rightpanel_index").panel("close");
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

  tappable('#daily_submit', function(){
    student_comment = $("#daily_student_comment").val()
    more_learn = $("#daily_more_learn").val()
    $.ajax({
      url: "/practice/daily" ,
      type: "POST",
      data: {
        student_comment: student_comment,
        more_learn: more_learn
      },
      success: function(data) {
        if (data.error_code ==1) {
          location.href= "#qnapage"
        } else {
          alert(data.error_msg);
        }
      }
    });

  });
  
  tappable('#casesubmit', function(){
    selectedQuest = window.localStorage.getItem("selectedQuest");
    console.log("start")
    $("#case_number").val($("#case_input").val())
    $("#quest_id").val(selectedQuest)
    console.log($("#case_number").val());
    
    var formData = new FormData($('#formData')[0])
    $.ajax(
    {
      type: "POST",
      url: host_url + '/quest/record_case',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      timeout: 25000,
      beforeSend: function(data){
        console.log("fire")
      },
      success: function (data) {
        if (data.error_code == 1){
          console.log("성공적으로 등록되었습니다")

          $.ajax({
            url: "/practice/daily" ,
            type: "POST",
            success: function(data) {
              if (data.error_code ==1) {


                $("#daily_logbook_box").html("")
                for (i = 0; i < data.log_title.length; i++) {
                $("#daily_logbook_box").append("" +
                  "<div class = 'list_box_of_detail' id='daily_logbook'>" +
                    "<div class = 'list_lt_of_detail'>" +
                      (parseInt(i) + 1) +
                    "</div>" +
                    "<div class = 'daily_quest_title'>" +
                      data.log_title[i] +
                    "</div>" +
                    "<div class = 'daily_quest_case'>" +
                      "Case Number" +
                      "<br>" +
                      "#"  +  data.log_case_number[i] +
                    "</div>" +
                    "<div class = 'daily_quest_arrow'>" +
                    "</div>" +
                    "<div class = 'daily_add_camera' id='camera" + i + "'>" +
                    "</div>" +
                  "</div>" +
                "")
                $("#camera" + i).css("background-image","url('/img/" + data.log_picture_url[i] + "')");
                $("#camera" + i).css("border-radius","100px")
                } 
              
              } else {
                alert(data.error_msg);
              }
            }
          });

          location.href= "#daily_practice"
          
        }
      },
      error: function(data)
      {
          console.log("등록에 실패하였습니다")
      }
    });
  });

  tappable('#submit_qna', function(){
    var selectedMajor = window.localStorage.getItem("selectedMajorId")
    $("#qna_selected_major").val(selectedMajor)
    var content = $("#content_qna").val();
    var name="Tester"
    if (content == "")  {
      alert("빈칸을 모두 채워주십시오")
      return
    }
    console.log("start")
    $("#qna_content").val($("#content_qna").val())
    var formData = new FormData($('#qna_form')[0])
    $.ajax(
    {
      type: "POST",
      url: host_url + '/qna/write',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      timeout: 25000,
      beforeSend: function(data){
        console.log("fire")
      },
      success: function (data) {
        if (data.error_code == 1){
          console.log("성공적으로 등록되었습니다")
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
        }
      },
      error: function(data)
      {
          console.log("등록에 실패하였습니다")
      }
    });
  });

  tappable('#submit_more_learn', function(){
    daily_more_learn = $("#daily_more_learn").val()
    $.ajax(
    {
      type: "POST",
      url: host_url + '/practice/more_learn',
      data: {
        more_learn: daily_more_learn
      },
      beforeSend: function(data){
        console.log("fire")
      },
      success: function (data) {
        if (data.error_code == 1){
          console.log("성공적으로 등록되었습니다")
          $("#daily_more_learn").val("");
          $("#more_learn_list").append( "" +
          "<div class = 'list_box_of_detail' id='new_more_learn" + "" + "'>" +
            "<div class = 'list_lt_of_detail'>" +
              "" +
            "</div>" +
            "<div class = 'daily_quest_title'>" +
             daily_more_learn + 
            "</div>" +
          "</div>" +
          "")
          tappable("#new_more_learn", {
            onTap: function(e, target){
              var more_learn_content = $(target).children(".daily_quest_title").text();
              $("#detail_more_learn").text(more_learn_content)
              location.href= "#morelearndetail"
            }
          });
        }
      },
      error: function(data)
      {
          console.log("등록에 실패하였습니다")
      }
    });
  });



  tappable('#submit_student_comment', function(){

    var validation = confirm ("정말 등록하시겠습니까? \n 코멘트는 등록후 수정이 불가능합니다");
    if (validation == true) {
      daily_student_comment = $("#daily_student_comment").val()
      $.ajax(
      {
        type: "POST",
        url: host_url + '/practice/student_comment',
        data: {
          student_comment: daily_student_comment
        },
        beforeSend: function(data){
          console.log("fire")
        },
        success: function (data) {
          if (data.error_code == 1){
            console.log("성공적으로 등록되었습니다")
            $("#student_comment_box").html("")
            $("#student_comment_box").removeClass("list_box_of_memo").addClass("list_box_of_detail_after_comment")
            $("#student_comment_box").append("" +
            "<div class = 'comment_box_of_detail'>" +
              "<div class = 'daily_textarea'>" +
              daily_student_comment +
              "</div>"+
            "</div>"+
            "")
          }
        },
        error: function(data)
        {
            console.log("등록에 실패하였습니다")
        }
      });
    }
  });






});
