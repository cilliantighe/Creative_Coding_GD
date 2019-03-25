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

var shapeCap = "";
var noOfShapesX = 0;
var noOfShapesY = 0;
var shapeSize = 50;

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
  shapeCap = SQUARE;

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

  // Recentring the canvas using the offset values
  translate(xOffset, yOffset);

  // Nested loop to position the shapes in the x y direction
  for (var posY = 0; posY < noOfShapesY; posY++) {
    for (var posX = 0; posX < noOfShapesX; posX++) {
      push();
      // Calculating the center point for each shape in their respective grid
      var centerX = (posX * shapeSize) + shapeSize / 2;
      var centerY = (posY * shapeSize) + shapeSize / 2;
      translate(centerX, centerY);
      // Using the atan2 function to rotate the shape to the position of the mouse
      var rotateShape = atan2(mouseY - centerY, mouseX - centerX);
      /*
      Using pythagoras theorem to calculate the distance between the mouse and
      the shape. This value will be mapped to output a new value that will be used
      to change the colour of the shape. The colour of the shape will change based
      on it's distance to the mouse
      */
      var distance = sqrt(pow((mouseY - centerY), 2) + pow((mouseX - centerX), 2));
      var disMap = map(distance, 0, width/2, 100, 200);
      var sizeMap = map(distance, 0, width, 1, 10);
      var lenMap = map(distance, 0, width, 8, 2);
      rotate(rotateShape);
      strokeWeight(sizeMap);
      strokeCap(shapeCap);
      stroke(disMap, 70, 98)
      line(0, 0, shapeSize / lenMap, shapeSize / lenMap);
      translate(shapeSize / lenMap, shapeSize / lenMap);
      noStroke();
      fill(disMap, 70, 98)
      triangle(-(sizeMap*2), 0, 0, -(sizeMap*2), abs(sizeMap), abs(sizeMap));
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
    text("Nested Movement", width / 2, height / 1.8);

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
    text("04_nested_movement", 25, 30);
  }
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "04_nested_movement", "png");
  if (key == 1) shapeCap = ROUND;
  if (key == 2) shapeCap = SQUARE;
  if (key == 3) shapeCap = PROJECT;
}
