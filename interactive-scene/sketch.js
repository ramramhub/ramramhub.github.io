// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let dinosaur;
let dinoWidth = 100;
let dinoHeight = 50;

let x;
let y;
let dx = 5;
let dy = 5;

let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;

  dinosaur = loadImage("dinoidle.gif");
}

function draw() {
  background(220);
  image(dinosaur, x, y, dinoWidth, dinoHeight);
  setupDino();
  moveDino();
}

function setupDino() {
  dinosaur = loadImage("dinosprite.png");
  image(dinosaur, x, y);
}

function keyPressed() {
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

function moveDino() {
  if (movingUp) {
    y -= dy;
  }

  if (movingLeft) {
    x -= dx;
  }

  if (movingDown) {
    y += dy;
  }

  if (movingRight) {
    x += dx;
  }
}
