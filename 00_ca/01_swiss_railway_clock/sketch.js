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

// Radius of clock, no of ticks, variables for tick height and width
var radius = 0;
const noOfTicks = 60;
var hourTickHeight = 60;
var hourTickWidth = hourTickHeight / 3;
var minTickHeight = hourTickHeight / 3;
var minTickWidth = minTickHeight / 3;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {
  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  // Radius is half the height of the canvas
  radius = height / 3;

  // Setting the colour mode of the canvas
  // Using the 'rectMode' function to draw rectangles from the center
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {
  // Time passed will hold the amount of time passed in seconds
  // New date object for keeping track of time
  timePassed = millis() / 1000;
  var time = new Date();
  background(0, 0, 100);

  // Outer shape of the clock
  push();
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(10);
  stroke(0);
  ellipse(0, 0, radius * 2 + 50);
  pop();

  // Loop for displaying each of the ticks
  for (var i = 0; i <= noOfTicks; i++) {
    push();
    rectMode(CORNER);
    var angle = 360 / noOfTicks * i;
    translate(width / 2, height / 2);
    rotate(radians(angle));

    // Makes every fifth tick an hour tick
    if (i % 5 == 0) {
      fill(0, 0, 0);
      rect(-hourTickWidth / 2, -radius, hourTickWidth, hourTickHeight);
    } else {
      fill(0, 0, 0);
      rect(-minTickWidth / 2, -radius, minTickWidth, minTickHeight);
    }
    pop();
  }

  // Hour hand using beginShape to create a tapered shape
  push();
  rectMode(CORNER);
  translate(width / 2, height / 2);
  fill(0, 0, 0);
  rotate(radians(map((time.getHours() + time.getMinutes() / 60), 0, 24, 0, 720)));
  //rect(-15, 100, 30, -radius + 50);
  beginShape();
  vertex(-10, 100);
  vertex(-7, -radius);
  vertex(7, -radius);
  vertex(10, 100);
  endShape(CLOSE);
  pop();

  // Minute hand using beginShape to create a tapered shape
  push();
  rectMode(CORNER);
  translate(width / 2, height / 2);
  fill(0, 0, 0);
  rotate(radians(map((time.getMinutes() + time.getSeconds() / 60), 0, 60, 0, 360)));
  //rect(-10, 100, 20, -radius - 100);
  beginShape();
  vertex(-15, 100);
  vertex(-12, -radius + 150);
  vertex(12, -radius + 150);
  vertex(15, 100);
  endShape(CLOSE);
  pop();

  // Second hand using beginShape to create a tapered shape
  push();
  rectMode(CORNER);
  translate(width / 2, height / 2);
  fill(3, 80, 100);
  rotate(radians(map((time.getSeconds() + time.getMilliseconds() / 1000), 0, 60, 0, 360)));
  //rect(-5, 100, 10, -radius);
  beginShape();
  vertex(-5, 100);
  vertex(-3, -radius + 100);
  vertex(3, -radius + 100);
  vertex(5, 100);
  endShape(CLOSE);
  ellipse(0, 100 - radius, 40);
  ellipse(0, 0, 20);
  pop();

  //---------------------------------------------------------
  // ---------- FUNCTION FOR DISPLAYING INTRO TEXT ----------
  //---------------------------------------------------------
  if (textAlpha > 0) {
    // Setting the font size, type and alignment for the intro text
    textSize(60);
    textFont('Roboto  Condensed');
    textAlign(CENTER);
    fill(0, 0, 100, textAlpha);
    rect(width / 2, height / 2, radius * 2 + 65, radius * 2 + 65);
    fill(0, 0, 0, textAlpha);
    text("Generative Design: CA", width / 2, height / 2.1);

    // The rectangle below will act as a divider between the two text fields
    noStroke();
    rect(width / 2, height / 2, dividerWidth, 3);

    // Changing the font size, type for the font below
    textSize(40);
    textFont('Roboto');
    text("Swiss Railway Clock", width / 2, height / 1.8);

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
    textFont('Roboto  Condensed');
    textAlign(LEFT);
    fill(0, 0, 0);
    text("swiss_railway_clock", 25, 30);
  }
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "swiss_railway_clock", "png");
}
