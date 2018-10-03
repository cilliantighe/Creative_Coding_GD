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
  colorMode(HSB, 360, height, width);
  rectMode(CENTER);
  noStroke();

  // Repositioning the canvas
  canvas.parent('canvas');

  // Setting the color of the canvas background

}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  background(0, 0, width);

  var numberOfSteps = floor(map(constrain(mouseY, 0, height), 0, height, 5, 360));
  var angleIncrement = 360 / numberOfSteps;
  var radius = map(mouseX, 0, width, 250, 400);

  beginShape(TRIANGLE_FAN);
  vertex(width / 2, height / 2);
  for (var angle = 0; angle <= 360; angle += angleIncrement) {
    var vx = radius * cos(radians(angle)) + width / 2;
    var vy = radius * sin(radians(angle)) + height / 2;
    vertex(vx, vy);
    fill(angle, height, width);
  }
  endShape();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, gd.timestamp() + '_MouseX_' + mouseX + '_MouseY_' + mouseY, 'png');
}
