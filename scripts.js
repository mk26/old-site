function smoothScroll(loc) {
    $('html,body').animate({
        scrollTop: $('[name=' + loc.hash.slice(1) + ']').offset().top - $('.mknav').height() - 50
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
    var loc = window.location.href.split("#")[0];
    window.location.replace(loc + this.hash);
});

window.onload = function () {
    if (window.location.hash)
        smoothScroll(window.location);
};

//Navbar metamorphosis
window.onscroll = function () {
	if (document.body.scrollTop > 5) {		
		$('.mkcontainer').css({
            'box-shadow': '2px 0px 20px 10px rgba(100, 100, 100, 0.4)'
        });
	}
	else {
		$('.mkcontainer').css({
			'box-shadow': 'none'
		});
	}
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