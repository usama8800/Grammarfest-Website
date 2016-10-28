var hide_toTop_from = 100;
var scrollTo_fromToTop = 0;
var inMobile = 0;

$(window).on("load resize", function() {
	setNavbarOffset();
	hide_toTop_from = $(this).height() * .5;
	inMobile = $(".navbar-toggle").css('display') != 'none';
	$('#social-links').css('left', $(this).width() - (32 + parseInt($('.social-link>img').css('margin-left'))));
});

$(window).on('load', function() {
	if(inMobile) {
		$(".team-info").bind("click", function() {
			var thisIsHovered = $(this).hasClass('team-hover');
			$(".team-info.team-hover").next().next().removeClass('team-hover');
			$(".team-info.team-hover").removeClass('team-hover');
			if(thisIsHovered) {
				$(this).children().fadeOut(500);
				$(this).removeClass('team-hover');
				$(this).next().next().removeClass('team-hover');
			} else {
				$(this).children().fadeIn(0);
				$(this).addClass('team-hover');
				$(this).next().next().addClass('team-hover');
				$(this).children().show();
			}
		})
	}
});

$(window).scroll(function() {
	if($(this).scrollTop() < hide_toTop_from) {
		$('#to-top').fadeOut('fast', 'linear');
	} else {
		$('#to-top').fadeIn('fast', 'linear').css("display", "flex");
	}
});

//Scroll to top when clicked
var scrolling = false;
$('#to-top').click(function() {
	if(!scrolling) {
		scrolling = true;
		$('html, body').animate({
			scrollTop: scrollTo_fromToTop - (($.inArray('affix-top', $('#navbar')[0].classList) != -1) ? 50 : 0)
		}, 1000, function() {
			scrolling = false;
		});
	}
});

function setNavbarOffset() {
	$('#navbar').data('bs.affix').options.offset = {
		top: 0
	};
}
