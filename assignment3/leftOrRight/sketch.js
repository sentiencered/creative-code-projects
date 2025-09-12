function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(30);
  
}

function draw() {
  let direction;
  
  if(mouseX < width/2){
    direction = "left";
  }
  else if(0 < mouseX){
    direction = "right"
  }
  clear();
  
  background(220);
  line(width/2, 0, width/2, height*2/3);
  text("cursor is on the", width/2, height*6/8);
  text(direction, width/2, height*7/8);
}