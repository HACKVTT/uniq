$(document).ready(function(){

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
    var availableTags = [
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
    $( "#to, #from" ).autocomplete({
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

    $(".datepicker").datepicker().on("change", function() {
        var number_night = getNumberDate();
        $(".js_number_night").text(number_night);
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