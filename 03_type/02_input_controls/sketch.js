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

// Variables for holding the reference to the DOM element
var sizeValue;
var clarityValue;

// Variables for holding the p5.dom inputs
var sizeSlider;
var claritySlider;
var txtInput;

// Variables used for modifying the text graphic
var pixelD = 8;
var txtSize = 250;
var txtTyped = 'Generative Design';

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(windowWidth, windowHeight);

  txtG = createGraphics(width, height);
  txtStyle = NORMAL;
  txtGraphic();

  // Slider for changing the shape size
  sizeSlider = createSlider(50, 500, txtSize);
  sizeSlider.parent('sizeSlider');
  sizeSlider.class('input slider');
  sizeSlider.input(update);

  // Slider for changing the clarity of the image
  claritySlider = createSlider(2, 20, pixelD);
  claritySlider.parent('claritySlider');
  claritySlider.class('input slider');
  claritySlider.input(update);

  // Text input for the display
  txtInput = createInput(txtTyped, 'text');
  txtInput.parent('txtInput');
  txtInput.class('input');
  txtInput.input(update);

  // ValueDisplays
  sizeValue = document.getElementById('sizeValue');
  clarityValue = document.getElementById('clarityValue');

  // Setting display values
  sizeValue.innerHTML = txtSize;
  clarityValue.innerHTML = pixelD;

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

  // Looping through the text graphic pixel array and drawing ellipses
  for (var y = 0; y < txtG.height; y += pixelD) {
    for (var x = 0; x < txtG.width; x += pixelD) {
      // Getting the index value for the graphic that was created
      var graphicIndex = (x + y * txtG.width) * 4;
      if (txtG.pixels[graphicIndex] <= 128) {
        fill(195, 70, 98);
        ellipse(x, y, 10, 10);
      }
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
    text('Generative Design: Type', width / 2, height / 2.1);

    // The rectangle below will act as a divider between the two text fields
    rect(width / 2, height / 2, dividerWidth, 3);

    // Changing the font size, type for the font below
    textSize(40);
    textFont("Roboto");
    text('Input Controls', width / 2, height / 1.8);


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
    text('02_input_controls', 25, 30);
  }
}

// Function that creates a graphic using the p5 library
function txtGraphic() {
  txtG.pixelDensity(1);
  txtG.background(255);
  txtG.fill(0);
  txtG.textSize(txtSize);
  txtG.textStyle(txtStyle);
  txtG.textAlign(CENTER);
  txtG.textFont('Roboto Condensed');
  txtG.text(txtTyped, txtG.width / 2, (txtG.height / 2) + txtSize / 3);
  txtG.loadPixels();
}

// Function that is called when an input field is changed
function update() {
  pixelD = claritySlider.value();
  txtTyped = txtInput.value();
  let size = sizeSlider.value();
  // Updating display values
  sizeValue.innerHTML = size;
  clarityValue.innerHTML = pixelD;
  txtSize = int(size);
  txtGraphic();
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (keyCode === DOWN_ARROW) saveCanvas(canvas, '02_input_controls', 'png');
}
