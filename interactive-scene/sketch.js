// Interactive Scene
// Ramit Kapoor
// March 9th, 2020
//
// Extra for Experts:
// - added smooth and coherent physics system in project
// - added WASD controls for movement
// - demonstrated understanding in state variables to improve code efficiency
// - added scroll wheel interactivity with scene
// - demonstrated knowledge on object rotation

//defines basic variables
let x, y;
let dx, dy;
let ax, ay;
let gravity = 0.1;
let friction = 0.1;
let degree = 0;

//defines RGB colour variables
let rectColourR = 0;
let rectColourB = 0;
let rectColourG = 0;

//defines state variables, scalar value, and side length
let movingDown, movingLeft, movingRight = false;
let scalar = 1;
let rectSide = 25;

//basic set-up
function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  angleMode(DEGREES); 

  x = width/2;
  y = height/2;

  dx = 0;
  dy = 0;

  ax = 0;
  ay = 0;
}

//draw loop
function draw() {
  background(255);
  drawObject();
  checkIfObjectInWindow();
  movementSetup();
  moveObject();
}

//if state variables are true, user will smoothly move around, accelerate, and spin with WASD
function moveObject()  {
  //accelerates and spins user left
  if (movingLeft) {
    if (dx > -15) {
      ax = -0.5;
    }

    degree -= 10;
  }

  //accelerates user down
  if (movingDown && dy < 10) {
    ay = 0.5;
  }

  //accelerates and spins user right
  if (movingRight) {
    if (dx < 15) {
      ax = 0.5;
    }

    degree += 10;
  }
}

//if WASD keys are pressed, their respective state variable is changed to "true"
function keyPressed() {
  //because there is no state variable for the "w" to get flappy bird style jumping, pressing "w" will change acceleration only
  if (key === "w") {
    ay = -4;
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

//if WASD keys are released, state variables are changed to "false"
function keyReleased() {
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

//draws the user as a rectangle
function drawObject() {
  //colours user
  fill(rectColourR, rectColourG, rectColourB);
  noStroke();

  //draws and translates user
  push();
  translate(x, y);
  rotate(degree);
  rect(0, 0, scalar * rectSide * 2, scalar * rectSide * 2);
  pop();
}

//sets up physics environment
function movementSetup() {
  //position, distance, acceleration, and gravity relationships
  dy += ay; 
  y += dy;
  dy += gravity;

  dx += ax;
  x += dx;

  //applies friction on user
  if (dx > 0) {
    dx -= friction;
  }

  if (dx < 0) {
    dx += friction;
  }

  //resets x, y acceleration
  ay = 0;
  ax = 0;
}

//checks if user is within website window
function checkIfObjectInWindow() {
  if (y > windowHeight - rectSide * scalar) { //if user is on ground, bounce back with 0.1x energy
    dy *= -0.1;
    y = windowHeight - rectSide * scalar; //reposition user
  }

  if (y < 0 + rectSide * scalar) { //if user hits top of window, change colour and bounce back with 0.9x energy
    dy *= -0.9;
    y = 25 * scalar; //reposition user
    randomizeRectColour();
  }

  if (x < 0 + rectSide/2 * scalar) { //if user hits left rectSide, change colour and bounce back with 0.9x energy
    dx *= -0.9;
    x = 20 * scalar;
    randomizeRectColour();
  }

  if (x > windowWidth - rectSide/2 * scalar) { //if user hits right rectSide, change colour and bounce back with 0.9x energy
    dx *= -0.9;
    x = windowWidth - 20 * scalar; //reposition user
    randomizeRectColour();
  }

}

//assigns a random RGB value for user'rectSide rectangle colour when called
function randomizeRectColour() {
  rectColourR = random(0, 255);
  rectColourG = random(0, 255);
  rectColourB = random(0, 255);
}

//scales rectangle from 0.05x to 5x when mouse scroll used
function mouseWheel(scaleRect) {
  if (scaleRect.deltaY > 0 && scalar < 5) {
    scalar *= 1.1;
  }

  else if (scaleRect.deltaY < 0 && scalar > 0.05) {
    scalar *= 0.9;
  }
}