function smoothScroll(loc) {
    $('html,body').animate({
        scrollTop: $('[name=' + loc.hash.slice(1) + ']').offset().top - $('.mknav').height() - 100
    }, 500);
}

$('a[href*=#]').click(function () {
    smoothScroll(this);
});

window.onload = function () {
	if(typeof window.orientation !== 'undefined') {		
		$('.pre').css({
			'background-attachment': 'scroll',
			'background-position': '50% 0%'
		});
	}
	//Go to section if present in URL
    if (window.location.hash) 
    	smoothScroll(window.location);
    $('#top-right-logo').hide();
};

//Scroll events
window.onscroll = function () {
/*
	var brightness = (window.pageYOffset/2 > 100) ? 100 : window.pageYOffset/2;
	var level = brightness < 20 ? 20 : brightness;
	var hello = document.getElementsByClassName("pre-hello")[0];
	hello.setAttribute("style", '-webkit-filter: brightness('+level+'%)');
*/
/*
	var scaleValue = window.pageYOffset/100 < 1 ? 1 : window.pageYOffset/100;
	scaleValue = scaleValue > 4 ? 4 : scaleValue;
	$('.pre-hello').css({
		'-webkit-transform': 'scale('+scaleValue+')'
	});
*/
	//Disable parallax for Mobile devices
	if(typeof window.orientation == 'undefined') {		
		var parallax = document.querySelectorAll(".pre");
		[].slice.call(parallax).forEach(function(el,i) {
			var bgPosition = "50% " + (window.pageYOffset/-2) + "px";
			el.style.backgroundPosition = bgPosition;
		});	
	}
	else {
		$('.pre').css({
			'background-attachment': 'scroll',
			'background-position': '50% 0%'
		});
	}
	
	//Initial shadow over main container
	if (document.body.scrollTop > 0) {	
		$('.mkcontainer').css({
            'box-shadow': '2px 0px 30px 10px rgba(100, 100, 100, 0.2)'
        });
	}
	else {
		$('.mkcontainer').css({
			'box-shadow': 'none'
		});
	}

	//Navbar adjustments
	var dist = document.getElementsByClassName('mkcontainer')[0].offsetTop - 25;
	var dist2 = document.getElementsByClassName('pre-proj')[0].offsetTop + 25;
    if (document.body.scrollTop > dist || document.documentElement.scrollTop > dist) {
        $('.logo').removeClass("slideInDown");
        $('.header').css({
            'margin-top': '-20px',
            'z-index': '1000',
            'background-color': 'rgba(255, 255, 255, 0.9)',
            'box-shadow': '0px 0px 15px 10px rgba(100, 100, 100, 0.2)'
        });
        $('.logo').addClass("fadeOutUp");
    } else {
        $('.logo').removeClass("fadeOutUp");
		$('#top-right-logo').removeClass("rotateInDownRight");
        $('.header').css({
            'margin-top': '0px',
			'z-index': '0',
            'background-color': 'rgba(255, 255, 255, 0.95)',
            'box-shadow': 'none'
        });
		$('#top-right-logo').addClass("rotateOutUpRight");
    }
	if (document.body.scrollTop > dist2 || document.documentElement.scrollTop > dist2) {
		$('#top-right-logo').show().removeClass("rotateOutUpRight");
			$('.header').css({
            'margin-top': '-20px',
            'z-index': '1000',
            'background-color': 'rgba(255, 255, 120, 0.9)',
            'box-shadow': '0px 0px 15px 10px rgba(100, 100, 100, 0.2)'
        });
		$('#top-right-logo').addClass("rotateInDownRight");
	}
};

//Double click navbar to go to top
$('.mknav').dblclick(function(){
	$('html,body').animate({scrollTop: 0}, 300);
});