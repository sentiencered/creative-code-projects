let col1, col2;

function setup() {
  createCanvas(400, 400);
  background(250);
    col1 = color(255, 255, 0);
    col2 = color(255, 0, 255);
    noStroke();
}

//17 rectangles, 2 colors (randomized on click), lerp

function draw() {
  let m=15;
  let n=17;
  let step=(width-m*2)/17;
  let colStep=255/n;
  
  for(i=0; i<n; i++){
    let x=step*i+m;
    let y=m;
    colStep=i/(n-1);
    let col=lerpColor(col1, col2, colStep);
    fill(col);
    rect(x, y, (step -2), height-(2*m));
  }
}

function mousePressed(){
  col1=color(random(0,255), random(0,255), random(0,255));
  col2=color(random(0,255), random(0,255), random(0,255));
}