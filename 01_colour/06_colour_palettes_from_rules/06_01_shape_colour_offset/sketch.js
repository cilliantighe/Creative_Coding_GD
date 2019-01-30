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
var displayText = true;
var textAlpha = 1;

// Variables to draw the number of rectangles in the x & y direction
var tileCountX = 50;
var tileCountY = 10;

// Variable arrays that will contain hue, saturation and brightness values
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);

  noCursor();
  noStroke();

  // For loop to create random values for the arrays
  for (var i = 0; i < tileCountX; i++) {
    hueValues[i] = floor(random(360));
    saturationValues[i] = floor(random(100));
    brightnessValues[i] = floor(random(100));
  }
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  background(0, 0, 100);

  // Time passed will hold the amount of time passed in seconds
  timePassed = millis() / 1000;


  var counter = 0;

  var currentTileCountX = floor(map(constrain(mouseX, 0, width), 0, width, 5, tileCountX));
  var currentTileCountY = floor(map(constrain(mouseY, 0, height), 0, height, 2, tileCountY));

  var tileWidth = width / currentTileCountX;
  var tileHeight = height / currentTileCountY;

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var xPos = tileWidth * gridX;
      var yPos = tileHeight * gridY;
      var index = counter % currentTileCountX;

      // get component color values
      fill(hueValues[index], saturationValues[index], brightnessValues[index]);
      rect(xPos, yPos, tileWidth, tileHeight);
      counter++;
    }
  }

  //---------------------------------------------------------
  // ---------- FUNCTION FOR DISPLAYING INTRO TEXT ----------
  //---------------------------------------------------------
  if (displayText && textAlpha > 0) {
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
    text('Colour Palettes From Rules: Colour Offset', width / 2, height / 1.8);


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
    text('06_01_shape_colour_offset', 25, 30);
  }
}

// Changes the values in the array when the function is called
function shakeColour() {
  for (var i = 0; i < tileCountX; i++) {
    hueValues[i] = floor(random(360));
    saturationValues[i] = floor(random(100));
    brightnessValues[i] = floor(random(100));
  }
}

// When the user clicks the mouse, the 'shakeColour' function is called
function mouseReleased() {
  shakeColour();
}

// Saves an image of the file when the user presses the key
function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colours)], '06_01_shape_colour_offset', 'ase');
  if (key == 's' || key == 'S') saveCanvas(canvas, '06_01_shape_colour_offset', 'png');
}
