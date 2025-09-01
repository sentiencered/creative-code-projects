console.log("hello")

function setup() {
  //let s= 700
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(130, 150, 175);
  cursor(CROSS);
  
  // fill(230, 115, 75);
  // fill(75, 95, 130);
  noStroke();
  
  let n= width/20;
  let f= width/n

  fill(105, 125, 165, 200);
  for(a=f; a<width; a+=f){
    for(b=f; b<width; b+=f){
      let o= f* noise((a+f), (b+f), frameCount/400);
      ellipse(a, b, o, o);
    }
  }
  fill(75, 95, 130, 200);
  for(x=f; x<width; x+=f){
    for(y=f; y<height; y+=f){
      let d= f* noise((x+f), (y+f), frameCount/200);
      ellipse(x, y, d, d);
    }
  }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}