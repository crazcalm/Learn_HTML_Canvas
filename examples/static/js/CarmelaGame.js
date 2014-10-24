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
  videoElement.setAttribute('src', "static/video/Sample2.ogv");

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
    context.fillStyle = "#303030";
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    //Box
    context.strokeStyle = "#FFFFFF";
    context.strokeRect(5, 5, theCanvas.width-10, theCanvas.height-10);

    for (var c= 0; c < cols; c++) {
      for (var r=0; r < rows; r++) {

        var tempPiece = board[c][r];
        var imageX = tempPiece.finalCol * partWidth;
        var imageY = tempPiece.finalRow * partHeight;
        var placeX = c * partWidth + xPad + startXOffset;
        var placeY = r * partHeight + yPad + startYOffset;

        //context.drawIamge(videoElement, imageX, imageY, partWidth, partHeight);
        context.drawImage(videoElement, imageX, imageY, partWidth, partHeight,
          placeX, placeY, partWidth, partHeight);

        //debugging
        //console.log("Debugging drawImage");
        //console.log(videoElement, imageX, imageY, partWidth, partHeight, placeX, placeY);

        if (tempPiece.selected) {
          context.strokeRect(placeX, placeY, partWidth, partHeight);
        }
      }
    }
  };

    function randomizeBoard(board) {

      var newBoard = new Array();
      var cols = board.length;
      var rows = board[0].length;

      for (var i = 0; i < cols; i++) {

        newBoard[i] = new Array();

        for (var j=0; j < rows; j++) {
          var found = false;
          var rndCol = 0;
          var rndRow = 0;

          while(!found) {
            var rndCol = Math.floor(Math.random() * cols);
            var rndRow = Math.floor(Math.random() * rows);

            if (board[rndCol][rndRow] != found) {
              found = true;
            }
          }

          newBoard[i][j] = board[rndCol][rndRow];
          board[rndCol][rndRow] = false;

        }
      }

      //debugging
      //console.log(newBoard);
      return newBoard;
    }

    function eventMouseUp(event) {

      var mouseX;
      var mouseY;
      var placeX;
      var placeY;
      var x;
      var y;

      if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
      } else {
        x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;

        y = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
      }

      x -= theCanvas.offsetLeft;
      y -= theCanvas.offsetTop;

      mouseX = x;
      mouseY = y;

      //debugging
      //console.log("mouseX " + x + ", mouseY: " + y);

      var selectedList = new Array();

      for (var c=0; c < cols; c++) {
        for (var r=0; r < rows; r++) {

          pieceX = c * partWidth + c * xPad + startXOffset;
          pieceY = r * partHeight + r * yPad + startYOffset;

          if ((mouseY >= pieceY) && (mouseY <= pieceY + partHeight) &&
            (mouseX >= pieceX) && (mouseX <= pieceX + partWidth)) {

            if (board[c][r].selected) {

              board[c][r].selected = false;
            } else {

              board[c][r].selected = true;
            }
          }

          if (board[c][r].selected) {
            selectedList.push({col:c, row:r});
          }
        }
      }

      if (selectedList.length == 2) {
        var selected1 = selectedList[0];
        var selected2 = selectedList[1];
        var tempPiece = board[selected1.col][selected1.row];

        board[selected1.col][selected1.row] = board[selected2.col][selected2.row];
        board[selected2.col][selected2.row] = tempPiece;
        board[selected1.col][selected1.row].selected = false;
        board[selected2.col][selected2.row].selected = false;
      }
    }

  //var theCanvas =  theCanvas || document.getElementById("canvasOne");
  //var context = context || theCanvas.getContext("2D");
  videoElement.play();

  //Puzzle Settings

  var rows = 4;
  var cols = 4;
  var xPad = 10;
  var yPad = 10;
  var startXOffset = 10;
  var startYOffset = 10;
  var partWidth = videoElement.width/cols;
  var partHeight = videoElement.height/rows;
  var board = new Array();

  //320x240
  partWidth = 80;
  partHeight = 60;

  //Initialize Board

  for (var i=0; i < cols; i++) {
    board[i] = new Array();
    for (var j=0; j < rows; j++) {
      board[i][j] = {finalCol:i, finalRow:j, selected:false};
    }
  }

  board = randomizeBoard(board);

  theCanvas.addEventListener('mouseup', eventMouseUp, false);

  function gameLoop() {
    window.setTimeout(gameLoop, 20);
    drawScreen();

    //debugging
    //console.log("gameLoop");
  };

  gameLoop();
};