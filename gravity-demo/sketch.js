// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let dx, dy;
let ax, ay;
let gravity = 0.07;

let movingUp, movingDown, movingLeft, movingRight = false;
let r = 50;


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;

  dx = 0;
  dy = 0;

  ax = 0;
  ay = 0;
}

function draw() {
  background(255);
  drawObject();
  movementSetup();
  moveObject();
  checkIfObjectInWindow();
}

function moveObject()  {

  if (movingLeft && dx > -10) {
    ax = -0.5;
  }

  if (movingDown && dy < 10) {
    ay = 0.5;
  }

  if (movingRight && dx < 10) {
    ax = 0.5;
  }
}

function keyPressed() {
  if (key === "w" && dy > -10) {
    ay = -3;
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

function drawObject() {
  fill(0);
  ellipse(x, y, r*2, r*2);
}

function movementSetup() {
  dy += ay;
  y += dy;
  dy += gravity;

  dx += ax;
  x += dx;

  ay = 0;
  ax = 0;
}

function checkIfObjectInWindow() {
  if (y > windowHeight - r || y < 0 + r) {
    dy *= -0.2;
  }

  if (x > windowWidth - r || x < 0 + r) {
    dx *= -0.9;
  }
}