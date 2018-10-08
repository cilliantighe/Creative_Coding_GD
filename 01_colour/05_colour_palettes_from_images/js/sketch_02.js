/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
*/

// An arrray to hold all the colours from the loaded image
var colours = [];
var img;

function preload() {

  img = loadImage('data/image.jpg');

}


function setup() {

  var canvas = createCanvas($("#canvas").width(), 768);
  noCursor();
  noStroke();
  noLoop();

  canvas.parent('canvas');
  background(255);

}

function draw() {

  // Refers to the amount of 'pixels' that are displayed on the screen (tileCount*tileCount)
  var tileCount = 20;

  // Calculates the size of each 'pixel' on the screen
  var rectSize = width / tileCount;

  img.loadPixels();

  // The colours array is emptied on each loop as the image will be redrawn
  colours = [];

  for (var gridY = 0; gridY < tileCount; gridY++) {
    // 'gridX' will refer to each colour that will be displayed on the screen
    for (var gridX = 0; gridX < tileCount; gridX++) {
      // 'px' & 'py' refer to the co-ordinate that the pixel will be drawn
      var px = floor(gridX * rectSize);
      var py = floor(gridY * rectSize);

      // We use the formula below to target the correct pixel in the pixel array to change the colour
      var i = (py * img.width + px) * 4;

      // We create a variable to hold a colour object and copy the HSB/RGB values from the img.pixels array
      var c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);

      // We then add the colour to the colours array
      colours.push(c);
    }
  }

}
