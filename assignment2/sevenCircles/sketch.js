function setup() {
  createCanvas(400, 400);
  background(220);
  let size=20;
  let stepSize=width/7;
  for(x=0; x<width; x+=stepSize){
    ellipse(x+stepSize/2, 150, size)
  }
}

