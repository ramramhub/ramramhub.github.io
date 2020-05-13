// 2D Arrayssss Project
// Ramit Kapoor
// May 12th, 2020

// Extra for Experts:
// - used perlin noise to generate terrain with a grid
// - used dig tool to splice and modify 2D arrays
// - used classes for efficiency
// - added three difficulties

//defines arrays
let map = [];
let treasure = [];

//sets up global variables
let gameStarted = false;
let difficulty;
let toolMode;
let energy;
let treasureNumber;
let treasureFound;
let mouseClickTracker;
let cols, rows;
let mapUnitWidth, mapUnitHeight;
let easyButton, mediumButton, hardButton, resetButton;

//sets up game
function setup() {
  //sets up canvas
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //sets up reset button and hides it
  resetButton = createDiv('Try Again?');
  resetButton.hide();

  easyButton = createDiv('EASY');
  mediumButton = createDiv('MEDIUM');
  hardButton = createDiv('HARD');

  //defining variables
  cols = 200;
  rows = 200;
  mouseClickTracker = 0;
  toolMode = 1;

  //generates one grid unit
  mapUnitWidth = windowWidth/cols;
  mapUnitHeight = windowHeight/rows;

  treasureFound = 0;

  //generates terrain
  map = generateTerrainArray(cols, rows);
}

//draw loop
function draw() {
  background(0);

  displayTreasure();
  displayTerrain(map);

  //if the game is started, game mechanic functions will be called
  if (gameStarted) {
    displayTreasureCount();
    displayEnergyCount();
    displayInstructions();
    checkIfGameEnd();
  }

  //if the game hasn't started, user will be prompted to menu
  else {
    startScreen();
  }
}

//menu where user selects difficulty of game
function startScreen() {
  textFont('Georgia');
  textSize(55);
  textAlign(CENTER);
  fill(252, 186, 3);
  text("TREASURE HUNT", width/2, height/2 - 90);

  //sets up difficulty options
  showEasyButton();
  showMediumButton();
  showHardButton();
  }

//shows easy button
function showEasyButton() {
  easyButton.show();
  easyButton.position(width/2 - 50, height/2 - 65);
  easyButton.size(100, 25);
  easyButton.style('text-font', 'Georgia');
  easyButton.style('text-align', 'center');
  easyButton.style('padding-top', '7px');
  easyButton.style('background-color', '#0db82c');
  easyButton.style('border-radius', '5px');
  easyButton.style('color', 'white');
  easyButton.style('cursor', 'pointer');
  easyButton.mousePressed(pickEasyGame);
}

//shows medium button
function showMediumButton() {
  mediumButton.show();
  mediumButton.position(width/2 - 50, height/2 - 20);
  mediumButton.size(100, 25);
  mediumButton.style('text-font', 'Georgia');
  mediumButton.style('text-align', 'center');
  mediumButton.style('padding-top', '7px');
  mediumButton.style('background-color', '#c7b000');
  mediumButton.style('border-radius', '5px');
  mediumButton.style('color', 'white');
  mediumButton.style('cursor', 'pointer');
  mediumButton.mousePressed(pickMediumGame);
}

//shows hard button
function showHardButton() {
  hardButton.show();
  hardButton.position(width/2 - 50, height/2 + 25);
  hardButton.size(100, 25);
  hardButton.style('text-font', 'Georgia');
  hardButton.style('text-align', 'center');
  hardButton.style('padding-top', '7px');
  hardButton.style('background-color', '#aa1414');
  hardButton.style('border-radius', '5px');
  hardButton.style('color', 'white');
  hardButton.style('cursor', 'pointer');
  hardButton.mousePressed(pickHardGame);
}

//sets up easy game
function pickEasyGame() {
  treasureNumber = floor(random(7, 9));
  difficulty = 1.5;
  energy = 2000;
  startGame();
}

//sets up medium game
function pickMediumGame() {
  treasureNumber = floor(random(10, 16));
  difficulty = 1.2;
  energy = 1600;
  startGame();
}

//sets up hard game
function pickHardGame() {
  treasureNumber = floor(random(17, 22));
  difficulty = 1;
  energy = 1200;
  startGame();
}

//starts up game
function startGame() {
  gameStarted = true;

  easyButton.hide();
  mediumButton.hide();
  hardButton.hide();
  
  //generates treasure array
  createTreasure();
}

//random terrain generation using perlin seeds
function generateTerrainArray(cols, rows) {
  //perlin seed
  noiseSeed(random(100));
  let newTerrain = [];
  let x = 0;

  for (let i = 0; i < cols; i++) {
    newTerrain[i] = [];
    let y = 0;

    for (let j = 0; j < rows; j++) {
      newTerrain[i][j] = noise(x, y);
      y += 0.07;
    }
    x += 0.09;
  }
  return newTerrain;
}

