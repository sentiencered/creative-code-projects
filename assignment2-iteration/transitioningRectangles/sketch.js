function setup() {
  createCanvas(400, 400);
  background(250);
  
  let n=15;
  let step = width/n;
  let m=step/2;
  let b=0;
  let bStep = 255/(n-1);
  
  for(i=1; i<n; i++){
    let x=(i*step)-m;
    let y=(height-m)-step*i;
    b+=bStep;
    fill(b);
    rect(x, y, step, step*i);
  }
}
