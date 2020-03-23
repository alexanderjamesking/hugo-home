console.log("hello");

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var gameChar_world_x;
var sreenCanvas;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isOnPlatform;

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;
var flag;
var tokens;
var platforms;

var game_score;
var flagpole;
var lives;
var gameOver;

var jumpSound;
var collectSound;
var splashSound;
var levelCompleteSound;

function preload() {
  soundFormats("mp3", "wav");

  //load sounds
  jumpSound = loadSound("assets/jump.wav");
  jumpSound.setVolume(0.05);

  collectSound = loadSound("assets/collect.mp3");
  collectSound.setVolume(0.05);

  splashSound = loadSound("assets/splash.mp3");
  splashSound.setVolume(0.05);

  levelCompleteSound = loadSound("assets/level_complete.mp3");
  levelCompleteSound.setVolume(0.05);
}

function setup() {
  sreenCanvas = { width: 750, height: 576 };
  var canvas = createCanvas(sreenCanvas.width, sreenCanvas.height);
  canvas.parent("container");

  floorPos_y = (height * 3) / 4;

  startGame();
}

function startGame() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  isOnPlatform = false;

  // Initialise arrays of scenery objects.
  trees_x = [-100, 200, 600, 950, 1050, 1300, 1600, 2300, 2750, 3500, 3700];

  clouds = [
    { x_pos: 800, y_pos: 100, width: 100 },
    { x_pos: 100, y_pos: 100, width: 60 },
    { x_pos: -800, y_pos: 150, width: 100 },
    { x_pos: -400, y_pos: 60, width: 70 },
    { x_pos: 1600, y_pos: 200, width: 100 },
    { x_pos: 1600, y_pos: 180, width: 100 },
    { x_pos: 1900, y_pos: 230, width: 100 },
    { x_pos: 2300, y_pos: 230, width: 60 },
    { x_pos: 2700, y_pos: 150, width: 100 },
    { x_pos: 3000, y_pos: 120, width: 80 },
    { x_pos: 3300, y_pos: 100, width: 120 },
    { x_pos: 4100, y_pos: 120, width: 80 }
  ];

  mountains = [
    { x_pos: -150, y_pos: floorPos_y, height: 200, width: 170 },
    { x_pos: 200, y_pos: floorPos_y, height: 200, width: 300 },
    { x_pos: 600, y_pos: floorPos_y, height: 100, width: 150 },
    { x_pos: 1300, y_pos: floorPos_y, height: 220, width: 200 },
    { x_pos: 1950, y_pos: floorPos_y, height: 110, width: 350 },
    { x_pos: 2200, y_pos: floorPos_y, height: 100, width: 150 },
    { x_pos: 2400, y_pos: floorPos_y, height: 230, width: 150 },
    { x_pos: 3700, y_pos: floorPos_y, height: 250, width: 280 },
    { x_pos: 4000, y_pos: floorPos_y, height: 220, width: 200 }
  ];

  canyons = [
    { x_pos: -800, width: 600, waterLevel: 20 },
    { x_pos: 830, width: 80, waterLevel: 20 },
    { x_pos: 90, width: 80, waterLevel: 20 },
    { x_pos: 1100, width: 80, waterLevel: 20 },
    { x_pos: 1620, width: 70, waterLevel: 20 },
    { x_pos: 1820, width: 100, waterLevel: 20 },
    { x_pos: 2600, width: 90, waterLevel: 20 },
    { x_pos: 3000, width: 400, waterLevel: 40 }
  ];

  collectables = [
    { x_pos: 30, y_pos: floorPos_y - 20, size: 30 },
    { x_pos: 370, y_pos: floorPos_y - 120, size: 30 },
    { x_pos: 800, y_pos: floorPos_y - 20, size: 30 },
    { x_pos: 1050, y_pos: floorPos_y - 20, size: 30 },
    { x_pos: 1500, y_pos: floorPos_y - 100, size: 30 },
    { x_pos: 1750, y_pos: floorPos_y - 20, size: 30 },
    { x_pos: 2000, y_pos: floorPos_y - 20, size: 30 },
    { x_pos: 2150, y_pos: floorPos_y - 120, size: 30 },
    { x_pos: 2350, y_pos: floorPos_y - 20, size: 30 },
    { x_pos: 2580, y_pos: floorPos_y - 20, size: 30 },
    { x_pos: 2860, y_pos: floorPos_y - 20, size: 30 },
    { x_pos: 3150, y_pos: floorPos_y - 70, size: 30 },
    { x_pos: 3670, y_pos: floorPos_y - 20, size: 30 }
  ];

  game_score = 0;

  flagpole = {
    isReached: false,
    x_pos: 4000,
    height: 195
  };

  flag = {
    width: 50,
    height: 40
  };

  tokens = [{ x_pos: 40, y_pos: 10 }];

  lives = 3;

  gameOver = false;

  platforms = [];

  platforms.push(createPlatfoms(300, floorPos_y - 100, 150));
  platforms.push(createPlatfoms(1400, floorPos_y - 80, 130));
  platforms.push(createPlatfoms(2100, floorPos_y - 100, 130));
  platforms.push(createPlatfoms(3100, floorPos_y - 50, 130));
  platforms.push(createPlatfoms(3300, floorPos_y - 100, 150));
}

