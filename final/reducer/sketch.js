let img;
let pix = 75;
let w;
let h;
let input;
let textInput;
let sliderW;
let isUploaded = false;
let isReduced = false;
let p;
let p2;
let p3;
let button;
let button2;
let addX = 15;
let isTall = false;

function preload(){
  img = loadImage("upload.jpg");
}

function setup() {
  createCanvas(600, 600);
  background(220);
  
  input = createFileInput(handleImage);
  input.position(width+10, 65);
  
  p = createP('IMAGE REDUCER/PIXELATOR:');
  p.position(width+addX, 10);
  
  p2 = createP('pixels (5-300): ' + pix);
  p2.position(width+addX, 110);
  
  sliderW = createSlider(5, 300, 75, 1);
  sliderW.position(width+addX, 150);
  sliderW.size(200);
  
  image(img, 0, 0, width, height);
  
  button = createButton('REDUCE');
  button.position(width+addX, 200);
  button.mousePressed(reduce);
  
  p3 = createP('');
  p3.position(width+addX+90, 185);
  
  textInput = createInput();
  textInput.position(width+addX, 250);
  
  let p5 = createP('.png << file name');
  p5.position(width+addX+150, 235);
  
  button2 = createButton('EXPORT');
  button2.position(width+addX, 300);
  button2.mousePressed(exportReduced);
  
  let p4 = createP('INSTRUCTIONS: <br> 1. choose an image to reduce <br> 2. adjust pixel slider to desired width and press "REDUCE" <br> 3. enter file name (otherwise will default to "pixelated") <br> 4. press "EXPORT" to save image as a .png');
  p4.position(width+addX, 350);

  //slider updating:
  sliderW.input(() => {
    pix = sliderW.value();
    p2.html('pixels (5-300): ' + pix);
    draw();
  });
}

function draw() {
  if(isUploaded && !isReduced){
    // image(img, 0, 0, img.width, img.height);
    if(img.width >= img.height){
      isTall = false;
      let r = img.height/img.width;
      image(img, 0, 0, width, r*height);
    }
    else{
      isTall = true;
      let r = img.width/img.height;
      image(img, 0, 0, r*width, height);
    }
  }
  
  if(isReduced){
    p3.html('warning: image already reduced (increasing pixels will not restore detail)');
  }
}

function exportReduced(){
  if(textInput.value() != ''){
    img.save(textInput.value());
  }
  else{
    img.save('pixelated');
  }
}

function reduce(){
  background(220);
  isReduced = true;
  
  img.resize(pix, 0);
  img.loadPixels();
  
  // image(img, 0, 0, img.width, img.height);
  
  if(isTall == true){
    h = height/img.height;
    w = h;
  }
  else{
    w = width/img.width; //pixel step width
    h = w;
  }
  
  for(let i = 0; i < img.width; i++){
    for(let j = 0; j < img.height; j++){
      const pixInd = (i + j * img.width) * 4;
      const r = img.pixels[pixInd + 0];
      const g = img.pixels[pixInd + 1];
      const b = img.pixels[pixInd + 2];
      const avg = (r + g + b)/3;

      push();
      
      noStroke();
      fill(avg);
      // square(i * w, j * h, w); //bw pixelated image
      rect(i * w, j * h, w, h);
      pop();
    }
  }
}

function handleImage(file) {
  if (file.type === 'image') {
    const url = URL.createObjectURL(file.file);
    loadImage(url, loadedImg => {
      img = loadedImg;
      clear();
      img.loadPixels();
    });
    isUploaded = true;
    isReduced = false;
  } else {
    img = null;
  }
}