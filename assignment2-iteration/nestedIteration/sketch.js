//checkers (8x8 grid, starting at white)

function setup() {
  createCanvas(400, 400);
  background(220);
  let step=width/8;
  let x, y;
  let col= 255;
  
  for(i=0; i<8; i++){
    for(j=0; j<8; j++){
      if(i%2 == 0){
        if(j%2 == 0){
          col=255;
        }
        else{
          col=0;
        }
      }
      else if(i%2 == 1){
        if(j%2 == 1){
          col=255;
        }
        else{
          col = 0;
        }
      }
      x=step*i;
      y=step*j;
      fill(col);
      rect(x, y, step);
    }
  }
}
