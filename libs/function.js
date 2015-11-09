function loadPage(urlreq, id, ctn, ttl) 
{
    /** 
        where I do something for 
        load page by ajax method.
    */
    var estr ='';
    $.ajax({
        url: urlreq,
        context: document.body,

        beforeSend : function() {
            ctn.fadeOut();
            $('#loading').show();

        },

        success: function(data) {
            $(data).each(function(i, e) {
                if(e.id != undefined 
                && e.id != estr 
                && e.id == 'loadcontent')
                {
                    var ct = $(e).find('#'+id);
                    ctn.html($(ct));
                }
            });
        },
         
        complete : function() {
            ctn.fadeIn();
            $('#loading').hide();

            window.history.pushState({"html":'', "pageTitle":ttl}, "", urlreq);

            //=======================================================
            // Link ajax
            //=======================================================
            linkAjax();

            //=======================================================
            // Form
            //=======================================================
            $('#numberAll, #numberAll2').on("click",function() {
                var status = $(this).siblings(".ToggleActive").length;
                // console.log(status);
                if (status === 1) {
                    $(".DropSelect").removeClass("ToggleActive");
                } else {
                    $(".DropSelect").addClass("ToggleActive");
                }

            });


            // Book Ticket
            $('#flightContent .tab-pane').each(function(i, d) {
                var m_xcl_sum = $(d).find('.xcl_sum');
                if(m_xcl_sum.size()) 
                {
                    var m_xcl_sum_view = $(d).find('.xcl_sum_view');
                    var m_xcl_itm = $(d).find('.xcl-itm');
                    var m_sum = 0;
                    m_xcl_itm.each(function(i, d) {
                        m_sum += parseInt($(d).val());
                    });
                    m_xcl_sum.val(m_sum);
                    m_xcl_sum_view.text(m_sum);
                    var plus = $(d).find('.plus');
                    var minus = $(d).find('.minus');
                    plus.each(function(i, m) {
                        $(m).click(function(e) {
                            var m_input = $(this).prev();
                            var m_input_val = parseInt(m_input.val()) + 1;
                            m_sum = parseInt(m_xcl_sum.val()) + 1;
                            if (m_sum <= 9) {
                                m_sum = 0;
                                m_input.val(m_input_val);
                                m_xcl_itm.each(function(i, d) {
                                    m_sum += parseInt($(d).val());
                                });
                                m_xcl_sum.val(m_sum);
                                m_xcl_sum_view.text(m_sum);
                            }
                            else
                            {
                                if(m_input_val <= 0) 
                                {
                                    m_input_val = 0;
                                }
                                else if(m_input_val >= 9) 
                                {
                                    m_input_val = 9;
                                }
                            }
                        });
                    });

                    minus.each(function(i, m) {
                        $(m).click(function(e) {
                            var m_input = $(this).next();
                            var m_input_val = parseInt(m_input.val()) - 1;
                            m_sum = parseInt(m_xcl_sum.val()) + 1;
                            if (m_input_val >= 0) {
                                m_sum = 0;
                                m_input.val(m_input_val);
                                m_xcl_itm.each(function(i, d) {
                                    m_sum += parseInt($(d).val());
                                });
                                m_xcl_sum.val(m_sum);
                                m_xcl_sum_view.text(m_sum);
                            }
                            else 
                            {
                                if(m_input_val <= 0) 
                                {
                                    m_input_val = 0;
                                }
                                else if(m_input_val >= 9) 
                                {
                                    m_input_val = 9;
                                }
                            }
                        });
                    });
                }
            });

            // Auto Complete

          $(function() {
            window.availableTags = [
              "ActionScript",
              "AppleScript",
              "Asp",
              "BASIC",
              "C",
              "C++",
              "Clojure",
              "COBOL",
              "ColdFusion",
              "Erlang",
              "Fortran",
              "Groovy",
              "Haskell",
              "Java",
              "JavaScript",
              "Lisp",
              "Perl",
              "PHP",
              "Python",
              "Ruby",
              "Scala",
              "Scheme"
            ];
            $(".js_to_1, .js_to_2, .js_from_1, .js_from_2, .js_return_from, .js_return_to, .js_oneway_from, .js_oneway_to, #from, #to").autocomplete({
              source: availableTags
            });
          });

            //=========Book Adroom=========//

            var i = 1;
            $(".js_add_room").on("click", function(e) {
                e.preventDefault();
                i++;

                var htmlroom = '<div class="clearfix"></div><div class="quantity"><div class="col-xs-3">Room '+i+ '</div><div class="form-group"><label for="from">Adults<br></label><div class="select-div"><select name="" id=""><option value="1">1</option></select></div><div class="clearfix"></div></div><div class="form-group"><label for="to">Seniors<br></label><div class="select-div"><select name="" id=""><option value="1">1</option></select></div></div></div>'; 
                      
                $(this).parent().siblings(".quantity").append(htmlroom);
            });


            //======date Picker============//
            $( ".datepicker" ).datepicker();

            //=========get date Picker===========//
            $(".js_number_night").text(0);
            $(".datepicker").datepicker().on("change", function() {

                var number_night = getNumberDate();
                if (isNaN(number_night)==true){
                    number_night =0;
                }
                $(".js_number_night").text(number_night);
            });


            // ========= add Flight ==============//

            var num_flight = 2;

            $(".js_add_flight").on("click",function (e) {
                e.preventDefault();

                ++num_flight;

                var html_flight = "";
                    html_flight += '<div class="coverflight">';
                    
                    html_flight += '<h4 class="FlightNumber"><span class="TitleFlight">Flight '+num_flight+' :</span><span class="BorderBottom"> </span></h4>';

                    html_flight += '<div class="form-group"><label class="lbl-left" for="from">Leaving from</label><input type="text" name="name_from_'+ num_flight +'" class="form-control city js_from_'+ num_flight +'" placeholder="City or airport"></div>';

                    html_flight += '<div class="form-group"><label class="lbl-left" for="to">Going To</label><input type="text" name="name_to_'+ num_flight +'" class="form-control city js_to_'+ num_flight +'" placeholder="City or airport"></div>';

                    html_flight += '<div class="row"><div class="col-sm-6 form-group"><p>Leave</p><input type="text" class="BgXanh BgLich datepicker"></div><div class="col-sm-6 form-group"><p>&nbsp;</p><div class="select-div"><select id="" name=""><option value="1">Anytime</option></select></div></div></div>';
                    html_flight +="</div>";

                

                $(this).prev(".coverflight").after(html_flight);
                $( ".datepicker" ).datepicker();

                $( '.js_from_'+ num_flight +', .js_to_' + num_flight +'' ).autocomplete({
                    source: availableTags
                });
            });
        }, 
        error : function() {

        }

    }).done(function(RTxt) {
        
    });
}



