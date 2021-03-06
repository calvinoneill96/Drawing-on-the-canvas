//Setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// setup ball size
var ballRadius = 5;
// setup paddle height
var paddleHeight = 10;
//Setup paddle width
var paddleWidth = 70;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var dx = 3
var dy = -3

// Add lives to the game
var Lives = 3

//Counting the score
var score = 0;

//Setup some bricks
var brickRowCount = 4;
var brickColumnCount = 7;
var brickWidth = 50;
var brickHeight = 10;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//Game sounds
var WINNNING_SOUND = new Audio('sounds/woohoo.wav');
var SCORE_SOUND = new Audio('sounds/success.wav');
var GAMEOVER_SOUND = new Audio('sounds/gameover.wav');

//Hold the bricks in a two-dimensional array - think of it as rows and columns
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1};
	}
}

//Set the starting poinr
var x = canvas.width/2;
var y = canvas.height-30;

//Draw the ball 
function draw() {
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}
//Draw the ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "Red";
	ctx.fill();
	ctx.closePath();
}
//Draw the paddle
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

//This function draws the bricks
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
		if(bricks[c][r].status == 1) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth,brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath
			}
		
		}
	}
}



function draw() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawScore();
	
	//Draw lives
	drawLives();
	
	//Draw the bricks
	drawBricks();
	
	// Activate collision detection
	collisionDetection();
	
	x += dx;
	y += dy;

	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height-ballRadius) 
			//check if the ball is hitting the Paddle
			if(x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
			}
			else {
				Lives --;
				if(!Lives) {
				
				//Add sound when games over
				GAMEOVER_SOUND.play();
				alert("GAME OVER");
				document.location.reload();
	}
	else {
		x = canvas.width/2;
		y = canvas.height-30;
		dx = 3;
		dy = -3;
		paddleX = (canvas.width-paddleWidth)/2;
	}
}
	
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 10;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 10;
	}

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

//Add sound to mouse
function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX < paddleWidth/2;
	}
}

// Impletment collision detection
function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
				dy = -dy;
				b.status = 0;
				score+=10;
				SCORE_SOUND.play();
				if(score == brickRowCount*brickColumnCount) {
					//Add sound when you win the game
					WINNNING_SOUND.play();
					alert("YOU WIN, CONGRATULATIONS!");
					document.location.reload();
				}
				}
			}
		}
	}
}
//Draw the score
function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score: "  + score;
}
//Draw lives
function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives:" + Lives , canvas.width-65, 20);
	document.getElementById("gamelives").innerHTML = "Lives: " + Lives;
	}

setInterval(draw, 10);














	