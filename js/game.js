var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval( function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond )
};

function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if(ballX > canvas.width) {
      ballSpeedX = -ballSpeedX;
    };
    if(ballX < 0) {
      ballSpeedX = -ballSpeedX;
    };

    if(ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    };
    if(ballY < 0) {
      ballSpeedY = -ballSpeedY;
    };
};

function drawEverything() {
  // background
  colorRect( 0, 0, canvas.width, canvas.height, 'black' );

  // left paddle
  colorRect(1, 210, 10, 100, 'white');

  // ball
  colorCircle(ballX, ballY, 10, 'white')
};

function colorRect(leftX, topX, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topX, width, height);
};

function colorCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
};