$(document).ready(function() {

    //=======================================================
    // Link ajax
    //=======================================================
    linkAjax();


	// Show Book Ticket
    $('#numberAll, #numberAll2').on("click",function() {
		var status = $(this).siblings(".ToggleActive").length;
		// console.log(status);
		if (status === 1) {
			$(".DropSelect").removeClass("ToggleActive");
		} else {
			$(".DropSelect").addClass("ToggleActive");
		}

	});


	// Book Ticket
    $('#flightContent .tab-pane').each(function(i, d) {
        var m_xcl_sum = $(d).find('.xcl_sum');
        if(m_xcl_sum.size()) 
        {
            var m_xcl_sum_view = $(d).find('.xcl_sum_view');
            var m_xcl_itm = $(d).find('.xcl-itm');
            var m_sum = 0;
            m_xcl_itm.each(function(i, d) {
                m_sum += parseInt($(d).val());
            });
            m_xcl_sum.val(m_sum);
            m_xcl_sum_view.text(m_sum);
            var plus = $(d).find('.plus');
            var minus = $(d).find('.minus');
            plus.each(function(i, m) {
                $(m).click(function(e) {
                    var m_input = $(this).prev();
                    var m_input_val = parseInt(m_input.val()) + 1;
                    m_sum = parseInt(m_xcl_sum.val()) + 1;
                    if (m_sum <= 9) {
                        m_sum = 0;
                        m_input.val(m_input_val);
                        m_xcl_itm.each(function(i, d) {
                            m_sum += parseInt($(d).val());
                        });
                        m_xcl_sum.val(m_sum);
                        m_xcl_sum_view.text(m_sum);
                    }
                    else
                    {
                        if(m_input_val <= 0) 
                        {
                            m_input_val = 0;
                        }
                        else if(m_input_val >= 9) 
                        {
                            m_input_val = 9;
                        }
                    }
                });
            });

            minus.each(function(i, m) {
                $(m).click(function(e) {
                    var m_input = $(this).next();
                    var m_input_val = parseInt(m_input.val()) - 1;
                    m_sum = parseInt(m_xcl_sum.val()) + 1;
                    if (m_input_val >= 0) {
                        m_sum = 0;
                        m_input.val(m_input_val);
                        m_xcl_itm.each(function(i, d) {
                            m_sum += parseInt($(d).val());
                        });
                        m_xcl_sum.val(m_sum);
                        m_xcl_sum_view.text(m_sum);
                    }
                    else 
                    {
                        if(m_input_val <= 0) 
                        {
                            m_input_val = 0;
                        }
                        else if(m_input_val >= 9) 
                        {
                            m_input_val = 9;
                        }
                    }
                });
            });
        }
    });

    // Auto Complete

  $(function() {
    window.availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $(".js_to_1, .js_to_2, .js_from_1, .js_from_2, .js_return_from, .js_return_to, .js_oneway_from, .js_oneway_to, #from, #to" ).autocomplete({
      source: availableTags
    });
  });

    //=========Book Adroom=========//

    var i = 1;
    $(".js_add_room").on("click", function(e) {
        e.preventDefault();
        i++;

        var htmlroom = '<div class="clearfix"></div><div class="quantity"><div class="col-xs-3">Room '+i+ '</div><div class="form-group"><label for="from">Adults<br></label><div class="select-div"><select name="" id=""><option value="1">1</option></select></div><div class="clearfix"></div></div><div class="form-group"><label for="to">Seniors<br></label><div class="select-div"><select name="" id=""><option value="1">1</option></select></div></div></div>'; 
              
        $(this).parent().siblings(".quantity").append(htmlroom);
    });


    //======date Picker============//
    $( ".datepicker" ).datepicker();

    //=========get date Picker===========//
    $(".js_number_night").text(0);
    $(".datepicker").datepicker().on("change", function() {

        var number_night = getNumberDate();
        if (isNaN(number_night)==true){
            number_night =0;
        }
        $(".js_number_night").text(number_night);
    });


    // ========= add Flight ==============//

    var num_flight = 2;

        $(".js_add_flight").on("click",function (e) {
            e.preventDefault();

            ++num_flight;

            var html_flight = "";
                html_flight += '<div class="coverflight">';
                
                html_flight += '<h4 class="FlightNumber"><span class="TitleFlight">Flight '+num_flight+' :</span><span class="BorderBottom"> </span></h4>';

                html_flight += '<div class="form-group"><label class="lbl-left" for="from">Leaving from</label><input type="text" name="name_from_'+ num_flight +'" class="form-control city js_from_'+ num_flight +'" placeholder="City or airport"></div>';

                html_flight += '<div class="form-group"><label class="lbl-left" for="to">Going To</label><input type="text" name="name_to_'+ num_flight +'" class="form-control city js_to_'+ num_flight +'" placeholder="City or airport"></div>';

                html_flight += '<div class="row"><div class="col-sm-6 form-group"><p>Leave</p><input type="text" class="BgXanh BgLich datepicker"></div><div class="col-sm-6 form-group"><p>&nbsp;</p><div class="select-div"><select id="" name=""><option value="1">Anytime</option></select></div></div></div>';
                html_flight +="</div>";

            

            $(this).prev(".coverflight").after(html_flight);
            $( ".datepicker" ).datepicker();

            $( '.js_from_'+ num_flight +', .js_to_' + num_flight +'' ).autocomplete({
                source: availableTags
            });
        });
});


    function getNumberDate() {
        var checkin_time = $(".js_name_checkin").val();
        var checkout_time = $(".js_name_checkout").val();
            
        var mydate_checkin = checkin_time.split('/'); 
        var mydate_checkout = checkout_time.split('/');

        var mydate_start = new Date();
        mydate_start.setDate(mydate_checkin[1]);
        mydate_start.setMonth(mydate_checkin[0]);
        mydate_start.setFullYear(mydate_checkin[2]);
        mydate_start.setHours(0);
        mydate_start.setMinutes(0);
        mydate_start.setSeconds(0);
        mydate_start.setMilliseconds(0);

        var mytime_start = mydate_start.getTime();
        // console.log(mytime_start);
        // console.log("Mydate: " + mydate_start);
        var mydate_end = new Date();
        mydate_end.setDate(mydate_checkout[1]);
        mydate_end.setMonth(mydate_checkout[0]);
        mydate_end.setFullYear(mydate_checkout[2]);
        mydate_end.setHours(0);
        mydate_end.setMinutes(0);
        mydate_end.setSeconds(0);
        mydate_end.setMilliseconds(0);   

        var mytime_end = mydate_end.getTime();
        var mytime = mytime_end - mytime_start;

        var number_date = mytime/(1000*60*60*24);
        if (number_date <0) {
            number_date = 0;
        }

        return number_date;
    }

    // Link Ajax

    function linkAjax (argument) {
        $(".js_whatwedo").on("click",function() {
            loadPage(
                $(this).attr('href'), 
                'about', 
                $('#loadcontent'),
                $(this).attr('title')
            );
            return false;
        });
        

        $(".js_load_inquire").on("click",function() {
            loadPage(
                $(this).attr('href'), 
                'inquiry', 
                $('#loadcontent'),
                $(this).attr('title')
            );
            return false;
        });

        $(".js_load_home").on("click",function() {
            loadPage(
                $(this).attr('href'), 
                'Home', 
                $('#loadcontent'), 
                $(this).attr('title')
            );
            return false;
        });
    }