var win = window;
// var doc = win.document;
// var docEl = doc.documentElement;
var body = document.body;
// var bg = document.querySelector("#game");
// var select = document.querySelector("#shouzhi");
var tid;
function refreshRem(width = 1280, height = 720) {
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
  // select.style.transform = "scale(" + zoom + ")";
  // bg.style.transform = "scale(" + zoom + ")";
  body.style.transform = "scale(" + zoom + ")";
  return zoom;
}
window.onload = function() {
  clearTimeout(tid);
  tid = setTimeout(refreshRem, 300);
};
win.addEventListener(
  "resize",
  function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 150);
  },
  false
);
win.addEventListener(
  "pageshow",
  function(e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 150);
    }
  },
  false
);
refreshRem();