function draw() {
  background(135, 206, 250); // fill the sky blue
  noStroke();
  fill(46, 170, 120);
  rect(0, floorPos_y, width, height / 4); // draw some green ground

  push();

  translate(scrollPos, 0);

  // Draw clouds
  drawClouds();

  // Draw mountains
  drawMountains();

  // Draw trees
  drawTrees();

  // Draw canyons
  for (var i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
  }

  // Draw collectable items
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      drawCollectable(collectables[i]);
      checkCollectable(collectables[i]);
    }
  }

  // Draw platforms
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  renderFlagpole();

  pop();

  // Draw game character
  drawGameChar();

  // Show game score
  fill(255, 239, 213);
  noStroke();
  textSize(25);
  text("Score: " + game_score, 20, 30);

  // Draw lives counter
  fill(255, 239, 213);
  noStroke();
  text("Lives: ", 150, 30);

  // Draw game over message
  drawGameOver();

  checkPlayerDie();

  drawTokens();

  drawLevelComplete();

  // Logic to make the game character move or the background scroll
  if (isLeft) {
    if (gameChar_x > width * 0.2) {
      gameChar_x -= 5;
    } else {
      scrollPos += 5;
    }
  }

  if (isRight) {
    if (gameChar_x < width * 0.8) {
      gameChar_x += 5;
    } else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.
  if (gameChar_y < floorPos_y) {
    for (var i = 0; i < platforms.length; i++) {
      if (platforms[i].checkContact(gameChar_world_x, gameChar_y)) {
        isOnPlatform = true;
        isFalling = false;
        break;
      } else {
        isOnPlatform = false;
      }
    }
    if (isOnPlatform == false) {
      gameChar_y += 2;
      isFalling = true;
    }
  } else {
    isFalling = false;
  }

  // Logic to make character fall into a canyon
  if (isPlummeting) {
    gameChar_y += 5;
  }

  // Check our character reached an end of the World
  if (!flagpole.isReached) {
    checkFlagpole();
  }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  // walk left
  if (keyCode == 37) {
    isLeft = true;
  }

  // walk right
  if (keyCode == 39) {
    isRight = true;
  }

  // fall down
  if (keyCode == 32 && (gameChar_y == floorPos_y || isOnPlatform)) {
    jumpSound.play();
    isFalling = true;
    gameChar_y -= 120;
  }

  // key pressed to restart a game
  if (keyCode == 32 && (gameOver || flagpole.isReached)) {
    startGame();
  }
}

