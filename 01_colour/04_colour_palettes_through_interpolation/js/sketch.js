/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
*/

var coloursLeft = [];
var coloursRight = [];
var colours = [];

var tileX = 100;
var tileY = 10;

var interpolateShortest = true;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  // Gets the width of the div so the canvas can take up all the space
  var canvas = createCanvas($("#canvas").width(), 720);
  colorMode(HSB);
  noStroke();
  shakeColour();

  // Repositioning the canvas
  canvas.parent('canvas');

  // Setting the color of the canvas background
  background(255);

}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  tileX = floor(map(constrain(mouseX, 0, width), 0, width, 2, 100));
  tileY = floor(map(constrain(mouseY, 0, height), 0, height, 2, 10));

  var tileWidth = width / tileX;
  var tileHeight = height / tileY;
  var interCol;

  for (var gridY = 0; gridY < tileY; gridY++) {
    for (var gridX = 0; gridX < tileX; gridX++) {

      var startCol = coloursLeft[gridY];
      var endCol = coloursRight[gridY];

      var amount = map(gridX, 0, tileX - 1, 0, 1);

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
}

function shakeColour() {
  for (var i = 0; i < tileY; i++) {
    coloursLeft[i] = color(floor(random(0, 125)), floor(random(0, 125)), 255);
    coloursRight[i] = color(floor(random(130, 255)), floor(random(130, 255)), 125);
  }
}

function mouseReleased() {
  shakeColour();
}

function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colours)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(canvas, gd.timestamp(), 'png');
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}
