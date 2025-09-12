//random lattice walk
let x;
let y;
let d = 4;
let dir;
let s = 2;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  fill(0);
  x = width/2;
  y = height/2;
}

function draw() {
  //1/4 chance to move up/down/left/right, leave trail
  dir = floor(random(1, 5));
  // console.log(dir);
  
  // x = constrain(x, 0, width);
  // y = constrain(y, 0, height);
  
  if(dir == 1){
    for(i=0; i<d; i++){
      x+=i;
      square(x, y, s);
    }
  }
  if(dir == 2){
    for(i=0; i<d; i++){
      y+=i;
      square(x, y, s);
    }
  }
  if(dir == 3){
    for(i=0; i<d; i++){
      x-=i;
      square(x, y, s);
    }
  }
  if(dir == 4){
    for(i=0; i<d; i++){
      y-=i;
      square(x, y, s);
    }
  }
}