function keyReleased() {
  if (keyCode == 37) {
    isLeft = false;
  }

  if (keyCode == 39) {
    isRight = false;
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.
function drawGameChar() {
  // draw game character
  if (isLeft && isFalling) {
    // jumping-left code
    // body
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 21, 35, 35);
    fill(255);
    ellipse(gameChar_x - 13, gameChar_y - 21, 10, 20);
    // head
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 47, 32, 32);
    fill(255);
    ellipse(gameChar_x - 7, gameChar_y - 47, 15, 23);
    // tail
    fill(255, 210, 0);
    ellipse(gameChar_x + 15, gameChar_y - 15, 20, 10);
    // legs
    fill(180, 0, 0);
    ellipse(gameChar_x, gameChar_y - 1, 10, 15);
    // eyes
    fill(0);
    ellipse(gameChar_x - 7, gameChar_y - 47, 6, 6);
    fill(255);
    ellipse(gameChar_x - 7, gameChar_y - 47, 2, 2);
    // nose
    fill(180, 0, 0);
    triangle(
      gameChar_x - 20,
      gameChar_y - 41,
      gameChar_x - 15,
      gameChar_y - 45,
      gameChar_x - 15,
      gameChar_y - 37
    );
  } else if (isRight && isFalling) {
    // jumping-right code
    // body
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 21, 35, 35);
    fill(255);
    ellipse(gameChar_x + 13, gameChar_y - 21, 10, 20);
    // head
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 47, 32, 32);
    fill(255);
    ellipse(gameChar_x + 7, gameChar_y - 47, 15, 23);
    // tail
    fill(255, 210, 0);
    ellipse(gameChar_x - 15, gameChar_y - 15, 20, 10);
    // legs
    fill(180, 0, 0);
    ellipse(gameChar_x, gameChar_y - 1, 10, 15);
    // eyes
    fill(0);
    ellipse(gameChar_x + 7, gameChar_y - 47, 6, 6);
    fill(255);
    ellipse(gameChar_x + 7, gameChar_y - 47, 2, 2);
    // nose
    fill(180, 0, 0);
    triangle(
      gameChar_x + 20,
      gameChar_y - 41,
      gameChar_x + 15,
      gameChar_y - 45,
      gameChar_x + 15,
      gameChar_y - 37
    );
  } else if (isLeft) {
    // walking left code
    // body
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 21, 35, 35);
    fill(255);
    ellipse(gameChar_x - 13, gameChar_y - 21, 10, 20);
    // head
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 47, 32, 32);
    fill(255);
    ellipse(gameChar_x - 7, gameChar_y - 47, 15, 23);
    // tail
    fill(255, 210, 0);
    ellipse(gameChar_x + 15, gameChar_y - 15, 20, 10);
    // legs
    fill(180, 0, 0);
    ellipse(gameChar_x, gameChar_y - 1, 15, 10);
    // eyes
    fill(0);
    ellipse(gameChar_x - 7, gameChar_y - 47, 6, 6);
    fill(255);
    ellipse(gameChar_x - 7, gameChar_y - 47, 2, 2);
    // nose
    fill(180, 0, 0);
    triangle(
      gameChar_x - 20,
      gameChar_y - 41,
      gameChar_x - 15,
      gameChar_y - 45,
      gameChar_x - 15,
      gameChar_y - 37
    );
  } else if (isRight) {
    // walking right code
    // body
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 21, 35, 35);
    fill(255);
    ellipse(gameChar_x + 13, gameChar_y - 21, 10, 20);
    // head
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 47, 32, 32);
    fill(255);
    ellipse(gameChar_x + 7, gameChar_y - 47, 15, 23);
    // tail
    fill(255, 210, 0);
    ellipse(gameChar_x - 15, gameChar_y - 15, 20, 10);
    // legs
    fill(180, 0, 0);
    ellipse(gameChar_x, gameChar_y - 1, 15, 10);
    // eyes
    fill(0);
    ellipse(gameChar_x + 7, gameChar_y - 47, 6, 6);
    fill(255);
    ellipse(gameChar_x + 7, gameChar_y - 47, 2, 2);
    // nose
    fill(180, 0, 0);
    triangle(
      gameChar_x + 20,
      gameChar_y - 41,
      gameChar_x + 15,
      gameChar_y - 45,
      gameChar_x + 15,
      gameChar_y - 37
    );
  } else if (isFalling || isPlummeting) {
    // body
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 21, 35, 35);
    fill(255);
    ellipse(gameChar_x, gameChar_y - 21, 22, 20);
    // head
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 47, 32, 32);
    fill(255);
    ellipse(gameChar_x - 3, gameChar_y - 45, 17, 25);
    ellipse(gameChar_x + 3, gameChar_y - 45, 17, 25);
    // wings
    fill(255, 210, 0);
    ellipse(gameChar_x - 15, gameChar_y - 31, 20, 10);
    ellipse(gameChar_x + 15, gameChar_y - 31, 20, 10);
    // legs
    fill(180, 0, 0);
    ellipse(gameChar_x - 6, gameChar_y - 1, 10, 15);
    ellipse(gameChar_x + 6, gameChar_y - 1, 10, 15);
    // eyes
    fill(0);
    ellipse(gameChar_x - 5, gameChar_y - 47, 6, 6);
    ellipse(gameChar_x + 5, gameChar_y - 47, 6, 6);
    fill(255);
    ellipse(gameChar_x - 5, gameChar_y - 47, 2, 2);
    ellipse(gameChar_x + 5, gameChar_y - 47, 2, 2);
    // nose
    fill(180, 0, 0);
    ellipse(gameChar_x, gameChar_y - 40, 6, 10);
  } else {
    // standing front facing
    // body
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 21, 35, 35);
    fill(255);
    ellipse(gameChar_x, gameChar_y - 21, 22, 20);
    // head
    fill(255, 210, 0);
    ellipse(gameChar_x, gameChar_y - 47, 32, 32);
    fill(255);
    ellipse(gameChar_x - 3, gameChar_y - 45, 17, 25);
    ellipse(gameChar_x + 3, gameChar_y - 45, 17, 25);
    // wings
    fill(255, 210, 0);
    ellipse(gameChar_x - 15, gameChar_y - 31, 20, 10);
    ellipse(gameChar_x + 15, gameChar_y - 31, 20, 10);
    // legs
    fill(180, 0, 0);
    ellipse(gameChar_x - 12, gameChar_y - 2, 15, 10);
    ellipse(gameChar_x + 12, gameChar_y - 2, 15, 10);
    // eyes
    fill(0);
    ellipse(gameChar_x - 5, gameChar_y - 47, 6, 6);
    ellipse(gameChar_x + 5, gameChar_y - 47, 6, 6);
    fill(255);
    ellipse(gameChar_x - 5, gameChar_y - 47, 2, 2);
    ellipse(gameChar_x + 5, gameChar_y - 47, 2, 2);
    // nose
    fill(180, 0, 0);
    triangle(
      gameChar_x - 5,
      gameChar_y - 41,
      gameChar_x + 5,
      gameChar_y - 41,
      gameChar_x,
      gameChar_y - 34
    );
  }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    fill(255);
    ellipse(
      clouds[i].x_pos,
      clouds[i].y_pos,
      clouds[i].width * 2,
      clouds[i].width
    );
    ellipse(
      clouds[i].x_pos + 80,
      clouds[i].y_pos - 20,
      clouds[i].width * 1.5,
      clouds[i].width
    );
    ellipse(
      clouds[i].x_pos + 80,
      clouds[i].y_pos - 20,
      clouds[i].width * 1.5,
      clouds[i].width
    );
    ellipse(
      clouds[i].x_pos + 130,
      clouds[i].y_pos + 20,
      clouds[i].width * 1.5,
      clouds[i].width
    );
  }
}

