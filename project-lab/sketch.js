// Fireworksss Project
// Ramit Kapoor
// May 12th, 2020

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  displayFirework();
}

function mousePressed() {
  createFirework();
}

function createFirework() {
  let randomR = random(0, 255);
  let randomG = random(0, 255);
  let randomB = random(0, 255);
  let randomRadius = random(2, 5);

  for (let i = 0; i < 100; i++) {
    let velocityConstant = random(-3, 3);
    let xDirection = cos(i * 3.6) * velocityConstant;
    let yDirection = sin(i * 3.6) * velocityConstant;

    xDirection += random(-0.3, 0.3);
    yDirection += random(-0.3, 0.3);

    let newFirework = new firework(mouseX, mouseY, randomRadius, xDirection, yDirection, 0.05, randomR, randomG, randomB, 255);
    fireworks.push(newFirework);
  }
}

function displayFirework() {
  for (let i = 0; i < fireworks.length; i++) {
    if (fireworks[i].delete()) {
      fireworks.splice(i, 1);
    }

    else {
      fireworks[i].display();
      fireworks[i].move();
    }
  }
}

class firework {
  constructor(x, y, radius, dx, dy, gravity, r, g, b, a) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.gravity = gravity;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.radius * 2);
  } 
  
  move() {
    this.dy += this.gravity;
    this.x += this.dx;
    this.y += this.dy;
    this.a -= 1.5;
  }

  delete() {
    return this.a < 0;
  }
}