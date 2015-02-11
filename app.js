function smoothScroll(loc){
	$('html,body').animate({
      scrollTop: $('[name=' + loc.hash.slice(1) +']').offset().top - $('.mknav').height() - 45
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