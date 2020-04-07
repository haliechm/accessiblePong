// Constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 550;
const KEY_UP = 38;
const KEY_DOWN = 40;
const PADDLE_WIDTH = 7;
const PADDLE_HEIGHT = GAME_HEIGHT/3;
const BACKGROUND_COLOUR = "#000000";
const PLAYER_COLOUR = "#FFFFFF";
const COMPUTER_COLOUR = "#FF0000"
const BALL_COLOUR = "#FFFFFF";
const SCORE_GOAL = 5;


// Get the middle y-value to draw the paddle using the relationship between
// the height of the canvas and the height of the paddle
const MIDDLE_Y = (GAME_HEIGHT-PADDLE_HEIGHT)/2;
const TOP_Y = 0;
const BOT_Y = GAME_HEIGHT;

/* Entities in the game */
var player = new Player();
var computer = new Computer();
var ball = new Ball(GAME_WIDTH/2, GAME_HEIGHT/2 + getRandomInt(40, 150));
var playerScore = 0;
var computerScore = 0;

var top = false;
var mid = false;
var bot = true;
var noChoiceMadeYet = true;
var rightAfter = true;

var hitAudio;




function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function togglePosition() {
     document.getElementById("bottom").removeAttribute("style");
    document.getElementById("top").setAttribute("style", "background: palegreen;");
    

    
    if (player.paddle.y >= 366) {
        player.paddle.move(0, -(GAME_HEIGHT))
    } else {
        player.paddle.move(0, GAME_HEIGHT/3);
    }
    
}

function choosePosition() {
    document.getElementById("top").removeAttribute("style");
    document.getElementById("bottom").setAttribute("style", "background: palegreen;");
    noChoiceMadeYet = false;
    
}




function middleLine(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

middleLine.prototype.render = function(startx, starty, endx, endy) {
    
     context.beginPath();
  context.setLineDash([10,10]);
  context.moveTo(startx, starty);
  context.lineTo(endx, endy);
  context.stroke();
 
    
    
    
//    context.setLineDash([10,10]);
//  context.fillStyle = colour;
//  context.fillRect(this.x, this.y, this.width, this.height);
  
}



/* PADDLE */
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function(colour) {
  context.fillStyle = colour;
  context.strokeStyle = "#FFFFFF";
  context.fillRect(this.x, this.y, this.width, this.height);
}

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if (this.y < 0) {
    // all the way to the bottom
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > GAME_HEIGHT) {
    // all the way to the top
    this.y = GAME_HEIGHT - this.height;
    this.y_speed = 0;
  }
}

/* BALL */
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 6;
  this.y_speed = 0.2;
  this.radius =6;
}

Ball.prototype.render = function(colour) {
  context.beginPath();
context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
  //context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = colour;
  context.fill();
}

Ball.prototype.update = function(paddle1, paddle2) {
    
    
    // make the choice here:
    console.log("no choice: " + noChoiceMadeYet);
    
    if (this.x_speed == -6 && this.x >= GAME_HEIGHT) {
        noChoiceMadeYet = true;
    }
    
    if (this.x < GAME_WIDTH / 2 - 190 && noChoiceMadeYet) {
        this.x_speed = 0;
        rightAfter = true;
    } else {
    
        if (rightAfter) {
            this.x += -6;
            this.x_speed = -6;
            rightAfter = false;
        } else {
            this.x += this.x_speed;
        }
        this.y += this.y_speed;

        var top_x = this.x - this.radius;
        var top_y = this.y - this.radius;

        var bottom_x = this.x + this.radius;
        var bottom_y = this.y + this.radius;

        if (this.y - 5 < 0) { // hitting the top wall
            this.y = 5;
            this.y_speed = -this.y_speed;
        } else if (this.y + 5 > GAME_HEIGHT) { // hitting the bottom wall
            this.y = GAME_HEIGHT-5;
            this.y_speed = -this.y_speed;
        }
    }

  // A point was scored, reset the ball
  if (this.x < 0 || this.x > GAME_WIDTH) {
    if (this.x < 0) {
        computerScore += 1;
        document.getElementById("computerScore").innerHTML = computerScore;
    }
    
    if (this.x > GAME_WIDTH) {
        playerScore += 1;
        document.getElementById("playerScore").innerHTML = playerScore;
    }
      
    if (playerScore >= SCORE_GOAL) {
        alert("You Won!");
        console.log("you won");
        location.reload();
    }
      
    if (computerScore >= SCORE_GOAL) {
        alert("Computer Won.");
        console.log("comp won");
        location.reload();
    }
    this.x_speed = 6;
    this.y_speed = 0.2;
    this.x = GAME_WIDTH/2;
    this.y = GAME_HEIGHT/2 + getRandomInt(40, 150);
    paddle1.y = MIDDLE_Y;
    paddle2.y = MIDDLE_Y;
  }

  if (top_x < 300) {
    if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y
      && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      hitAudio.play();
      this.x_speed = 6;
           console.log("______88_" + this.y_speed);
        console.log("ccccccccc" + paddle1.y_speed);
        
        var rand = Math.random();
        
        if (this.y_speed <= -7.5) {
            this.y_speed = -5;
        }
        
        if (this.y_speed >= 7.5) {
            this.y_speed = 5;
        }
        
        console.log("88888______" + this.y_speed);
        
        console.log("RAND: " + rand);
     
            this.y_speed += (rand / 2);
        
           console.log("!!______88_" + this.y_speed);
      this.x += this.x_speed;
    }
  } else {
    if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y
      && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      hitAudio.play();
      this.x_speed = -6;
         console.log("_______" + this.y_speed);
            this.y_speed += (paddle2.y_speed / 2);
        
         console.log("!________" + this.y_speed);
      this.x += this.x_speed;
    }
  }
};

