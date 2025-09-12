function setup() {
  createCanvas(400, 400);
  background(220);
  noFill();
  
  let n = 30;
  let mult = 1.3;
  let d = 7;
  let s = 1;
  
  for(i=0; i<n; i++){
    strokeWeight(s);
    d*=mult;
    ellipse(width/2, height, d);
    s*=1.25;
  }
}
