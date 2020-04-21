// Arrayssss and State Variable Project
// Ramit Kapoor
// April 20th, 2020
//
// State variables were used to signify the direction of a player's movement (movingUp, movingDown, movingRight, movingLeft variables) and check if collisions occured between enemies, bullets, and the player
//
// Extra for Experts:
// - explored objects in more depth and used classes for smoother functionality
// - used translation for player rotation in respect to the mouse cursor
// - used some CSS/HTML to customize reset button

//defines basic variables
let playerX, playerY;
let playerDx, playerDy;
let playerAx, playerAy;
let friction = 0.15;
let dx, dy;

//defines state variables
let movingUp, movingDown, movingRight, movingLeft = false;

let playerWidth, playerLength;
let playerAngle;
let enemyType;

let enemies = [];
let bullets = [];
let score = 0;
let highScore = 0;
let enemySpawnTimer = 3000;
let resetButton;

//basic set-up
function setup() {
  createCanvas(windowWidth, windowHeight);
  window.setInterval(spawnEnemy, enemySpawnTimer);
  noStroke();

  //creates reset button after game is lost
  resetButton = createDiv('Try Again?');
  resetButton.hide();

  //more basic set-up
  playerX = width/2;
  playerY = height/2;

  playerDx = 0;
  playerDy = 0;

  playerAx = 0;
  playerAy = 0;

  playerWidth = 50;
  playerLength = 50;
  playerAngle = 0;
}

//draw-loop
function draw() {
  background(220);
  
  //displays text-boxes
  displayScoreBox();
  displayInstructions();

  movementSetup();

  displayPlayer();
  displayEnemy();
  movePlayer();

  shootBullet();
  ifPlayerHit();
}

//when mouse is pressed, player will shoot - this is one of the two possible ways to shoot in the game
function mousePressed() {
  let newBullet = new bullet(playerX, playerY);
  bullets.push(newBullet);
}

//displays player as a square
function displayPlayer() {
  push();
  translate(playerX, playerY);
  playerAngle = atan2(mouseY - playerY, mouseX - playerX);
  rotate(playerAngle);
  fill(255);
  rect(-playerLength/2, -playerWidth/2, playerLength, playerWidth);
  pop();

  //scope line for player to use when aiming
  stroke(170, 20, 20, 125);
  strokeWeight(2.5);
  line(mouseX, mouseY, playerX, playerY);
  rect(mouseX - 4, mouseY - 4, 8, 8);
  noStroke();
}

//sets up physics environment with position, velocity, acceleration, and friction
function movementSetup() {
  //position, distance, and acceleration relationships
  playerDy += playerAy; 
  playerY += playerDy;

  playerDx += playerAx;
  playerX += playerDx;

  //if player stops moving with WASD, friction will eventually slow down player to a near-stop
  if (playerDx > 0) {
    playerDx -= friction;
  }

  if (playerDy < 0) {
    playerDy += friction;
  }

  if (playerDx < 0) {
    playerDx += friction;
  }

  if (playerDy > 0) {
    playerDy -= friction;
  }

  //resets acceleration values
  playerAx = 0;
  playerAy = 0;
}

function keyPressed() {
  //player shoots when space key is pressed - this is the second alternative for shooting in the game
  if (key === " ") {
    let newBullet = new bullet(playerX, playerY);
    bullets.push(newBullet);
  }

  //when WASD keys are pressed, their respective state variables are changed to "true"
  if (key === "w") {
    movingUp = true;
  }

  if (key === "a") {
    movingLeft = true;
  }

  if (key === "s") {
    movingDown = true;
  }

  if (key === "d") {
    movingRight = true;
  }
}

//when WASD keys are released, their respective state variables are changed to "false"
function keyReleased() {
  if (key === "w") {
    movingUp = false;
  }

  if (key === "a") {
    movingLeft = false;
  }

  if (key === "s") {
    movingDown = false;
  }

  if (key === "d") {
    movingRight = false;
  }
}

//if state variables are true and velocity is under max speed, user will freely move and accelerate 
function movePlayer() {
  //moves player up
  if (movingUp && playerDy > -10) {
    playerAy = -0.5;
  }

  //moves player left
  if (movingLeft && playerDx > -15) {
    playerAx = -0.5;
  }

  //moves player right
  if (movingDown && playerDy < 10) {
    playerAy = 0.5;
  }

  //moves player down
  if (movingRight && playerDx < 15) {
    playerAx = 0.5;
  }

  //calls function that checks if user is within window dimensions
  checkIfPlayerInWindow();
}

//after enemySpawnTimer passes, enemy is spawned from the class "enemy" and added into the array "enemies"
function spawnEnemy() {
  let newEnemy = new enemy;
  enemies.push(newEnemy);
  
  //spawn timer lowered to make game more challenging over time
  if (enemySpawnTimer > 300) {
    enemySpawnTimer -= 150;
  }
}

//draws a new enemy on screen
function displayEnemy() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].display();
    enemies[i].move();
    enemies[i].checkIfEnemyInWindow();
  }
}

//shoots bullet and checks if enemy is either out of bounds or has been shot
function shootBullet() {
  for (let i = 0; i < bullets.length; i++) {
    //shoots bullet
    bullets[i].display();
    bullets[i].move();

    //if bullet is out of boundaries, it will be deleted from the bullets array
    if (bullets[i].bulletOutOfBounds()) {
      bullets.splice(i, 1);
    }

    //if enemy has been shot by player, the bullet will be deleted from the bullets array
    else if (bullets[i].ifBulletHitEnemy()) {
      bullets.splice(i, 1);
    }
  }
}

