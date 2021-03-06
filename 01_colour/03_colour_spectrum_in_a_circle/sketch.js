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

var radius;
var numberOfSteps;
var multiplier = 2;
var angleIncrement;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);

  // Setting the colour mode of the canvas
  // Using the 'rectMode' function to draw rectangles from the center
  colorMode(HSB, 360, height, width);
  noCursor();
  noStroke();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  // Time passed will hold the amount of time passed in seconds
  timePassed = millis() / 1000;

  // Redrawing the background on every draw
  background(0, 0, width);

  // Setting the 'numberOfSteps', 'angleIncrement' and 'radius' for the next colour wheel
  numberOfSteps = 5 * multiplier;
  angleIncrement = round(360 / numberOfSteps);
  radius = 200;

  // Setting the shape to be drawn to 'TRIANGLE_FAN' this is a key word in p5
  // The first vertex is the center of the shape
  // The following vertices are the surrounding points
  beginShape(TRIANGLE_FAN);
  vertex(width / 5, height / 2);
  for (var angle = 0; angle <= 360; angle += angleIncrement) {
    var vx = radius * cos(radians(angle)) + width / 5;
    var vy = radius * sin(radians(angle)) + height / 2;
    vertex(vx, vy);
    fill(angle, height, width);
  }
  endShape();

  // Setting the 'numberOfSteps', 'angleIncrement' and 'radius' for the next colour wheel
  numberOfSteps = 18 * multiplier;
  angleIncrement = round(360 / numberOfSteps);
  radius = 300;

  beginShape(TRIANGLE_FAN);
  vertex(width / 2, height / 2);
  for (var angle = 0; angle <= 360; angle += angleIncrement) {
    var vx = radius * cos(radians(angle)) + width / 2;
    var vy = radius * sin(radians(angle)) + height / 2;
    vertex(vx, vy);
    fill(angle, height, width);
  }
  endShape();

  // Setting the 'numberOfSteps', 'angleIncrement' and 'radius' for the next colour wheel
  numberOfSteps = 36 * multiplier;
  angleIncrement = round(360 / numberOfSteps);
  radius = 200;

  beginShape(TRIANGLE_FAN);
  vertex(width / 1.25, height / 2);
  for (var angle = 0; angle <= 360; angle += angleIncrement) {
    var vx = radius * cos(radians(angle)) + width / 1.25;
    var vy = radius * sin(radians(angle)) + height / 2;
    vertex(vx, vy);
    fill(angle, height, width);
  }
  endShape();

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
    text('Colour Spectrum in a Circle', width / 2, height / 1.8);


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
    text('03_colour_spectrum_in_a_circle', 25, 30);
  }
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, '03_colour_spectrum_in_a_circle', 'png');
  if (key == 1) multiplier = 1;
  if (key == 2) multiplier = 2;
  if (key == 4) multiplier = 4;
  if (key == 6) multiplier = 6;
  if (key == 8) multiplier = 8;
}
