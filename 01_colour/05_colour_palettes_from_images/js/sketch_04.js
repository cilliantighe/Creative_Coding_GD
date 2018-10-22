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
var displayText = true;
var textAlpha = 1;
var headerFont = "";
var descFont = "";

// An arrray to hold all the colours from the loaded image
var colours = [];
var img;
var sortMode = null;

function preload() {

  img = loadImage('data/image.jpg');
  headerFont = loadFont('font/RobotoCondensed-Regular.ttf');
  descFont = loadFont('font/Roboto-Thin.ttf');

}


// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);
  colorMode(RGB);

  noCursor();
  noStroke();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  var tileCount = map(constrain(mouseX, 0, width), 0, width, 5, 500);

  var rectSize = width / tileCount;

  img.loadPixels();

  colours = [];

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var px = floor(gridX * rectSize);
      var py = floor(gridY * rectSize);
      var i = (py * img.width + px) * 4;
      var c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);

      colours.push(c);
    }
  }

  gd.sortColors(colours, sortMode);

  var i = 0;
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      fill(colours[i]);
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      i++
    }
  }

  // Time passed will hold the amount of time passed in seconds
  timePassed = millis() / 1000;


  //---------------------------------------------------------
  // ---------- FUNCTION FOR DISPLAYING INTRO TEXT ----------
  //---------------------------------------------------------
  if (displayText && textAlpha > 0) {
    colorMode(HSB);
    // Setting the font size, type and alignment for the intro text
    textSize(60);
    textFont(headerFont);
    textAlign(CENTER);
    fill(0, 0, 100, textAlpha);
    text('Generative Design: Colour', width / 2, height / 2.3);

    // The rectangle below will act as a divider between the two text fields
    rectMode(CENTER);
    rect(width / 2, height / 2.2, dividerWidth, 3);
    rectMode(CORNER);

    // Changing the font size, type for the font below
    textSize(40);
    textFont(descFont);
    text('Colour Palettes From Images', width / 2, height / 2);


    // The condition below checks to see if the desired display time for the text
    // has been reached and if the size of the divider has reached it's size
    // If it has, it will then start to reduce the text's opacity
    if (timePassed > displayTime && dividerWidth >= desiredWidth) {
      textAlpha -= 0.02;
    } else if (dividerWidth <= desiredWidth) {
      dividerWidth += 5;
    }
    colorMode(RGB);
  } else {
    colorMode(HSB);
    textSize(20);
    textFont(headerFont);
    textAlign(LEFT);
    fill(0, 0, 100);
    text('05_colour_palettes_from_images', 25, 30);
    colorMode(RGB);
  }
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, '05_colour_palettes_from_images', 'png');
  if (key === '5') sortMode = null;
  if (key === '6') sortMode = gd.HUE;
  if (key === '7') sortMode = gd.SATURATION;
  if (key === '8') sortMode = gd.BRIGHTNESS;
  if (key === '9') sortMode = gd.GRAYSCALE;
}