/* PLAYER */
function Player() {
  this.paddle = new Paddle(10, MIDDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

Player.prototype.update = function() {
  for (var key in keysDown) {
    var value = Number(key);

    if (value == KEY_UP) {
      this.paddle.move(0, -4);
    } else if (value == KEY_DOWN) {
      this.paddle.move(0, 4);
    } else {
      this.paddle.move(0, 0);
    }
  }
}

Player.prototype.render = function(colour) {
  this.paddle.render(colour);
}

/* COMPUTER */
function Computer() {
  this.paddle = new Paddle(GAME_WIDTH-20, MIDDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

Computer.prototype.update = function(ball) {
  var y_pos = ball.y;
//    console.log("paddle y: " + this.paddle.y);
////    console.log("other: " + this.paddle.height / 2);
//    console.log("y position of ball: " + y_pos);
  var diff = -( (this.paddle.y + (this.paddle.height / 2) ) - y_pos);
//    console.log("diff: " + diff);
  if (diff <= 0) { // max speed left
//      console.log("here!!");
    diff = -4;
  } else if (diff > 0) { // max speed right
//      console.log("_________");
    diff = 4;
  }

  this.paddle.move(0, diff);

  if (this.paddle.y < 0) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > GAME_HEIGHT) {
    this.paddle.y = GAME_HEIGHT - this.paddle.height;
  }
}

Computer.prototype.render = function(colour) {
  this.paddle.render(colour);
}

// Tell the browser we wish to perform animation
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

// Set up a 2D canvas
var canvas = document.createElement('canvas');
//canvas.width= $(window).width();
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
var context = canvas.getContext('2d');
 

// When the page loads, attach the canvas to the screen
window.onload = function() {
  //document.body.appendChild(canvas);
  document.getElementById("gameCanvas").appendChild(canvas);
  animate(step);
    
     document.getElementById("top").addEventListener("click", togglePosition);
    document.getElementById("bottom").addEventListener("click", choosePosition);
  
  hitAudio = new Audio('hit.mp3');
    hitAudio.volume = .6;
};

var step = function() {
  update();       // Update all our objects
  render();       // Render those objects
  animate(step);  // Use requestAnimationFrame to call step()
};

var update = function() {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
document.getElementById("computerScore").innerHTML = computerScore;
 document.getElementById("playerScore").innerHTML = playerScore;
};

var render = function() {
  context.fillStyle = BACKGROUND_COLOUR;
  context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  player.render(PLAYER_COLOUR);
  computer.render(COMPUTER_COLOUR);
  ball.render(BALL_COLOUR);
    
   var x = new middleLine(GAME_WIDTH/2, 0, 1, GAME_HEIGHT);
   x.render(GAME_WIDTH/2, 0, GAME_WIDTH/2, GAME_HEIGHT);
    
//    var topLine = new middleLine(GAME_WIDTH/2, 0, 1, GAME_WIDTH);
//    topLine.render(0, 0, GAME_WIDTH, 0);
//    
//     var bottomLine = new middleLine(GAME_WIDTH/2, 0, 1, GAME_WIDTH);
//    bottomLine.render(0, GAME_HEIGHT, GAME_WIDTH, GAME_HEIGHT);
//    
//        var leftLine = new middleLine(GAME_WIDTH/2, 0, 1, GAME_WIDTH);
//    leftLine.render(0, 0, 0, GAME_HEIGHT);
//    
//    
//    var rightLine = new middleLine(GAME_WIDTH/2, 0, 1, GAME_WIDTH);
//    rightLine.render(GAME_WIDTH, 0, GAME_WIDTH, GAME_HEIGHT);
}

/* CONTROLS */
var keysDown = {}; // Keep track of which key is pressed




document.addEventListener('keydown', logKey);

function logKey(e) {
    
   
        
    // stops anything from happen when holding down a key
    if (e.repeat) {
        return;
    }
    
    // enter key
     if (e.keyCode == 13) {
         choosePosition();
    }
     
    // space bar
    if (e.keyCode == 32) {
        togglePosition();
    }
    
     // right arrow
//    if (e.keyCode == 39) {
//       highlightNextArrow();
//    }
//    
//    // left arrow
//    if (e.keyCode == 37) {
//        document.getElementById("right").removeAttribute("style");
//        document.getElementById("left").setAttribute("style", "background: 	#FFC0CB;");
//        highlightPreviousArrow();
//        
//    }
//    
//    // down arrow
//    if (e.keyCode == 40) {
//        document.getElementById("left").removeAttribute("style");
//        document.getElementById("right").setAttribute("style", "background: 	#FFC0CB;"); 
//        chooseArrow();
//
//    }
    
    
    
}



window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
    delete keysDown[38];
    delete keysDown[40];
})
