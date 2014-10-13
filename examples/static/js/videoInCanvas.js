window.addEventListener("load", eventWindowLoaded, false);

var videoElement;
var videoDiv;

function eventWindowLoaded() {

  videoElement = document.createElement("video");
  videoDiv = document.createElement('div');
  document.body.appendChild(videoDiv);
  videoDiv.appendChild(videoElement);
  videoDiv.setAttribute('style', 'display:none');
  var videoType = supportedVideoFormat(videoElement);

  if (videoType == "") {
    alert("no video support");
  }

  videoElement.addEventListener("canplaythrough", videoLoaded, false);
  //videoElement.setAttribute("src", "static/video/Sample." + videoType);
  videoElement.setAttribute('src', "static/video/Sample.ogv");

};

function supportedVideoFormat(video) {
  var returnExtension = "";

  if (video.canPlayType("video/ogg") == "probably" ||
            video.canPlayType("video/ogg") == "maybe") {
    returnExtension = "webm";
  } else if (video.canPlayType("video/mp4") == "probably" ||
             video.canPlayType("video/mp4") == "maybe") {

    returnExtension = "mp4";
  } else if (video.canPlayType("video/webm") == "probably" ||
             video.canPlayType("video/webm") == "maybe") {
    returnExtension = "ogg";
  }

  return returnExtension;
};

function canvasSupport () {
  return Modernizr.canvas;
};

function videoLoaded() {
  canvasApp();
};

function canvasApp() {

  if (!canvasSupport()) {
    return;
  }

  var theCanvas = document.getElementById("canvasOne");
  var context = theCanvas.getContext("2d");

  function drawScreen() {

    //Background
    context.fillStyle = "#ffffaa";
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    //Box
    context.strokeStyle = "#000000";
    context.strokeRect(5, 5, theCanvas.width-10, theCanvas.height-10);

    //Video
    context.drawImage(videoElement, 85, 30, 320, 240);

  };

  //var theCanvas = document.getElementById("canvasOne");
  //var context = theCanvas.getContext("2D");
  videoElement.play();

  function gameLoop() {
    window.setTimeout(gameLoop, 20);
    drawScreen();
  };

  gameLoop();
};