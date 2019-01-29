/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
*/

let minuteStrokeLength = 10;
let minuteStrokeWeight = 4;
let minuteStrokeColor;
let minuteStrokeCap;

let hourStrokeLength = 30;
let hourStrokeWeight = 10;
let hourStrokeColor;
let hourStrokeCap;

let clockRadius = 200;

let hourHandsTaper = 6;
let hourHandLength = 195;
let hourHandOffset = 80;
let hourHandStartWidth = 20;

let minuteHandsTaper = 6;
let minuteHandLength = 155;
let minuteHandOffset = 80;
let minuteHandStartWidth = 20;

let secondHandsTaper = 2;
let secondHandLength = 155;
let secondHandOffset = 80;
let secondHandStartWidth = 10;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {
  createCanvas(500, 500);
  // Commented noLoop() to allow the hands to rotate
  //noLoop();
  angleMode(DEGREES);

  minuteStrokeColor = color(30, 30, 30);
  minuteStrokeCap = SQUARE;

  hourStrokeColor = color(30, 30, 30);
  hourStrokeCap = SQUARE;
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  background(255);
  // Created a new Date object. This must be in the draw loop to retrieve the current time on every loop
  var time = new Date();

  for (var i = 0; i <= 60; i++) {
    push();
    var angle = (360 / 60) * i;
    translate(width / 2, height / 2);
    /*
    In the original js I had it convert the angle to radians but it was conflicting
    with the angleMode(DEGREES)
    */
    rotate(angle);
    if (i % 5 == 0) {
      stroke(hourStrokeColor);
      strokeCap(hourStrokeCap);
      strokeWeight(hourStrokeWeight);
      // The calculation for the y2 was missing '-clockRadius'
      line(0, -clockRadius, 0, -clockRadius + hourStrokeLength);
    } else {
      stroke(minuteStrokeColor);
      strokeCap(minuteStrokeCap);
      strokeWeight(minuteStrokeWeight);
      // The calculation for the y2 was missing '-clockRadius'
      line(0, -clockRadius, 0, -clockRadius + minuteStrokeLength);
    }
    pop();
  }

  push();
  noStroke();
  translate(width / 2, height / 2);
  rotate(map(time.getHours() + time.getMinutes() / 60, 0, 24, 0, 720));
  fill(0);
  beginShape();
  vertex(-hourHandStartWidth / 2, hourHandOffset);
  vertex(-hourHandStartWidth / 2 + hourHandsTaper, -hourHandLength);
  vertex(hourHandStartWidth / 2 - hourHandsTaper, -hourHandLength);
  // The calculation for the last vertex was incorrect in the original
  vertex(hourHandStartWidth / 2, hourHandOffset);
  endShape(CLOSE);
  pop();

  push();
  noStroke();
  translate(width / 2, height / 2);
  rotate(map(time.getMinutes() + time.getSeconds() / 60, 0, 60, 0, 360));
  fill(0);
  beginShape();
  vertex(-minuteHandStartWidth / 2, minuteHandOffset);
  vertex(-minuteHandStartWidth / 2 + minuteHandsTaper, -minuteHandLength);
  vertex(minuteHandStartWidth / 2 - minuteHandsTaper, -minuteHandLength);
  // The calculation for the last vertex was incorrect in the original
  vertex(minuteHandStartWidth / 2, minuteHandOffset);
  endShape(CLOSE);
  pop();

  push();
  noStroke();
  translate(width / 2, height / 2);
  // I had '(time.getMilliseconds() / 60)' instead of '(time.getMilliseconds() / 1000)'
  rotate(map(time.getSeconds() + (time.getMilliseconds() / 1000), 0, 60, 0, 360));
  fill(244, 66, 66);
  beginShape();
  vertex(-secondHandStartWidth / 2, secondHandOffset);
  vertex(-secondHandStartWidth / 2 + secondHandsTaper, -secondHandLength);
  vertex(secondHandStartWidth / 2 - secondHandsTaper, -secondHandLength);
  // The calculation for the last vertex was incorrect in the original
  vertex(secondHandStartWidth / 2, secondHandOffset);
  endShape(CLOSE);
  ellipse(0, 0, 15);
  ellipse(0, -secondHandLength, 25);
  pop();

}
