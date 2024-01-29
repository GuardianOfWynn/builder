/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 * 
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    console.log(window.location.href)
    if(!window.location.href.includes('ecoengine')) {
        return
    }
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    if(!window.location.href.includes('ecoengine')) {
        return
    }
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function(i, el) {
        if(!window.location.href.includes('ecoengine')) {
            
            return
        }
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }
        if(!window.location.href.includes('ecoengine')) {
            return
        }
        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            if(!window.location.href.includes('ecoengine')) {
                console.log("blocked")
                return
            }
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){    
                if(!window.location.href.includes('ecoengine')) {
                    return
                }
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        if(!window.location.href.includes('ecoengine')) {
                            return
                        }
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;
                        }
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function() {
                        if(!window.location.href.includes('ecoengine')) {
                            console.log("blocked")
                            return
                        }
                        pushed = 0;}, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        if(!window.location.href.includes('ecoengine')) {
                            console.log("blocked")
                            return
                        }
                        if (pushed) {
                            (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }

    if(!window.location.href.includes('ecoengine')) {
        return
    }
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));