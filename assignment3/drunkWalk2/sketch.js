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
  
  // x = constrain(x, 0, width);
  // y = constrain(y, 0, height);

  for(i=0; i<d; i++){
    if(dir == 1){
      x+=i;
    }
    if(dir == 2){
      y+=i;
    }
    if(dir == 3){
      x-=i;
    }
    if(dir == 4){
      y-=i;
    }
    square(x, y, s);
  }
}