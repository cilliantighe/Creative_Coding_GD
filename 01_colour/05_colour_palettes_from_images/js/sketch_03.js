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

  var tileCount = 20;

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

  // 'i' will be used to increment through the colours array
  var i = 0;
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      fill(colours[i]);
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      i++
    }
  }
}
