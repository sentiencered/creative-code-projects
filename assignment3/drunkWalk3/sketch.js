//smoothed noise
let x;
let y;
let ns = .005;
let n;
let s = 1;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  fill(255);
  x = width/2;
  y = height/2;
}

function draw() {
  //use perlin noise to regulate size and position of a circle
  
  n = ns*frameCount;
  
  x = width * noise(n + 200);
  y = height * noise(n + 100);
  s = (((width+height)/2)/10) * noise(n + 50);
  
  ellipse(x, y, s);
  
}