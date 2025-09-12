let state = 1;
let col;
let rectW;
let m;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  rectW = width/4;
  m = rectW/2;
  col = color(255, 255, 255);
  
  fill(col);
  rect(width/2 - m, height/2 - m, rectW);
}

function draw(){
  if((mouseX > width/2 -m) && (mouseX < width/2 + m) && (mouseY > height/2 -m) && (mouseY < height/2 +m)){
    col = color(255, 255, 0);
    
    if(mouseIsPressed == true){
      col = color(0, 0, 0);
    }
  }
  else{
    col = color(255, 255, 255);
  }
  
  fill(col);
  rect(width/2 - m, height/2 - m, rectW);
}