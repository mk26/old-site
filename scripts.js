function smoothScroll(loc){
	$('html,body').animate({
      scrollTop: $('[name=' + loc.hash.slice(1) +']').offset().top - $('.mknav').height() - 75
    }, 500);
}

$('a[href*=#]').click(function() {
	smoothScroll(this);
	//Replace URL with hash
    var loc = window.location.href.split("#")[0];
	window.location.replace(loc+this.hash);
});

$(window).load(function(){
	if(window.location.hash)
		smoothScroll(window.location);
});

//Navbar metamorphosis
$(window).scroll(function() {
	if ($(document).scrollTop() > $(".mkcontainer").offset().top) {
		$('.logo').removeClass("slideInDown");
		$('.header').css({
		'margin-top':'-20px',
		'background-color' : 'rgba(255, 255, 120, 0.95)', 
		'box-shadow' : '0px 0px 15px 4px rgba(100, 100, 100, 0.1)'
	});
		$('.logo').addClass("fadeOutUp");

	} else {
	$('.logo').removeClass("fadeOutUp");
	$('.header').css({
	'margin-top':'0px',
		'background-color' : 'rgba(255, 255, 255, 0.95)', 
		'box-shadow' : 'none'
	});
	}
});