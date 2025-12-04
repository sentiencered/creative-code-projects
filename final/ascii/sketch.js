//export variables:
const DPI = 96; // 96 dots per inch
const PAPER_WIDTH = 7; // width in inches
const PAPER_HEIGHT = 7; // height in inches
let FILENAME;

p5.disableFriendlyErrors = true; // hush, p5
let bDoExportSvg = false; // set to true when you want to plot

//import variable:
let input;
let img;
let textInput;
// let addY = 15;
let addY = 35;
let addX = 15;

//ascii variables:
// const dens = '@%#&$N9K530V=+?!;:,. '
const dens = '@%#&$9K503V=+?!;:,. '
const len = dens.length;
let font;

let w;
let h;

//adjustable variables:
let s = .5; //font size
let sliderS;
let n = 0; //noise value/'mistakes'
let sliderN;
let m = 10; //draw margin
let sliderM;

let l1;
let l2;
let l3;
let l4;
let l5;
let button;

function preload() {
  //for local images only:
  img = loadImage("images/gradient.jpg");
  // img = loadImage("images/linGrad.jpg");
}

function setup() {
  // createCanvas(600, 600); //canvas for viewing
  createCanvas(PAPER_WIDTH * DPI, PAPER_HEIGHT * DPI); //canvas for exporting, based on paper size (inches)

  let t = createP('IMAGE TO ASCII');
  t.position(width+addX, addY*2);

  let des = createP('plottable ascii image converter: choose an image to upload, click the mouse to update the converter');
  des.position(width+addX, addY*3);

  let req = createP('upload file recommendations: high contrast, low resolution square image (50-200px is best)');
  req.position(width+addX, addY*4);

  let dir = createP('INSTRUCTIONS: <br> 1. choose an image to upload <br> 2. adjust the settings as desired <br> 3. enter a file name (otherwise will default to "asciiPlot") <br> 4. press "EXPORT" or hit the space bar to save as an .svg');
  dir.position(width+addX, addY*13);
  
  input = createFileInput(handleImage);
  input.position(width+addX, addY*7);
  
  textInput = createInput();
  textInput.position(width+addX, addY*11);

  l1 = createP('.svg << file name');
  l1.position(width+(addX*11), addY*10.55);
  
  sliderS = createSlider(.1, 2, .5, .1);
  sliderS.position(width+addX, addY*9);
  sliderS.size(100);

  l2 = createP(sliderS.value() + ' << text size (.1-2)');
  l2.position(width+(addX*8), addY*8.55);
  
  sliderN = createSlider(0, 2, 0, .1);
  sliderN.position(width+addX, addY*10);
  sliderN.size(100);

  l3 = createP(sliderN.value() + ' << noise level (0-2)');
  l3.position(width+(addX*8), addY*9.55);
  
  sliderM = createSlider(0, 50, 10, 2);
  sliderM.position(width+addX, addY*8);
  sliderM.size(100);

  l4 = createP(sliderM.value() + ' << margin size (0-50)');
  l4.position(width+(addX*8), addY*7.55);

  button = createButton('EXPORT');
  button.position(width+addX, addY*12);
  button.mousePressed(exportFile);

  l5 = createP('(or press "space")')
  l5.position(width+(addX*7), addY*11.55);
  
  background(255);

  //slider updating:
  sliderS.input(() => {
    s = sliderS.value();
    l2.html(s + ' << text size (.1-2)');
    draw();
  });

  sliderN.input(() => {
    n = sliderN.value();
    l3.html(n + ' << noise level (0-2)');
    draw();
  });

  sliderM.input(() => {
    m = sliderM.value();
    l4.html(m + ' << margin size (0-50)');
    draw();
  });
  
}

function draw(){
  noLoop();
  noFill();

  if(textInput.value() != ''){
    FILENAME = textInput.value();
  }
  else{
    FILENAME = 'asciiPlot';
  }
  
  if (bDoExportSvg) {
    beginRecordSVG(this, FILENAME + ".svg");
  }

  drawSomething();

  if (bDoExportSvg) {
    endRecordSVG();
    bDoExportSvg = false;
  }
}

function drawSomething() {
  background(255);
  
  // image(img, m/2, m/2, width - m, height - m)4
  
  w = (width-m)/img.width; //pixel step width
  h = (height-m)/img.height; //pixel step height
  img.loadPixels();
  
  for(let i = 0; i < img.width; i++){
    for(let j = 0; j < img.height; j++){
      const pixInd = (i + j * img.width) * 4;
      const r = img.pixels[pixInd + 0];
      const g = img.pixels[pixInd + 1];
      const b = img.pixels[pixInd + 2];
      const avg = (r + g + b)/3;
      
      push();
      
      const charInd = floor(map(avg, 0, 255, 0, len));
      let char = dens.charAt(charInd);
      
      //fill(0);
      stroke(0);
      textSize(w); //-w for less contrast
      
      //position and write text:
      translate(m/2 + i*w + w*.5, m/2 + j*h + h*.5);
      scale(s);

      P5.hershey.putText(char, {
	    cmap:  FONT_HERSHEY.PLAIN,
	    align: "center",
	    noise: n,
      });
      // FONT_HERSHEY.GOTHIC_GERMAN_TRIPLEX
      // FONT_HERSHEY.PLAIN
      
      pop();
    }
  }
}

function handleImage(file) {
  if (file.type === 'image') {
    const url = URL.createObjectURL(file.file);
    loadImage(url, loadedImg => {
      img = loadedImg;
      img.loadPixels();
    });
  } else {
    img = null;
  }
}

function exportFile(){
  bDoExportSvg = true;
  draw();
}

function keyPressed(){
  if(key == " "){
    bDoExportSvg = true;
    draw();
  }
}

function mouseClicked(){
  draw();
}