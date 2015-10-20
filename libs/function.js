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
    
    // var m_xcl_sum_view = $('.xcl_sum_view');
    // var m_xcl_itm = $('.xcl-itm');
    // var m_sum = 0;
    // m_xcl_itm.each(function(i, d) {
    //     m_sum += parseInt($(d).val());
    // });
//////////////////////////////////////////////////////////
    // m_xcl_sum.val(m_sum);
    // m_xcl_sum_view.text(m_sum);

    // $('.plus').each(function(i, m) {
    //     $(m).click(function(e) {
    //         var m_input = $(this).prev();
    //         var m_input_val = parseInt(m_input.val()) + 1;
    //         m_sum = 0;
    //         if (m_input_val >= 0) {
    //             m_input.val(m_input_val);
    //             m_xcl_itm.each(function(i, d) {
    //                 m_sum += parseInt($(d).val());
    //             });
    //             m_xcl_sum.val(m_sum);
    //             m_xcl_sum_view.text(m_sum);
    //         } else {
    //             m_input_val = 0;
    //         }
    //     });
    // });
    // $('.minus').each(function(i, m) {
    //     $(m).click(function(e) {
    //         var m_input = $(this).next();
    //         var m_input_val = parseInt(m_input.val()) - 1;
    //         m_sum = 0;
    //         if (m_input_val >= 0) {
    //             m_input.val(m_input_val);
    //             m_xcl_itm.each(function(i, d) {
    //                 m_sum += parseInt($(d).val());
    //             });
    //             m_xcl_sum.val(m_sum);
    //             m_xcl_sum_view.text(m_sum);
    //         } else {
    //             m_input_val = 0;
    //         }
    //     });
    // });

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



    $( ".datepicker" ).datepicker();	
})