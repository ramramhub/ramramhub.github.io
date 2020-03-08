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

let x, y;
let dx, dy;
let ax, ay;
let gravity = 0.1;
let friction = 0.1;
let degree = 0;

let rectColourR = 0;
let rectColourB = 0;
let rectColourG = 0;

let movingUp, movingDown, movingLeft, movingRight = false;
let scalar = 1;
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

  if (movingLeft) {
    if (dx > -15) {
      ax = -0.5;
    }

    degree -= 10;
  }

  if (movingDown && dy < 10) {
    ay = 0.5;
  }

  if (movingRight) {
    if (dx < 15) {
      ax = 0.5;
    }

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
  fill(rectColourR, rectColourG, rectColourB);
  noStroke();

  push();
  translate(x, y);
  rotate(degree);
  rect(0, 0, scalar * s * 2, scalar * s * 2);
  pop();
}

function movementSetup() {
  dy += ay;
  y += dy;
  dy += gravity;

  dx += ax;
  x += dx;

  if (dx > 0) {
    dx -= friction;
  }

  if (dx < 0) {
    dx += friction;
  }

  ay = 0;
  ax = 0;
}

function checkIfObjectInWindow() {
  if (y > windowHeight - s * scalar) {
    dy *= -0.1;
    y = windowHeight - s * scalar;
  }

  if (y < 0 + s * scalar) {
    dy *= -0.9;
    y = 40 * scalar;
    randomizeRectColour();
  }

  if (x < 0 + s/2 * scalar) {
    dx *= -0.9;
    x = 20 * scalar;
    randomizeRectColour();
  }

  if (x > windowWidth - s/2 * scalar) {
    dx *= -0.9;
    x = windowWidth - 20 * scalar;
    randomizeRectColour();
  }

}

function randomizeRectColour() {
  rectColourR = random(0, 255);
  rectColourG = random(0, 255);
  rectColourB = random(0, 255);
}

function mouseWheel(scaleRect) {
  if (scaleRect.deltaY > 0 && scalar < 5) {
    scalar *= 1.1;
  }

  else if (scaleRect.deltaY < 0 && scalar > 0.05) {
    scalar *= 0.9;
  }
}