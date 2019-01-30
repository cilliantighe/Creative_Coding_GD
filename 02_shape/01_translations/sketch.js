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

var angleIncrement = 0;
var lineWidth = 1;
var segments = 0;
var radius = 0;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);

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

  // Calculating the number of segments to be drawn based on the position off the mouse in the 'y' direction
  // Calculating the radius based off the position of the mouse in the 'x' direction
  // Using the 'abs()' to convert the result for the radius into a whole number
  segments = floor(map(constrain(mouseY, 0, height), 0, height, 50, 100));
  lineWidth = floor(map(constrain(mouseY, 0, height), 0, height, 5, 1));
  radius = floor(map(constrain(mouseX, 0, width), 0, width, 500, 50));
  angleIncrement = (360 / segments);

  for (var angle = 0; angle <= 360; angle += angleIncrement) {
    push();

    //var posX = cos(radians(angle)) * abs(radius);
    //var posY = sin(radians(angle)) * abs(radius);
    //var posX = cos(radians(angle)) * (sin((angle/90)*TWO_PI) * radius);
    //var posY = sin(radians(angle)) * (sin((angle/90)*TWO_PI) * radius);

    /*
    The first part of the calculation determines the x and y location
    The second part uses the map function to determine the radius based on the returned
    value from the sin(angle / 45 * TWO_PI)
    */
    var posX = cos(radians(angle)) * map(sin((angle / 45) * TWO_PI), -1, 1, radius / 2, radius);
    var posY = sin(radians(angle)) * map(sin((angle / 45) * TWO_PI), -1, 1, radius / 2, radius);

    translate(width / 2, height / 2);
    strokeWeight(lineWidth);
    stroke(195, 70, 98);
    fill(195, 70, 98);
    line(posX / 2, posY / 2, posX, posY);
    ellipse(posX, posY, 10, 10);
    pop();
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
    text('Generative Design: Shape', width / 2, height / 2.1);

    // The rectangle below will act as a divider between the two text fields
    rect(width / 2, height / 2, dividerWidth, 3);

    // Changing the font size, type for the font below
    textSize(40);
    textFont("Roboto");
    text('Translations', width / 2, height / 1.8);


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
    text('01_translations', 25, 30);
  }
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, '01_translations', 'png');
}
