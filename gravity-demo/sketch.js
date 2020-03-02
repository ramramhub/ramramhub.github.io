// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let dx, dy;
let ax, ay;
let gravity = 0.01;
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
  movementSetup();
  fill(0);
  ellipse(x, y, r*2, r*2);

  if (y > windowHeight - r) {
    dy *= -0.5;
  }
}

function keyPressed()  {
  if (key === "w") {
    ay = -3;
  }

  if (key === "d") {
    ax = 3;
  }
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