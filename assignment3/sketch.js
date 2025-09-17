
let x;
let y;
let ns = 1;
let n;
let s;
// let fs;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(207, 229, 241);
  //(180, 200, 235)
  
  noFill();
  x = width/2;
  y = height/2;
  s = width/2;
}

function draw() {
  
  // x = constrain(x, 0, width);
  // y = constrain(y, 0, height);
  
  
  n = ns*(frameCount/100);
  
  x = width * noise(n + 100);
  y = height * noise(n + 1000);
  s = (width+height)/2 * noise(n);
  
  // fs = color(105, 125, 165, random(0, 3));
  // 75, 95, 130
  // f = color(180, 200, 235, random(0, 5));
  f = color(random(105, 180), 125, random(165, 235), random(0, 10));
  
  // fill(f);
  // noStroke();
  stroke(f);
  ellipse(x, y, s);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}