//using 2D array, grid pieces are randomly generated based on their perlin noise value and colours accordingly
function displayTerrain(grid) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] < 0.3) {
        fill(10, 40, 115);
        rect(i * mapUnitWidth, j * mapUnitHeight, mapUnitWidth + 1, mapUnitHeight + 1);
      }

      else if (grid[i][j] < 0.5) {
        fill(22, 55, 138);
        rect(i * mapUnitWidth, j * mapUnitHeight, mapUnitWidth + 1, mapUnitHeight + 1);
      }

      else if (grid[i][j] < 0.7) {
        fill(56, 83, 150);
        rect(i * mapUnitWidth, j * mapUnitHeight, mapUnitWidth + 1, mapUnitHeight + 1);
      }

      else if (grid[i][j] !== "x") {
        fill(4, 21, 64);
        rect(i * mapUnitWidth, j * mapUnitHeight, mapUnitWidth + 1, mapUnitHeight + 1);
      }
    }
  }
}

//digs a hole and collects treasure piece if applicable
function mousePressed() {
  //generates x, y values based on specific grid piece
  let holeX = floor(mouseX/mapUnitWidth);
  let holeY = floor(mouseY/mapUnitHeight);
  
  //if toolMode is 1, hole will be small, if toolMode is 2, hole will be big
  if (gameStarted) {
    if (mouseClickTracker > 0 && !checkIfTreasureFound()) {
      if (toolMode === 1) {
        digTool1(holeX, holeY);
      }

      else {
        digTool2(holeX, holeY);
      }
    }
  }

  //checks if player clicks treasure piece
  checkIfTreasureFound();

  mouseClickTracker++;
}

//digs hole with smaller dimensions by taking out piece in 2D array and replacing it with X
function digTool1(holeX, holeY) {
  for (let i = -3; i < 3; i++) {
    for (let j = -5; j < 4; j++) {
      map[holeX + i].splice(holeY + j, 1);
      map[holeX + i].splice(holeY + j, 0, "x");
    }
  }

  for (let i = -2; i < 2; i++) {
    map[holeX + i].splice(holeY - 6, 1);
    map[holeX + i].splice(holeY - 6, 0, "x");
  }

  for (let i = -2; i < 2; i++) {
    map[holeX + i].splice(holeY + 4, 1);
    map[holeX + i].splice(holeY + 4, 0, "x");
  }

  for (let j = -3; j < 2; j++) {
    map[holeX - 4].splice(holeY + j, 1);
    map[holeX - 4].splice(holeY + j, 0, "x");
  }

  for (let j = -3; j < 2; j++) {
    map[holeX + 3].splice(holeY + j, 1);
    map[holeX + 3].splice(holeY + j, 0, "x");
  }

  energy -= floor(random(1, 7));
}

//digs hole with larger dimensions by taking out piece in 2D array and replacing it with X
function digTool2(holeX, holeY) {
  for (let i = -4 * toolMode; i < 4 * toolMode; i++) {
    for (let j = -5 * toolMode; j < 6 * toolMode; j++) {
      map[holeX + i].splice(holeY + j, 1);
      map[holeX + i].splice(holeY + j, 0, "x");
    }
  }

  for (let i = -4; i < 4; i++) {
    map[holeX + i].splice(holeY - 11, 1);
    map[holeX + i].splice(holeY - 11, 0, "x");
  }

  for (let i = -4; i < 4; i++) {
    map[holeX + i].splice(holeY + 12, 1);
    map[holeX + i].splice(holeY + 12, 0, "x");
  }

  for (let j = -6; j < 8; j++) {
    map[holeX - 9].splice(holeY + j, 1);
    map[holeX - 9].splice(holeY + j, 0, "x");
  }

  for (let j = -6; j < 8; j++) {
    map[holeX + 8].splice(holeY + j, 1);
    map[holeX + 8].splice(holeY + j, 0, "x");
  }

  energy -= floor(random(25, 36));
}

//generates new treasure piece from class treasurePiece
function createTreasure() {
  for (i = 0; i <= treasureNumber; i++) {
    let newPiece = new treasurePiece;
    treasure.push(newPiece);
  }
}

//displays treasure piece
function displayTreasure() {
  for (let i = 0; i < treasure.length; i++) {
    //if mouse hovers over piece, cursor will change to pointer
    collide = collidePointCircle(mouseX, mouseY, treasure[i].x, treasure[i].y, treasure[i].radius);

    treasure[i].display();
    if (collide) {
      cursor('pointer');
    }

    else {
      cursor('default');
    }
  }
}

//if mouse clicked on treasure piece, it will be promptly removed from array
function checkIfTreasureFound() {
  for (let i = 0; i < treasure.length; i++) {
    collide = collidePointCircle(mouseX, mouseY, treasure[i].x, treasure[i].y, treasure[i].radius);

    if (collide) {
      treasure.splice(i, 1);
      treasureFound += 1;
      return true;
    }
  }
  return false;
}

