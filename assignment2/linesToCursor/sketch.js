function setup() {
  createCanvas(400, 400);
  strokeWeight(3);
}

function draw() {
  background(220);
  
  let x=35;
  let m=(width-x*9)/2;
  
  for(i=0; i<10; i++){
    line(x*i+m, m, mouseX, mouseY);
  }
}