// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let dino;
let dinoWidth = 100;
let dinoHeight = 50;

let dinoX, dinoY;
let dx, dy = 0;
let ax, ay = 0;
let gravity = 0.05;

let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  dinoX = width/2;
  dinoY = height/2;
  dino = loadImage("dinoidle.gif");
}

function draw() {
  background(255);
  image(dino, dinoX, dinoY, dinoWidth, dinoHeight);
  dinoPhysicsSetup();
  checkIfDinoInWindow();
  setupDino();
  moveDino();
}

function setupDino() {
  dino = loadImage("dinosprite.png");
  image(dino, dinoX, dinoY);
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
    ay = -0.1;
  }

  if (movingLeft) {
    dinoX -= dx;
  }

  if (movingDown) {
    dinoY += dy;
  }

  if (movingRight) {
    dinoX += dx;
  }
}

function checkIfDinoInWindow() {
  if (dinoY > windowHeight - dinoHeight) {
    movingDown = false;
  }

  if (dinoY < 0 - dinoHeight/3) {
    movingUp = false;
  }

  if (dinoX > windowWidth - dinoWidth) {
    movingRight = false;
  }

  if (dinoX < 0 - dinoWidth/5) {
    movingLeft = false;
  }
}

function dinoPhysicsSetup() {
  dy += ay;
  dinoY += dy;
  dy += gravity;
}