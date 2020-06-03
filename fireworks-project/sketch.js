// Fireworksss Project
// Ramit Kapoor
// May 12th, 2020

// Extra for Experts:
// - added gravitational constants so fireworks behave realistically
// - added unique bird movement
// - randomized multiple variables for more variation

//defines arrays
let fireworks = [];
let birds = [];

//basic set-up
function setup() {
  createCanvas(windowWidth, windowHeight);

  //sets interval for when birds spawn on screen
  window.setInterval(createBird, 2000);
  angleMode(DEGREES);
}

//draw-loop
function draw() {
  background(0);
  displayFirework();
  displayBird();
  birdFireworkCollision();
}

//when mouse is pressed, a firework will be created and pushed into the fireworks array
function mousePressed() {
  createFirework();
}

//function that creates firework when mouse is pressed
function createFirework() {
  //random RGB and radius values so fireworks are a different colour every time mouse is pressed
  let randomR = random(0, 255);
  let randomG = random(0, 255);
  let randomB = random(0, 255);
  let randomRadius = random(2, 5);

  //generates 100 single fireworks each with a different direction
  for (let i = 0; i < 100; i++) {
    let velocityConstant = random(-3, 3);
    let xDirection = cos(i * 3.6) * velocityConstant;
    let yDirection = sin(i * 3.6) * velocityConstant;

    //adds variation to direction so the firework circle isn't perfect
    xDirection += random(-0.2, 0.2);
    yDirection += random(-0.2, 0.2);

    let newFirework = new firework(mouseX, mouseY, randomRadius, xDirection, yDirection, 0.07, randomR, randomG, randomB, 255);
    fireworks.push(newFirework);
  }
}

//displays fireworks
function displayFirework() {
  //if firework transparancy is 0, firework will be deleted from array
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

//creates a new bird when its spawn interval passes
function createBird() {
  let newBird = new bird(random(windowHeight));
  birds.push(newBird);
}

//displays birds
function displayBird() {
  //if bird is outside window screen, it will be removed from the birds array
  for (let i = 0; i < birds.length; i++) {
    if (birds[i].isAlive()) {
      birds.splice(i, 1);
    }

    else {
      birds[i].display();
      birds[i].move();
    }
  }
}

//detects if a collision occurs between a bird and a set of fireworks
function birdFireworkCollision() {
  for (let i = 0; i < fireworks.length; i++) {
    for (let j = 0; j < birds.length; j++) {
      fireworks[i].checkCollision(birds[j]);
    }
  }
}

//defines firework class 
class firework {
  //defines basic variables
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

  //displays each individual firework
  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.radius * 2);
  } 
  
  //movement set-up for each firework
  move() {
    this.dy += this.gravity;
    this.x += this.dx;
    this.y += this.dy;
    this.a -= 1.5;
  }

  //returns true if a firework's transparency reaches 0 where it'll then be deleted
  delete() {
    return this.a < 0;
  }

  //checks for a collision between a bird and fireworks - if true, the bird will then move in the opposite direction and change colours
  checkCollision(bird) {
    let collision = collideRectCircle(bird.x, bird.y, bird.length, bird.width, this.x, this.y, this.radius);

    if (collision) {
      bird.color = color(random(255), random(255), random(255));
      bird.dx *= -1;
    }
  }
  
}

//defines bird class
class bird {
  //defines basic variables
  constructor(y) {
    this.y = y;
    this.x = 0;
    this.theta = 0;
    this.amplitude = 2;
    this.dx = random(3, 7);

    this.color = color(255, 255, 255);

    this.length = random(15, 27);
    this.width = random(9, 15);
  }

  //displays bird
  display() {
    fill(this.color);
    rect(this.x, this.y, this.length, this.width);
  }

  //moves bird along a sin wave path
  move() {
    this.theta += 3;
    this.x += this.dx;
    this.y += sin(this.theta) * this.amplitude;
  }

  //returns true if bird is out of window dimensions where it'll then be deleted
  isAlive() {
    return this.x < 0 - this.length || this.x > windowWidth + this.length;
  }
}