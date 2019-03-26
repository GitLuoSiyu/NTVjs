var win = window;
var doc = win.document;
var docEl = doc.documentElement;
var tid;

function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    var height = docEl.getBoundingClientRect().height;
    if ((width / height) > (1280 / 720)) {
        var rem = height / (720 / 100);
    } else {
        var rem = width / (1280 / 100);
    }
    docEl.style.fontSize = rem + 'px';
}

// window.onload = function(){
//     clearTimeout(tid);
//     tid = setTimeout(refreshRem, 300);
// }

win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
}, false);
win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }
}, false);

refreshRem();