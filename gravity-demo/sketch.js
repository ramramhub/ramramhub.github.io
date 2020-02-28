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
let r = 50;


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height - r;

  dx = 0;
  dy = 0;

  ax = 0;
  ay = 0;
}

function draw() {
  background(255);

  dy += ay;
  y += dy;
  dy += gravity;

  ay = 0;

  fill(0);
  ellipse(x, y, r*2, r*2);
}

function keyPressed()  {
  if (key === "w") {
    ay = -5;
  }
}