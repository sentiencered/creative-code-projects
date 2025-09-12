function setup() {
  createCanvas(400, 400);
  background(220);
  let rectW = width/4;
  let m = rectW/2;
  
  fill(255);
  rect(width/2 - m, height/2 - m, rectW);
}

function mousePressed(){
  let rectW = width/4;
  let m = rectW/2;
  
  if((mouseX > width/2 -m) && (mouseX < width/2 + m) && (mouseY > height/2 -m) && (mouseY < height/2 +m)){
    
    fill(0);
    rect(width/2 - m, height/2 - m, rectW);
  }
}