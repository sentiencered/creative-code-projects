let state = 1;
let col;
let rectW;
let m;

function setup() {
  createCanvas(400, 400);
  background(220);
  rectW = width/4;
  m = rectW/2;
  col = 255;
  
  rect(width/2 - m, height/2 - m, rectW);
}

function mousePressed(){
  //alter to make two clicks turn black, three to turn white
  
  if(col == 255){
    if(state>1){
      state = 0;
      col = 0;
    }
  }
  
  if(col == 0){
    if(state>2){
      state = 0;
      col = 255;
    }
  }
  
    if((mouseX > width/2 -m) && (mouseX < width/2 + m) && (mouseY > height/2 -m) && (mouseY < height/2 +m)){
    state+=1;
    fill(col);
    rect(width/2 - m, height/2 - m, rectW);
  }
  
  console.log(state);
}