//if "t" is pressed, hole size will change
function keyPressed() {
  if (key === "t") {
    if (toolMode === 1) {
      toolMode += 1;
    }

    else if (toolMode === 2) {
      toolMode -= 1;
    }
  }
}

//if all treasure pieces found, game is won, else user loses game
function checkIfGameEnd() {
  if (treasureNumber === treasureFound) {
    gameWon();
  }

  else if (energy <= 0) {
    gameOver();
  }
}

//screen prompted when user wins game
function gameWon() {
  textFont('Georgia');
  textSize(55);
  textAlign(CENTER);
  fill("white");
  text("YOU WON!!", width/2, height/2 - 30);

  textSize(16);
  textStyle(BOLD);

  text("YOU FOUND ALL " + treasureFound + " TREASURE PIECES", width/2, height/2);
  text("GREAT WORK!", width/2, height/2 + 20);

  showResetButton();
  noLoop();
}

//screen prompted if user loses game
function gameOver() {
  textFont('Georgia');
  textSize(55);
  textAlign(CENTER);
  fill("white");
  text("GAME OVER!!", width/2, height/2 - 30);

  textSize(16);
  textStyle(BOLD);

  //if 0 pieces found
  if (treasureFound === 0) {
    text("YOU FOUND NO TREASURE!", width/2, height/2);
  }

  //if one piece found
  else if (treasureFound === 1) {
    text("YOU ONLY FOUND " + treasureFound + " PIECE OF TREASURE!", width/2, height/2);
  }

  //if any other number is found
  else {
    text("YOU FOUND " + treasureFound + " PIECES OF TREASURE!", width/2, height/2);
  }

  text("BETTER LUCK NEXT TIME!", width/2, height/2 + 20);

  showResetButton();
  noLoop();
}

//displays treasure count bar
function displayTreasureCount() {
  let treasureCountWidth = 180;
  let treasureCountHeight = 50;

  fill(43, 12, 145);
  rect(10, 12.5, treasureCountWidth, treasureCountHeight, 5);

  fill("white");
  textSize(16);
  textAlign(CENTER);

  textFont('Algerian');
  textStyle(BOLD);
  text("TREASURE LEFT: " + (treasureNumber - treasureFound), 100, 42.5);
}

//displays energy count bar
function displayEnergyCount() {
  let energyCountWidth = 130;
  let energyCountHeight = 50;

  fill(43, 12, 145);
  rect(200, 12.5, energyCountWidth, energyCountHeight, 5);

  fill("white");
  textSize(16);
  textAlign(CENTER);

  textFont('Algerian');
  textStyle(BOLD);

  if (energy > 0) {
    text("ENERGY: " + energy, 265, 42.5);
  }

  else {
    text("ENERGY: 0", 265, 42.5);
  }
}

//displays instructions on bottom of screen
function displayInstructions() {
  textAlign(CENTER);
  textSize(12);
  textFont('Georgia');
  
  fill("white");
  text("DIG FOR TREASURE! PRESS 'T' TO SWITCH TOOLS - FIND ALL TREASURE BEFORE YOU RUN OUT OF ENERGY", width/2, height - 30);
}

//pops up reset button
function showResetButton() {
  resetButton.show();
  resetButton.position(width/2 - 50, height/2 + 35);
  resetButton.size(100, 25);
  resetButton.style('text-font', 'Georgia');
  resetButton.style('text-align', 'center');
  resetButton.style('padding-top', '7px');
  resetButton.style('background-color', '#2b0c91');
  resetButton.style('border-radius', '5px');
  resetButton.style('color', 'white');
  resetButton.style('cursor', 'pointer');
  resetButton.mouseOver(changeResetButtonBG);
  resetButton.mouseOut(changeResetButtonBGBack);
  resetButton.mousePressed(reset);
}

//hover feature for reset buttons
function changeResetButtonBG() {
  resetButton.style('background-color', '#22077d');
}

//hover feature for reset buttons
function changeResetButtonBGBack() {
  resetButton.style('background-color', '#2b0c91');
}

//resets variables and restarts game
function reset() {
  map = [];
  mouseClickTracker = -1;
  treasure = [];
  resetButton.hide();

  cols = 200;
  rows = 200;
  toolMode = 1;

  mapUnitWidth = width/cols;
  mapUnitHeight = height/rows;
  treasureFound = 0;

  map = generateTerrainArray(cols, rows);

  gameStarted = false;

  loop();
}

//treasurePiece class to generate treasure pieces efficiently
class treasurePiece {
  constructor() {
    this.x = random(width - 30);
    this.y = random(height + 30);
    this.radius = random(10, 30) * difficulty;
    this.color = color(random(255), random(255), random(255), random(100, 255));
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }
}