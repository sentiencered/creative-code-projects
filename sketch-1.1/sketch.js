function setup() {
  createCanvas(700, 700);
  background(255, 0, 0);
}

function draw() {
  //clear();
  
  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let size = map(mouseX*mouseY, 0, width*height, 10, 100);
  
  fill(r, g, 100);
  noStroke();
  ellipse(mouseX, mouseY, size, size);
  
  textSize(30);
  fill(255);
  //text(mouseX, mouseX, mouseY);
  
}