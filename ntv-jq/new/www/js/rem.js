var win = window;
var doc = win.document;
var docEl = doc.documentElement;
var body = document.body
var tid;

function refreshRem(width = 1280, height = 720){
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
	var ratio = clientHeight / clientWidth;
	let zoom = 1;
    const normalRatio = height / width;
    if (ratio < normalRatio) {
        zoom = clientHeight / height;
	} else {
        zoom = clientWidth / width;
    }
    docEl.style.transform = "scale("+zoom+")";
    return zoom;
    // var width = docEl.getBoundingClientRect().width;
    // var height = docEl.getBoundingClientRect().height;
    // if ((width / height) > (1280 / 720)) {
    //     var rem = height / (720 / 100);
    // } else {
    //     var rem = width / (880 / 100);
    // }
    // docEl.style.fontSize = rem + 'px';
}
window.onload = function(){
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
}

win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 150);
}, false);
win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 150);
    }
}, false);

refreshRem();
