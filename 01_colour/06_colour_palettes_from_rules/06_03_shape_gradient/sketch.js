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

var colourCount = 20;
var actRandomSeed = 0;

// Variable arrays that will contain hue, saturation and brightness values
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
var alphaValue = 0.27;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);

  noStroke();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  // Time passed will hold the amount of time passed in seconds
  timePassed = millis() / 1000;

  // This function helps retain the same random numbers on each loop
  randomSeed(actRandomSeed);

  // This functionality helps control the colour of each shape
  // If i is even, the colour in the array will be a certain colour
  // If i is ood, it will be a different colour
  for (var i = 0; i < colourCount; i++) {
    if (i % 2 == 0) {
      hueValues[i] = floor(random(360));
      saturationValues[i] = 100;
      brightnessValues[i] = floor(random(100));
    } else {
      hueValues[i] = 195;
      saturationValues[i] = floor(random(100));
      brightnessValues[i] = 100;
    }
  }


  // The counter variable is used to select a colour from the array
  var counter = 0;

  // Randomly setting the amount of rows to be displayed
  // Setting the height of each row based off the amount of rows to be drawn
  var rowCount = floor(random(5, 30));
  var rowHeight = height / rowCount;

  // This array will be drawing from the bottom of the canvas
  for (var i = rowCount; i >= 0; i--) {


    // partCount refers to the amount of parts to be drawn
    // Parts refer to the total amount of shapes to be drawn. This includes small fragmented shapes
    var partCount = i + 1;
    var parts = [];

    // Loops through the total amount of partCount
    // partCount can change in size if, the first condition is met in the loop
    for (var ii = 0; ii < partCount; ii++) {
      // This condition has a small probability to be true
      // This is why there is a greater chance for the bottom rows to be more dense with varying shape sizes
      if (random() < 0.075) {

        // If the condition is met, it will produce a random number to be added to the partCount
        // If fragements were to produce 5, that will be added to partCount
        // But each of those fragments will have smaller shapes which will be added to the parts array
        var fragments = floor(random(2, 20));
        partCount = partCount + fragments;
        for (var iii = 0; iii < fragments; iii++) {
          parts.push(random(2));
        }
      } else {
        parts.push(random(2, 20));
      }
    }

    // A loop is used to calculate the total size of the parts array
    // This will later be mapped to the appropiate size of the canvas
    var sumPartsTotal = 0;
    for (var ii = 0; ii < parts.length; ii++) {
      sumPartsTotal += parts[ii];
    }

    // Function for draing the shapes
    // sumPartsNow refers to the current shape to be drawn
    var sumPartsNow = 0;
    for (var ii = 0; ii < parts.length; ii++) {
      sumPartsNow += parts[ii];

      // Using the map function to resize the shapes to the appropiate measures on the canvas
      var x = map(sumPartsNow, 0, sumPartsTotal, 0, width);
      var y = rowHeight * i;
      var w = -map(parts[ii], 0, sumPartsTotal, 0, width);
      var h = rowHeight * 1.5;

      var index = counter % colourCount;
      var col1 = color(0);
      var col2 = color(hueValues[index], saturationValues[index], brightnessValues[index], alphaValue);
      gradient(x, y, w, h, col1, col2);

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
    text('Colour Palettes From Rules: Shape Gradient', width / 2, height / 1.8);


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
    text('06_03_shape_gradient', 25, 30);
  }
}

// A function to generate a gradient for the shape
function gradient(x, y, w, h, c1, c2) {
  // drawingContext is used in reference to where the gradient is drawn
  var ctx = drawingContext;
  var grd = ctx.createLinearGradient(x, y, x, y + h);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
	ctx.fillStyle = grd;
	ctx.fillRect(x, y, w, h);
}

function mouseReleased() {
  actRandomSeed = random(100000);
}

// Saves an image of the file when the user presses the key
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, '06_03_shape_gradient', 'png');
}
