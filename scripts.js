function smoothScroll(loc) {
    $('html,body').animate({
        scrollTop: $('[name=' + loc.hash.slice(1) + ']').offset().top - $('.mknav').height() - 145
    }, 500);
}

var _ = {
	get : function (name) {
	if(name[0] == ".")
		return document.getElementsByClassName(name.slice(1))[0];
	else if(name[0] == "#")
		return document.getElementById(name.slice(1));
	}
}

$('a[href*=#]').click(function () {
    smoothScroll(this);
    //Replace URL with hash
    //var loc = window.location.href.split("#")[0];
    //window.location.replace(loc + this.hash);
});

window.onload = function () {
    if (window.location.hash) 
    	smoothScroll(window.location);
};

window.onscroll = function () {
	var brightness = (window.pageYOffset/2 > 100) ? 100 : window.pageYOffset/2;
	var level = brightness < 20 ? 20 : brightness;
	$('.pre-hello').css({'-webkit-filter': 'brightness('+level+'%)'});
	//Disable parallax for Mobile devices
	if($('.pre').css('font-size')=="100px") {		
		var parallax = document.querySelectorAll(".pre");
		[].slice.call(parallax).forEach(function(el,i) {
			var bgPosition = "50% " + (window.pageYOffset/8 * 0.2) + "px";
			el.style.backgroundPosition = bgPosition;
		});	
	}
	else {
		$('.pre').css({'background-position': '0% 0%'});
	}
	
	//Initial shadow over main container
	if (document.body.scrollTop > 0) {		
		$('.mkcontainer').css({
            'box-shadow': '2px 0px 30px 10px rgba(100, 100, 100, 0.5)'
        });
	}
	else {
		$('.mkcontainer').css({
			'box-shadow': 'none'
		});
	}
	
	//Make navbar smaller
    if (document.body.scrollTop > document.getElementsByClassName('mkcontainer')[0].offsetTop - 25) {
        $('.logo').removeClass("slideInDown");
        $('.header').css({
            'margin-top': '-20px',
            'z-index': '1000',
            'background-color': 'rgba(255, 255, 120, 0.95)',
            'box-shadow': '0px 0px 15px 10px rgba(100, 100, 100, 0.3)'
        });
        $('.logo').addClass("fadeOutUp");

    } else {
        $('.logo').removeClass("fadeOutUp");
        $('.header').css({
            'margin-top': '0px',
			'z-index': '0',
            'background-color': 'rgba(255, 255, 255, 0.95)',
            'box-shadow': 'none'
        });
    }
};

//Double click navbar to go to top
$('.mknav').dblclick(function(){
	$('html,body').animate({scrollTop: 0}, 300);
});