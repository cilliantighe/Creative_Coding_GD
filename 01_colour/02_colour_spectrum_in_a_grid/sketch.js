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

// 'tileCountX' & 'tileCountY' refer to the amount of rectangles drawn in each direction
var tileCountX = 2;
var tileCountY = 2;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);

  // Setting the colour mode of the canvas
  // Using the 'rectMode' function to draw rectangles from the center
  colorMode(HSB, width, height, 100);
  noCursor();
  noStroke();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  // Time passed will hold the amount of time passed in seconds
  timePassed = millis() / 1000;

  // The amount of tiles to be drawn is calculated based off the location of the mouse
  // The mouse in both the 'x' & 'y' direction has been mapped to output values from 10 - 100
  tileCountX = floor(map(constrain(mouseX, 0, width), 0, width, 10, 100));
  tileCountY = floor(map(constrain(mouseY, 0, height), 0, height, 10, 100));

  // The width & height of each rectangle to be drawn is then calculated
  var tileWidth = width / tileCountX;
  var tileHeight = height / tileCountY;

  // The nested for loop draws the rectangles row to row
  for (var gridY = 0; gridY < height; gridY += tileHeight) {
    for (var gridX = 0; gridX < width; gridX += tileWidth) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, tileWidth, tileHeight);
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
    fill(0, 0, 100, textAlpha);
    text('Generative Design: Colour', width / 2, height / 2.1);

    // The rectangle below will act as a divider between the two text fields
    rectMode(CENTER);
    rect(width / 2, height / 2, dividerWidth, 3);
    rectMode(CORNER);

    // Changing the font size, type for the font below
    textSize(40);
    textFont("Roboto");
    text('Colour Spectrum in a Grid', width / 2, height / 1.8);


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
    fill(0, 0, 100);
    text('02_colour_spectrum_in_a_grid', 25, 30);
  }
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, '02_colour_spectrum_in_a_grid', 'png');
}
