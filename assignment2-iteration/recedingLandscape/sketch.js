function setup() {
  createCanvas(400, 400);
  background(255);
  
  let x1=width/2;
  let x2=0; //bottom of canvas
  let n=width*10;
  
  for(x2=-n; x2<n; x2+=15){
    line(x1, -height/5, x2, height);
  }
}