//if player collides with an enemy, game over screen will pop up
function ifPlayerHit() {
  for (let i = 0; i < enemies.length; i++) {
    let playerEnemyDistance = dist(playerX, playerY, enemies[i].x, enemies[i].y);

    if (playerEnemyDistance < playerWidth) {
      gameOver();
    }
  }
  return false;
}

//design for game over screen
function gameOver() {
  textFont('Georgia');
  textSize(55);
  textAlign(CENTER);
  fill(170,20,20);
  text("GAME OVER!!", width/2, height/2 - 30);

  //if score is a new high score, then old high score will be replaced with new high score
  if (score >= highScore) {
    highScore = score;
  }

  textSize(16);
  text("FINAL SCORE: " + score, width/2, height/2);
  text("HIGH SCORE: " + highScore, width/2, height/2 + 20);

  //prompts reset button
  showResetButton();
  noLoop();
}

//design for reset button with CSS and HTML
function showResetButton() {
  resetButton.show();
  resetButton.position(width/2 - 50, height/2 + 35);
  resetButton.size(100, 25);
  resetButton.style('text-font', 'Georgia');
  resetButton.style('text-align', 'center');
  resetButton.style('padding-top', '7px');
  resetButton.style('background-color', '#aa1414');
  resetButton.style('border-radius', '5px');
  resetButton.style('color', 'white');
  resetButton.style('cursor', 'pointer');
  resetButton.mouseOver(changeButtonBG);
  resetButton.mouseOut(changeButtonBGBack);
  resetButton.mousePressed(reset);
}

//hover feature for reset button
function changeButtonBG() {
  resetButton.style('background-color', '#8c0000');
}

//hover feature for reset button
function changeButtonBGBack() {
  resetButton.style('background-color', '#aa1414');
}

//resets all variables and data for new game
function reset() {
  resetButton.hide();

  enemies = [];
  bullets = [];
  score = 0;

  playerDx = 0;
  playerDy = 0;

  playerAx = 0;
  playerAy = 0;

  playerWidth = 50;
  playerLength = 50;
  playerAngle = 0;
  enemySpawnTimer = 3000;

  loop();
}

//checks if player is within window dimension - if player collides with wall, then it will bounce back with 0.9x the velocity it collided with
function checkIfPlayerInWindow() {
  if (playerY > windowHeight) {
    playerDy *= -0.9;
    playerY = windowHeight; 
  }

  if (playerY < 0) {
    playerDy *= -0.9;
    playerY = 0; 
  }

  if (playerX < 0) {
    playerDx *= -0.9;
    playerX = 0;
  }

  if (playerX > windowWidth) {
    playerDx *= -0.9;
    playerX = windowWidth; 
  }
}

//displays score box on top left
function displayScoreBox() {
  let scoreBoxWidth = 125;
  let scoreBoxHeight = 50;

  fill('#aa1414');
  rect(width/75 + 10, height/75 + 10, scoreBoxWidth, scoreBoxHeight, 5);

  fill("white");
  textSize(16);
  textAlign(CENTER);

  textFont('Algerian');
  textStyle(BOLD);
  text("SCORE: " + score, scoreBoxWidth/1.45, scoreBoxHeight);
}

//displays text instructions on bottom center
function displayInstructions() {
  textAlign(CENTER);
  textSize(12);
  textFont('Georgia');
  
  fill(170,20,20);
  text("WASD to move - SPACE or MOUSE CLICK to shoot - AVOID INCOMING CIRCLES!", width/2, height - 30);
}

//class for bullets for smoother functionality
class bullet {
  //properties of bullet
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = playerAngle;
    this.speed = 30;
    this.side = 15;
  }

  //displays bullet
  display() {
    fill(170, 20, 20);
    rect(this.x - this.side / 2, this.y, this.side, this.side);
  }

  //moves bullet by updating position
  move() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }

  //checks if bullet is out of window dimensions and returns boolean
  bulletOutOfBounds() {
    return (this.x - this.side > width);
  }

  //checks if a bullet collides with an enemy - if so, enemy will be deleted from array
  ifBulletHitEnemy() {
    for (let i = 0; i < enemies.length; i++) {
      let collision = collideRectCircle(this.x, this.y, this.side, this.side, enemies[i].x, enemies[i].y, enemies[i].radius);

      if (collision) {
        enemies.splice(i, 1);
        score += 5;
        return true;
      }
    }
    return false;
  }
}

//class for enemies for smoother functionality
class enemy {
  constructor() {
    //properties of enemy
    this.x = random(width);
    this.y = random(height);
    this.targetX = playerX;
    this.targetY = playerY;

    //creates a vector so enemy heads towards player's location with random jittering movements when it spawns
    this.direction = createVector(this.targetX - this.x, this.targetY - this.y);
    this.direction.normalize();
    this.dx = this.direction.x * random(1, 10);
    this.dy = this.direction.y * random(1, 10);

    this.radius = random(25, 50);
    this.color = color(random(255), random(255), random(255), random(100, 255));
  }

  //displays enemy
  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  //moves enemy by updating positon with random jittering movements for trickier aiming
  move() {
    let dx = this.direction.x * random(1, 10);
    let dy = this.direction.y * random(1, 10);

    this.x += dx;
    this.y += dy;
  }

  //checks if enemy is bound inside of the window - if it collides with a wall, it's direction vector will make it bounce back the opposite way
  checkIfEnemyInWindow() {
    if (this.y > windowHeight) {
      this.y = windowHeight;
      this.direction.y *= -1;
    }
  
    if (this.y < 0) {
      this.y = 0; 
      this.direction.y *= -1;
    }
  
    if (this.x < 0) {
      this.x = 0;
      this.direction.x *= -1;
    }
  
    if (this.x > windowWidth) {
      this.x = windowWidth; 
      this.direction.x *= -1;
    }
  }
}