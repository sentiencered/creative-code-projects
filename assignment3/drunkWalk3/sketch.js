//smoothed noise
let x;
let y;
let nl;
let ns = .005;
let n;
let s = 1;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  fill(255);
  x = width/2;
  y = height/2;
  nl = width;
}

function draw() {
  //use perlin noise to regulate size and position of a circle
  
  // x = constrain(x, 0, width);
  // y = constrain(y, 0, height);
  
  n = ns*frameCount;
  
  x = nl * noise(n);
  y = nl * noise(n + 100);
  s = (nl/10) * noise(n);
  
  ellipse(x, y, s);
  
}