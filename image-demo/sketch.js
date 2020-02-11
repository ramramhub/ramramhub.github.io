// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let dinosaur;

function preload() {
  dinosaur = loadImage("assets/spinosaurus_dinosaur.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(dinosaur, mouseX, mouseY, 500, 100);
}
