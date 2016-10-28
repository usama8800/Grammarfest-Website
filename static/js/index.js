//Override addClass
{
	var originalAddClassMethod = jQuery.fn.addClass;
	jQuery.fn.addClass = function() {
		var result = originalAddClassMethod.apply(this, arguments);
		jQuery(this).trigger('classChanged');
		return result;
	}
}

var circleWidth = 0;
$(window).on("load resize", function(e) {
	$('#social-links').hide();
	$('#home').css('height', $(this).height()); // Resize video to cover page
	$('#navbar').data('bs.affix').options.offset = {
		top: $(this).height()
			// ,bottom: $('.footer').outerHeight(true)+$(this).height()
	};
	$('.countdown-row>div').css('height', function() { //Resize countdown circles to square
		circleWidth = $(this).context.clientWidth
		return circleWidth;
	});
	$('#navbar').affix('checkPosition');
	hide_toTop_from = $(this).height() * 1.5;
	scrollTo_fromToTop = $(this).height() + 30;
});

$(window).on('load', function() {
	//Show text to start in on mobile
	if(inMobile) {
		$('#video-alt').show();
		$('#logo-video').hide();
	}
});

$(window).scroll(function() {
	if($(this).scrollTop() < scrollTo_fromToTop) {
		$('#social-links').fadeOut('fast', 'linear');
	} else {
		$('#social-links').fadeIn('fast', 'linear');
	}
});

//Scroll down when video ends
$('#logo-video')[0].onended = function() {
	if(inMobile) {
		$('#logo-video').attr('playbackRate', '0');
	}
	if($(window).scrollTop() == 0) {
		$('html, body').animate({
			scrollTop: scrollTo_fromToTop
		}, 1000);
	}
}


//Start video on touch in mobile
var playedOnMobile = false;
$(window).on('touchstart', function() {
	if(!playedOnMobile) {
		playedOnMobile = true;
		$('#video-alt').hide();
		$('#logo-video').show();
		$('#logo-video')[0].play();
	}
});

//Make navbar fixed seemlessly
$('#navbar').bind('classChanged', function() {
	if($.inArray('affix-top', $(this)[0].classList) != -1) { //If navbar is down
		$('#main').css('padding-top', '50px');
	} else { //If navbar is fixed on top
		$('#main').css('padding-top', '100px');
	}
});

//Countdown
// var endTime = (new Date().getTime()-5000) / 1000;
var endTime = new Date(2016, 8, 23, 7, 30).getTime() / 1000;
var countdownInterval = setInterval(function() {
	var nowTime = new Date().getTime() / 1000;
	var diff = endTime - nowTime;
	if(diff <= 0) {
		$('#days').text(0);
		$('#hours').text(0);
		$('#minutes').text(0);
		$('#seconds').text(0);
		drawCanvas();
		window.clearInterval(countdownInterval);
		return;
	}
	var temp = diff / (60 * 60 * 24);
	$('#days').attr('percentage', temp / 100);
	if(temp.toString().indexOf('e') != -1) temp = 0;
	var days = parseInt(Math.abs(Number(temp)));
	diff = temp - days;
	$('#hours').attr('percentage', diff);
	var hours = parseInt(Math.abs(Number(diff * 24)));
	diff *= 24 * 60;
	diff -= hours * 60;
	$('#minutes').attr('percentage', diff / 60);
	var mins = parseInt(Math.abs(Number(diff)));
	diff -= mins;
	$('#seconds').attr('percentage', diff);
	var secs = parseInt(Math.abs(Number(diff * 60)));
	$('#days').text(days);
	$('#hours').text(hours);
	$('#minutes').text(mins);
	$('#seconds').text(secs);
	drawCanvas();
}, 50);
window.setInterval(countdownInterval);
var circlesBorderWidth = 4;

function drawCanvas() {
	$('.countdown-row>div>canvas').each(function(i) {
		$(this).css('position', 'absolute');
		$(this).css('left', (-circlesBorderWidth) + 'px');
		$(this).css('top', (-circlesBorderWidth) + 'px');
		var canvas = $(this)[0];
		canvas.width = circleWidth + circlesBorderWidth * 2;
		canvas.height = circleWidth + circlesBorderWidth * 2;
		var ctx = canvas.getContext('2d');
		ctx.lineWidth = circlesBorderWidth + 1;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = '#60686f'
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// ctx.beginPath();
		// ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - circlesBorderWidth, 0, 2 * Math.PI);
		// ctx.stroke();
		var percentage = 0;
		if(i == 0) {
			percentage = $('#days').attr('percentage');
			ctx.strokeStyle = '#ffcc66';
		}
		if(i == 1) {
			percentage = $('#hours').attr('percentage');
			ctx.strokeStyle = '#99ccff'
		}
		if(i == 2) {
			percentage = $('#minutes').attr('percentage');
			ctx.strokeStyle = '#bbffbb'
		}
		if(i == 3) {
			percentage = $('#seconds').attr('percentage');
			ctx.strokeStyle = '#ff9999';
			var timeToOpaque = 0.3;
			var timeToTransparent = 0.5;
			if(percentage > (60 - timeToOpaque) / 60 && percentage != 1) ctx.globalAlpha = (1 - percentage) / (timeToOpaque / 60);
			if(percentage < timeToTransparent / 60 && percentage != 0) ctx.globalAlpha = (percentage) / (timeToTransparent / 60);
		}
		// ctx.strokeStyle = "#fff"s
		ctx.lineWidth = circlesBorderWidth;
		ctx.beginPath();
		ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - circlesBorderWidth, -.5 * Math.PI, (-.5 + 2 * percentage) * Math.PI, false);
		// ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - circlesBorderWidth, -.5 * Math.PI, (-.5 + 2 * percentage) * Math.PI, true);
		ctx.stroke();
	});
}