// Function to draw mountains objects
function drawMountains() {
  for (var i = 0; i < mountains.length; i++) {
    fill(205, 133, 63);
    triangle(
      mountains[i].x_pos,
      floorPos_y,
      mountains[i].x_pos + mountains[i].width / 2,
      floorPos_y - mountains[i].height,
      mountains[i].x_pos + mountains[i].width,
      floorPos_y
    );
    fill(222, 184, 135);
    triangle(
      mountains[i].x_pos + 50,
      floorPos_y,
      mountains[i].x_pos + 50 + mountains[i].width / 2,
      floorPos_y - mountains[i].height + 30,
      mountains[i].x_pos + 30 + mountains[i].width,
      floorPos_y
    );
    fill(255);
  }
}

// Function to draw trees objects
function drawTrees() {
  for (var i = 0; i < trees_x.length; i++) {
    // Leaves
    fill(60, 179, 113);
    ellipse(trees_x[i], floorPos_y - 150, 150, 200);
    // Trunk with branches
    fill(160, 82, 45);
    rect(trees_x[i] - 10, floorPos_y - 150, 20, 150);
    rect(trees_x[i], floorPos_y - 120, 30, 5);
    rect(trees_x[i] - 30, floorPos_y - 140, 30, 5);
  }
}

// Function to draw life tokens
function drawTokens() {
  for (var i = 0; i < lives; i++) {
    fill(205, 92, 92);
    noStroke();
    ellipse(230 + 20 * i, 22, 15, 15);
  }
}

