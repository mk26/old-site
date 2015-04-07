$(document).ready(function () {
    $('#top-right-logo').hide();
    $('[data-toggle="tooltip"]').tooltip({
        container: "body"
    });
});

window.onload = function () {
    if (typeof window.orientation !== 'undefined') {
        $('.pre').css({
            'background-attachment': 'scroll',
            'background-position': '50% 0%'
        });
    }
}

//Scroll events
window.onscroll = function () {
    //Disable parallax for Mobile devices
    if (typeof window.orientation == 'undefined') {
        var parallax = document.querySelectorAll(".pre");
  [].slice.call(parallax).forEach(function (el, i) {
            var bgPosition = "50% " + (window.pageYOffset / -2) + "px";
            el.style.backgroundPosition = bgPosition;
        });
    } else {
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
    } else {
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

//Smooth scroll to section
$('.navlink, .down-arrow').click(function() {
	$('html,body').animate({
	   scrollTop: $("#"+this.dataset.section).offset().top - $('.header').height() + 12
    }, 500);
});

//Double click navbar to go to top
$('.mknav').dblclick(function () {
    $('html,body').animate({
        scrollTop: 0
    }, 300);
});

/* Photoswipe */

var initPhotoSwipeFromDOM = function (gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        if (!params.hasOwnProperty('pid')) {
            return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
    };

    var openPhotoSwipe = function (index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            index: index,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function (index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                };
            }

        };

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
        gallery.options.bgOpacity = 0.85;
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid > 0 && hashData.gid > 0) {
        openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true);
    }
};

// execute above function
initPhotoSwipeFromDOM('.gallery');