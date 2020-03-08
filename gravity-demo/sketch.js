// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let dx, dy;
let ax, ay;
let gravity = 0.1;
let friction = 0.1;
let degree = 0;

let movingUp, movingDown, movingLeft, movingRight = false;
let s = 25;


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

function draw() {
  background(255);
  drawObject();
  checkIfObjectInWindow();
  movementSetup();
  moveObject();
}

function moveObject()  {

  if (movingLeft && dx > -10) {
    ax = -0.5;
    degree -= 10;
  }

  if (movingDown && dy < 10) {
    ay = 0.5;
  }

  if (movingRight && dx < 10) {
    ax = 0.5;
    degree += 10;
  }
}

function keyPressed() {
  if (key === "w") {
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

  push();
  translate(x, y);
  rotate(degree);
  rect(0, 0, s*2, s*2);
  pop();
}

function movementSetup() {
  dy += ay;
  y += dy;
  dy += gravity;

  dx += ax;
  x += dx;

  if (dx >= 0) {
    dx -= friction;
  }

  if (dx <= 0) {
    dx += friction;
  }

  ay = 0;
  ax = 0;
}

function checkIfObjectInWindow() {
  if (y > windowHeight - s) {
    dy *= -0.1;
  }

  if (y < 0 + s) {
    dy *= -0.9;
  }

  if (x > windowWidth - s/2 || x < 0 + s/2) {
    dx *= -0.9;
  }
}