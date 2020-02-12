// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let dinosaur;
let w = 250;
let h = 100;
let d = 20;

function preload() {
  dinosaur = loadImage("assets/spinosaurus_dinosaur.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
  if (event.deltaY < 0) {
    h = h + h * 0.1;
    w = w + w * 0.1;
  }

  else {
    h = h - h * 0.1;
    w = w - w * 0.1;
  }
}

function draw() {
  background(220);
  image(dinosaur, mouseX - w/2, mouseY - h/2, w, h);
}

