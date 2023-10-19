jQuery(function($){
    $.fn.extend({
        scrollToMe: function(){
            if($(this).length){
                var top = $(this).offset().top - 134;
                $('html,body').animate({scrollTop: top}, 300);
            }
        },
        scrollToJustMe: function(){
            if($(this).length){
                var top = jQuery(this).offset().top;
                $('html,body').animate({scrollTop: top}, 300);
            }
        }
    });
    
    $(".main-nav a").off("click").on("click", function(){
        var url = $(this).attr("href");
        if(url.indexOf("#") > -1) {
            $(url).scrollToMe();
            return false;
        }
    });
    
    var windowScroll_t;
    $(window).scroll(function(){
        clearTimeout(windowScroll_t);
        windowScroll_t = setTimeout(function(){
            if(jQuery(this).scrollTop() > 134){
                $('#totop').fadeIn();
            }else{
                $('#totop').fadeOut();
            }
        }, 500);
    });
    $('#totop').off("click").on("click",function(){
        $('html, body').animate({scrollTop: 0}, 600);
    });
    $(".nav>li a.open-child").off("click").on("click",function(){
        if(!$(this).parent().children("ul").hasClass("opened")) {
            $(this).parent().children("ul").addClass("opened").slideDown();
            $(this).children("i.fa").removeClass("fa-plus-square-o").addClass("fa-minus-square-o");
        } else {
            $(this).parent().children("ul").removeClass("opened").slideUp();
            $(this).children("i.fa").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
        }
    });
});
//Serach
jQuery(function($) {

  // the input field
  var $input = $("input[type='search']"),
    // clear button
    $clearBtn = $("button[data-search='clear']"),
    // prev button
    $prevBtn = $("button[data-search='prev']"),
    // next button
    $nextBtn = $("button[data-search='next']"),
    // the context where to search
    $content = $(".container"),
    // jQuery object to save <mark> elements
    $results,
    // the class that will be appended to the current
    // focused element
    currentClass = "current",
    // top offset for the jump (the search bar)
    offsetTop = ( $( window ).height() / 2 ),
    // the current index of the focused element
    currentIndex = 0;

  /**
   * Jumps to the element matching the currentIndex
   */
  function jumpTo() {
    if ($results.length) {
      var position,
        $current = $results.eq(currentIndex);
      $results.removeClass(currentClass);
      if ($current.length) {
        $current.addClass(currentClass);
        position = $current.offset().top - offsetTop;
        window.scrollTo(0, position);
      }
    }
  }

  /**
   * Searches for the entered keyword in the
   * specified context on input
   */
  $input.on("input", function() {
  	var searchVal = this.value;
    $content.unmark({
      done: function() {
        $content.mark(searchVal, {
          separateWordSearch: false,
          done: function( counter ) {
			$('.totalfound').text('Total Found: ' + counter);
            $results = $content.find("mark");
            currentIndex = 0;
            jumpTo();
          }
        });
      }
    });
  });

  /**
   * Clears the search
   */
  $clearBtn.on("click", function() {
    $content.unmark();
    $input.val("").focus();
  });

  /**
   * Next and previous search jump to
   */
  $nextBtn.add($prevBtn).on("click", searchBtns);
  function searchBtns() {
    if ($results.length) {
      currentIndex += $(this).is($prevBtn) ? -1 : 1;
      if (currentIndex < 0) {
        currentIndex = $results.length - 1;
      }
      if (currentIndex > $results.length - 1) {
        currentIndex = 0;
      }
      jumpTo();
    }
  }
  $input.keypress(function(e) {
    if(e.which == 13) {
        searchBtns();
    }
  });
});