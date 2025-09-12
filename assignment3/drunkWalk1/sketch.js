//brownian motion
let x;
let y;
let dx;
let dy;
let s = 2;
let r = 4;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  fill(0);
  x = width/2;
  y = height/2;
}

function draw() {
  
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
  
  dx = random(-r, r);
  dy = random(-r, r);
  
  x+=dx;
  y+=dy;
  
//   dx = random(-5, 5);
//   dy = random(-5, 5);
  
//   if(dx>=0){
//     for(i=0; i<dx; i++){
//       x++;
//       // x+=i;
//       ellipse(x, y, s);
//     }
//   }
//   else{
//     for(i=0; i>dx; i--){
//       x--;
//       // x+=i;
//       ellipse(x, y, s);
//     }
//   }
  
//   if(dy>=0){
//     for(i=0; i<dy; i++){
//       y++;
//       // y+=i;
//       ellipse(x, y, s);
//     }
//   }
//   else{
//     for(i=0; i>dy; i--){
//       y--;
//       // y+=i;
//       ellipse(x, y, s);
//     }
//   }
  
  //update current position with small random displacement in x and y, leave trail
  
  ellipse(x, y, s);
}