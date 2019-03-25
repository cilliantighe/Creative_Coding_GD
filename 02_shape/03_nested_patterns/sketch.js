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
var desiredWidth = 750;
var dividerWidth = 0;
var displayTime = 5;
var timePassed = 0;
var textAlpha = 1;

var shapeSize = 50;
var noOfShapesX = 0;
var noOfShapesY = 0;

var yOffset = 0;
var xOffset = 0;
var seedNum = 0;;

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

  // Changes the capping of strokes
  shapeCap = ROUND;

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
      let rand = floor(random(0, 2));
      push();
      // Each shape is translated to the centre of their grid
      translate((posX * shapeSize) + shapeSize / 2, (posY * shapeSize) + shapeSize / 2)
      fill(195, 70, 98);
      strokeWeight(10);
      strokeCap(shapeCap);
      stroke(195, 70, 98)

      /*
      Depending on the outcome of the random number, the line will be drawn
      at a different angle
      */
      if (rand === 0) {
        stroke(223, 56, 40)
        strokeWeight(map(constrain(mouseX, 0, width), 0, width, 1, 10));
        line(-shapeSize / 2, shapeSize / 2, shapeSize / 2, -shapeSize / 2);
      } else {
        strokeWeight(map(constrain(mouseY, 0, height), 0, height, 1, 10));
        line(-shapeSize / 2, -shapeSize / 2, shapeSize / 2, shapeSize / 2);
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
    textFont("Roboto Condensed");
    textAlign(CENTER);
    fill(0, 0, 0, textAlpha);
    text("Generative Design: Shape", width / 2, height / 2.1);

    // The rectangle below will act as a divider between the two text fields
    rect(width / 2, height / 2, dividerWidth, 3);

    // Changing the font size, type for the font below
    textSize(40);
    textFont("Roboto");
    text("Nested Patterns", width / 2, height / 1.8);

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
    textFont("Roboto Condensed");
    textAlign(LEFT);
    fill(0, 0, 0);
    text("03_nested_patterns", 25, 30);
  }
}

function mousePressed() {
  seedNum = Math.floor(random(100));
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "03_nested_patterns", "png");
  if (key == 1) shapeCap = ROUND;
  if (key == 2) shapeCap = SQUARE;
  if (key == 3) shapeCap = PROJECT;
}
