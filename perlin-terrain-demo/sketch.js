// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerX = 0;
let rectHeight;
let rectWidth = 0.1;
let time;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectWidth = 1;
}

function draw() {
  background(255);
  createTerrain();
  movePlayer();
}

function movePlayer() {
  if (keyIsPressed && key === "d") {
    playerX += 0.01;
  }
}

function createTerrain() {
  time = playerX;

  for (let x = 0; x <= width; x += rectWidth) {
    rectHeight = noise(time) * height;
    fill("black");
    rect(x, height - rectHeight, rectWidth, rectHeight);

    time += 0.002;
  }
}
