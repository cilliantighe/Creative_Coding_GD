/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
*/

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  // Gets the width of the div so the canvas can take up all the space
  var canvas = createCanvas($("#canvas").width(), 720);
  colorMode(HSB, width, height, 100);


  // Repositioning the canvas
  canvas.parent('canvas');

  // Setting the color of the canvas background
  background(255);
  noStroke();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  numberOfCols = floor(map(constrain(mouseX, 0, width), 0, width, 2, 100));
  numberOfRows = floor(map(constrain(mouseY, 0, height), 0, width, 2, 200));

  var stepX = width / numberOfCols;
  var stepY = height / numberOfRows;

  for (var gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, gd.timestamp() + '_MouseX_' + mouseX + '_MouseY_' + mouseY, 'png');
}
