window.addEventListener('load', eventWindowLoaded, false);

var Debugger = {};
Debugger.log = function(message) {

  try{
    console.log(message);
  } catch (exception) {
    return;
  }
};

function eventWindowLoaded() {

  canvasApp();
};

function canvasSupport() {
    return Modernizr.canvas;
};

function canvasApp() {

  if (!canvasSupport()) {
    return;
  }

  var theCanvas = document.getElementById("canvasOne");
  var context = theCanvas.getContext("2d");

  Debugger.log("Drawing Canvas");

  function drawScreen() {

    //background
    context.fillStyle = "#ffffaa";
    context.fillRect(0, 0, 500, 300);

    //text
    context.fillStyle = "#000000";
    context.font = "20px Sans-Serif";
    context.textBaseline = "top";
    context.fillText ("Hello world!", 195, 80);

    //image
    var helloWorldImage = new Image();
    helloWorldImage.onload = function() {
      context.drawImage(helloWorldImage, 155, 110);
    };
    helloWorldImage.src = "https://2.bp.blogspot.com/-EV3Cbv848XY/U9ruxqoDcMI/AAAAAAAACog/BB3HM_wv6FU/s1600/hello.png";

    //box
    context.strokeStyle = "#000000";
    context.strokeRect(5, 5, 490, 290);

  };

  drawScreen();
};