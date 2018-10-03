/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
*/

var image;
var colours = [];
var tileCountX = 10;
var tileCountY = 10;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  // Gets the width of the div so the canvas can take up all the space
  var canvas = createCanvas($("#canvas").width(), 768);
  colorMode(HSB);

  image = loadImage("data/Eevee.png");

  // Repositioning the canvas
  canvas.parent('canvas');

  // Setting the color of the canvas background
  background(255);
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  var tileWidthX = width / tileCountX;
  var tileWidthY = height / tileCountY;
}