// Render a message when a game is over
function drawGameOver() {
  if (gameOver) {
    fill(255, 239, 213);
    stroke(205, 92, 92);
    rect(30, 50, 520, 50);
    fill(205, 92, 92);
    noStroke();
    text("Gave Over. Please press space to restart.", 40, 80);
  }
}

// Render a message when the level is complete
function drawLevelComplete() {
  if (flagpole.isReached) {
    fill(255, 239, 213);
    stroke(205, 92, 92);
    rect(30, 50, 600, 80);
    fill(205, 92, 92);
    noStroke();
    text("Level is complete! Please press space to restart.", 40, 80);
    text(`Your score: ${game_score}`, 40, 120);
  }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects
function drawCanyon(t_canyon) {
  fill(135, 206, 250);
  rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
  // Draw water
  fill(65, 105, 200);
  rect(
    t_canyon.x_pos,
    height - t_canyon.waterLevel,
    t_canyon.width,
    height - floorPos_y
  );
}

// Function to check character is over a canyon
function checkCanyon(t_canyon) {
  if (
    gameChar_world_x > t_canyon.x_pos &&
    gameChar_world_x < t_canyon.x_pos + t_canyon.width &&
    gameChar_y == floorPos_y
  ) {
    isPlummeting = true;
  }
}

// ---------------------------------
// Flagpoles render and check functions
// ---------------------------------

// Function to draw flagpole objects
function renderFlagpole() {
  push();
  // Draw a pole
  stroke(25, 25, 112);
  strokeWeight(4);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);
  // Draw a flag
  beginShape();
  fill(250, 128, 114);
  noStroke();

  if (flagpole.isReached) {
    vertex(flagpole.x_pos + 2, floorPos_y - flagpole.height);
    vertex(flagpole.x_pos + flag.width, floorPos_y - flagpole.height);
    vertex(flagpole.x_pos + flag.width - flag.height / 2, floorPos_y - 180);
    vertex(flagpole.x_pos + flag.width, floorPos_y - 165);
    vertex(flagpole.x_pos + 2, floorPos_y - 165);
  } else {
    vertex(flagpole.x_pos + 2, floorPos_y - flag.height);
    vertex(flagpole.x_pos + flag.width, floorPos_y - flag.height);
    vertex(
      flagpole.x_pos + flag.width - flag.height / 2,
      floorPos_y - flag.height / 2
    );
    vertex(flagpole.x_pos + flag.width, floorPos_y);
    vertex(flagpole.x_pos + 2, floorPos_y);
  }

  endShape();
  pop();
}

// Function to check character is near a flagpole
function checkFlagpole() {
  var distance = abs(gameChar_world_x - flagpole.x_pos);

  if (distance < 15) {
    flagpole.isReached = true;
    levelCompleteSound.play();
  }
}

function checkPlayerDie() {
  if (gameChar_y > sreenCanvas.height) {
    lives -= 1;
    splashSound.play();

    if (lives === -1) {
      gameOver = true;
    } else {
      // reset character's position
      gameChar_x = width / 2;
      gameChar_y = floorPos_y;
      scrollPos = 0;
      isPlummeting = false;
    }
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable) {
  fill(255, 192, 203);
  ellipse(t_collectable.x_pos, t_collectable.y_pos, 30, 40);
  fill(255);
  ellipse(t_collectable.x_pos - 5, t_collectable.y_pos - 5, 10, 15);
}

// Function to check character has collected an item
function checkCollectable(t_collectable) {
  if (
    dist(
      gameChar_world_x,
      gameChar_y,
      t_collectable.x_pos,
      t_collectable.y_pos
    ) < t_collectable.size
  ) {
    t_collectable.isFound = true;
    game_score += 1;
    collectSound.play();
  }
}

// Factory function to create platforms that charachter can jump on
function createPlatfoms(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function() {
      fill(139, 69, 19);
      rect(this.x, this.y, this.length, 15);
    },
    checkContact: function(gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        var d = this.y - gc_y;

        if (d >= 0 && d < 5) {
          return true;
        }

        return false;
      }
    }
  };

  return p;
}
