function setup() {
  createCanvas(400, 400);
  background(255);
  strokeWeight(5);
  
  let m=10;
  let x1=m;
  let y1=height-m;
  let x2=m;
  let y2=m;
  let f=(width-m*2)/8;
  
  for(i=0; i<9; i++){
    line(x1, y1, x2, y2);
    console.log(x1, y1, y1, y2);
    y2+=f;
    x1+=f;
  }
}