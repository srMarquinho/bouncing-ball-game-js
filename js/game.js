var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;

var paddle1Y = 250;
var paddle2Y = 250;
var paddleHeight = 100;
var paddleThickness = 10;

var showingWinScreen = false;

var player1Score = 0;
var player2Score = 0;
var winnigScore = 3;

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

  canvas.addEventListener('mousedown', handleMouseClick);
};

function handleMouseClick(evt) {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
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

function ballReset() {
  if (player1Score >= winnigScore || player2Score >= winnigScore) {
    showingWinScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {
  var paddle2YCenter = paddle2Y + (paddleHeight / 2);
  if (paddle2Y < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}

function moveEverything() {
  if (showingWinScreen) {
    return;
  }

  computerMovement();
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y &&
      ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;

      var delta1Y = ballY - (paddle1Y + paddleHeight / 2);
      ballSpeedY = delta1Y * 0.35;
    } else {
      player2Score++; // must be before ballReset()
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y &&
      ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;

      var delta2Y = ballY - (paddle2Y + paddleHeight / 2);
      ballSpeedY = delta2Y * 0.35;
    } else {
      ballReset();
      player1Score++; // must be before ballReset()
    }
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

  if (showingWinScreen) {
    canvasContext.fillStyle = 'white';

    if (player1Score >= winnigScore) {
      canvasContext.fillText('Left player won!', 350, 200);
    } else if (player2Score >= winnigScore) {
      canvasContext.fillText('Right player won!', 350, 200);
    }

    canvasContext.fillText('Click to continue', 350, 500);
    return;
  }

  drawNet();

  // left paddle (player)
  colorRect(0, paddle1Y, paddleThickness, paddleHeight, 'white');

  // right paddle (computer)
  colorRect(canvas.width - paddleThickness, paddle2Y, paddleThickness, paddleHeight, 'white');

  // ball
  colorCircle(ballX, ballY, 10, 'white');

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);

}

function drawNet() {
  for (var i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
  }
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
