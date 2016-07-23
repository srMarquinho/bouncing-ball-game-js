var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;

var paddle1Y = 250;
var paddleHeight = 100;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = cauculateMousePos(evt);
      paddle1Y = mousePos.y - (paddleHeight / 2);
    });
};

function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function cauculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y &&
      ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  // background
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  // left paddle
  colorRect(0, paddle1Y, 10, paddleHeight, 'white');

  // ball
  colorCircle(ballX, ballY, 10, 'white');
}

function colorRect(leftX, topX, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topX, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
