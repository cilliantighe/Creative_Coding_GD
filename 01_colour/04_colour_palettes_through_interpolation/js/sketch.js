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

var coloursLeft = [];
var coloursRight = [];
var colours = [];

var tileCountX = 100;
var tileCountY = 10;

var interpolateShortest = true;

function preload() {

  // Loading the desired fonts for the project
  headerFont = loadFont('font/RobotoCondensed-Regular.ttf');
  descFont = loadFont('font/Roboto-Thin.ttf');

}

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);

  // Setting the colour mode of the canvas
  // Using the 'rectMode' function to draw rectangles from the center
  colorMode(HSB);
  noCursor();
  noStroke();
  shakeColour();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  // Time passed will hold the amount of time passed in seconds
  timePassed = millis() / 1000;

  tileCountX = floor(map(constrain(mouseX, 0, width), 0, width, 5, 100));
  tileCountY = floor(map(constrain(mouseY, 0, height), 0, height, 2, 10));

  var tileWidth = width / tileCountX;
  var tileHeight = height / tileCountY;
  var interCol;

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {

      var startCol = coloursLeft[gridY];
      var endCol = coloursRight[gridY];

      var amount = map(gridX, 0, tileCountX - 1, 0, 1);

      if (interpolateShortest) {
        colorMode(RGB);
        interCol = lerpColor(startCol, endCol, amount);
        colorMode(HSB);
      } else {
        interCol = lerpColor(startCol, endCol, amount);
      }

      var yPos = gridY * tileHeight;
      var xPos = gridX * tileWidth;

      fill(interCol);
      rect(xPos, yPos, tileWidth, tileHeight);

      colours.push(interCol);
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
    fill(0, 0, 100, textAlpha);
    text('Generative Design: Colour', width / 2, height / 2.1);

    // The rectangle below will act as a divider between the two text fields
    rectMode(CENTER);
    rect(width / 2, height / 2, dividerWidth, 3);
    rectMode(CORNER);

    // Changing the font size, type for the font below
    textSize(40);
    textFont(descFont);
    text('Colour Palettes Through Interpolation', width / 2, height / 1.8);


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
    fill(0, 0, 100);
    text('04_colour_palettes_through_interpolation', 25, 30);
  }
}

function shakeColour() {
  for (var i = 0; i < tileCountY; i++) {
    coloursLeft[i] = color(floor(random(0, 100)), floor(random(0, 125)), 255);
    coloursRight[i] = color(floor(random(175, 255)), floor(random(130, 255)), 125);
  }
}

function mouseReleased() {
  shakeColour();
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colours)], '04_colour_palettes_through_interpolation', 'ase');
  if (key == 's' || key == 'S') saveCanvas(canvas, '04_colour_palettes_through_interpolation', 'png');
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}
