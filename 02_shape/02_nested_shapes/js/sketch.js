/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
*/

// Variables used to create the intro text display
// 'desiredWidth' is used for the width of the divider between text
// 'dividerWidth' is the current size for the divider
// 'displayTime' is the amount of time (seconds) for the text to be displayed
// 'timePassed' is used to keep track of the time passed since the animation started
// 'displayText' is a boolean to keep track if the text is being displayed
// 'textAlpha' is the variable to change the text's opacity
var desiredWidth = 750;
var dividerWidth = 0;
var displayTime = 5;
var timePassed = 0;
var textAlpha = 1;
var headerFont = "";
var descFont = "";

var shape = 'Rectangle';
var randomAngle = 45;
var noOfShapesX = 0;
var noOfShapesY = 0;
var shapeSize = 100;
var seedNum = 0;

function preload() {
  // Loading the desired fonts for the project
  headerFont = loadFont("font/RobotoCondensed-Regular.ttf");
  descFont = loadFont("font/Roboto-Thin.ttf");
}

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {
  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);

  /*
   The number of shapes in the x and y direction of the canvas is calculated
   based off the desired shape size that is declared above. The number is floored
   to have an even number of shapes that are to be drawn
  */
  noOfShapesY = floor(height / shapeSize);
  noOfShapesX = floor(width / shapeSize);

  /*
  The offset is used to to recentre the canvas based off the remaining pixels that
  were not used for creating shapes
  */
  yOffset = (height - (noOfShapesY * shapeSize)) / 2;
  xOffset = (width - (noOfShapesX * shapeSize)) / 2;

  // Setting the colour mode of the canvas
  // Using the 'rectMode' function to draw rectangles from the center
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {
  // Time passed will hold the amount of time passed in seconds
  timePassed = millis() / 1000;
  background(0, 0, 100);
  randomSeed(seedNum);

  // Recentring the canvas using the offset values
  translate(xOffset, yOffset);

  // Nested loop to position the shapes in the x y direction
  for (var posY = 0; posY < noOfShapesY; posY++) {
    for (var posX = 0; posX < noOfShapesX; posX++) {
      push();
      // Each shape is translated to the centre of their grid
      translate((posX * shapeSize) + shapeSize / 2, (posY * shapeSize) + shapeSize / 2);
      rotate(radians(randomAngle));
      noStroke();
      var randOp_1 = random(0, 1);
      var randOp_2 = random(0, 1);
      fill(195, 70, 98, randOp_1);

      // Conditional statement for displaying the appropriate shape
      if (shape === 'Rectangle') {
        rect(0, 0, shapeSize, shapeSize);
        fill(223, 56, 40, randOp_2)
        rect(0, 0, shapeSize / 2, shapeSize / 2);
      } else if (shape === 'Ellipse') {
        ellipse(0, 0, shapeSize);
        fill(223, 56, 40, randOp_2)
        ellipse(0, 0, shapeSize / 2);
      } else if (shape === 'Triangle') {
        triangle(-shapeSize / 2, shapeSize / 2, 0, -shapeSize / 2, shapeSize / 2, shapeSize / 2);
        fill(223, 56, 40, randOp_2);
        triangle(shapeSize / 2, -shapeSize / 2, 0, shapeSize / 2, -shapeSize / 2, -shapeSize / 2);
      }
      pop();
    }
  }
  //---------------------------------------------------------
  // ---------- FUNCTION FOR DISPLAYING INTRO TEXT ----------
  //---------------------------------------------------------
  if (textAlpha > 0) {
    // Setting the font size, type and alignment for the intro text
    textSize(60);
    textFont(headerFont);
    textAlign(CENTER);
    fill(0, 0, 0, textAlpha);
    text("Generative Design: Shape", width / 2, height / 2.1);

    // The rectangle below will act as a divider between the two text fields
    rect(width / 2, height / 2, dividerWidth, 3);

    // Changing the font size, type for the font below
    textSize(40);
    textFont(descFont);
    text("Nested Shapes", width / 2, height / 1.8);

    // The condition below checks to see if the desired display time for the text
    // has been reached and if the size of the divider has reached it's size
    // If it has, it will then start to reduce the text's opacity
    if (timePassed > displayTime && dividerWidth >= desiredWidth) {
      textAlpha -= 0.02;
    } else if (dividerWidth <= desiredWidth) {
      dividerWidth += 5;
    }
  } else {
    textSize(20);
    textFont(headerFont);
    textAlign(LEFT);
    fill(0, 0, 0);
    text("02_nested_shapes", 25, 30);
  }
}

function mousePressed() {
  seedNum = floor(random(0, 1000));
  randomAngle = floor(random(0, 360));
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "02_nested_shapes", "png");
  if (key == 1) shape = 'Rectangle';
  if (key == 2) shape = 'Ellipse';
  if (key == 3) shape = 'Triangle';
}
