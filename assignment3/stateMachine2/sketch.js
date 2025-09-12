let state = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  let rectW = width/4;
  let m = rectW/2;
  
  rect(width/2 - m, height/2 - m, rectW);
}

function mousePressed(){
  state+=1;
  if(state>1){
    state = 0;
  }
  
  let rectW = width/4;
  let m = rectW/2;
  
  // if((width/2 - m <= mouseX <= width/2 + m) && (height/2 - m <= mouseY <= height/2 + m))
    if((mouseX > width/2 -m) && (mouseX < width/2 + m) && (mouseY > height/2 -m) && (mouseY < height/2 +m)){
    if(state == 0){
      fill(255);
    }
    else if(state == 1){
      fill(0);
    }
    rect(width/2 - m, height/2 - m, rectW);
  }
}