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
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);

  // Repositioning the canvas
  canvas.parent('canvas');

  // Setting the color of the canvas background
  background(255);
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  background(360 - (mouseY / 2), 100, 100);
  translate(width / 2, height / 2);
  fill(mouseY / 2, 100, 100);
  noStroke();
  rect(0, 0, mouseX, mouseX);

}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, gd.timestamp() + '_MouseX_' + mouseX + '_MouseY_' + mouseY, 'png');
}
