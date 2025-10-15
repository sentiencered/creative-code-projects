let entities = [];
let numEntities; //ratio based on canvas
let maxEntities; //ratio based on canvas

let spots = [];
let numSpots; //ratio based on canvas

let faceOff = false;
let chanceKill;
let gameMode;

//behavior:
let combatChance = 1;
let standardChance = .45;
let subsidizedChance = 0;
let timer = 60; //postpartum timer (ms)

//apperance:
let startSize = 25;
let growth = .01;
let maxSize = 50;
let eyes = false;
let marginX = 300;
let marginY = 200;

let font;

function preload() {
  font = loadFont('RobotoMono-Regular.ttf');
}

function setup() {
  createCanvas((windowWidth - marginX), (windowHeight - marginY));
  // createCanvas(500, 500);
  colorMode(HSB);
  // textFont("Roboto Mono");
  textFont(font);
  
  numEntities = floor((width*height)/25000);
  // numEntities = 3;
  numSpots = floor((width*height)/50000);
  maxEntities = floor((width*height)/5000);
  
  for(let i=0; i<numEntities; i++){
    let e = new Entity();
    entities.push(e);
  }
  
  for(let i=0; i<numSpots; i++){
    let sp = new Spot();
    spots.push(sp);
  }
  
}

function draw() {
  background(0);
  
  for(let i=0; i<spots.length; i++){
    let sp = spots[i];
    sp.update();
    sp.draw();
  }
  
  for(let i=0; i<entities.length; i++){
    let e = entities[i];
    e.update();
    e.draw();
  }
  
  //charging:
  checkLightCol();
  
  //interactions:
  checkFaceOff();
  
  //entities regulation:
  if(entities.length >= maxEntities){
    chanceKill = combatChance;
    // console.log("combat mode");
    gameMode = "combat mode";
  }
  else if(entities.length <= numEntities){
    chanceKill = subsidizedChance;
    // console.log("subsidized childcare mode");
    gameMode = "subsidized childcare mode";
  }
  else if(entities.length > (numEntities + numEntities/2) && entities.length < (maxEntities - maxEntities/2)){
    chanceKill = standardChance;
    // console.log("normal mode");
    gameMode = "standard mode";
  }
  
  // console.log(entities.length);
  noStroke();
  text(gameMode, 30, 30);
}


function checkLightCol() {
  for(let i=0; i<entities.length; i++){
    let e = entities[i];
    let eD = e.size/2;
    for(let j=0; j<spots.length; j++){
      let sp = spots[j];
      let spD = sp.size/2;
      
      if(dist(e.pos.x, e.pos.y, sp.pos.x, sp.pos.y)<(eD+spD)){
        e.isCharging = true;
      }
    }
  }
}

function checkFaceOff(){
  for(let i=0; i<entities.length; i++){
    let e1 = entities[i];
    let e1D = e1.size/2;
    for(let j=i+1; j<entities.length; j++){
      let e2 = entities[j];
      let e2D = e2.size/2;
      
      if(dist(e1.pos.x, e1.pos.y, e2.pos.x, e2.pos.y)<(e1D+e2D)){
        faceOff = true;
        // console.log("faceOff");
        if(e1.birthing == false && e2.birthing == false){
          interact(e1, e2, i, j);
          e1.birthing = true;
          e2.birthing = true;
        }
      }
    }
  }
}

function interact(one, two, oneInd, twoInd){
  //runs if faceOff = true
  let e1 = one;
  let e2 = two;
  let i = oneInd;
  let j = twoInd;
  let col1 = e1.col;
  let col2 = e2.col;
  // chanceKill = .4;
  let chance = random();
  
  if(chance <= chanceKill){
    //kill
    if(e1.s >= e2.s){
      strokeWeight(3);
      e1.outline = e2.col;
      e2.alive = false;
      // console.log("removed e2");
    }
    else if(e2.s > e1.s){
      strokeWeight(3);
      e2.outline = e1.col;
      e1.alive = false;
      // console.log("removed e1");
    }
  }
  else{
    //mate
    let col3 = lerpColor(col1, col2, .5);
    let newPos = p5.Vector.lerp(e1.pos, e2.pos, .5);
    entities.push(new Entity(col3, newPos));
    e1.birthTime = frameCount;
    e2.birthTime = frameCount;
  }
  
  //kill if dead
  if(e1.alive == false){
    entities.splice(i, 1);
  }
  if(e2.alive == false){
    entities.splice(j, 1);
  }
  faceOff = false;
}

function windowResized(){
  resizeCanvas((windowWidth - marginX), (windowHeight - marginY));

  numEntities = floor((width*height)/25000);
  numSpots = floor((width*height)/50000);
  maxEntities = floor((width*height)/5000);

  //delete things off canvas
  for(let i=entities.length-1; i>=0; i--){
    let e = entities[i];
    if(e.pos.x < 0 || e.pos.x > width || e.pos.y < 0 || e.pos.y > height){
      entities.splice(i, 1);
    }
  }

  for(let i=spots.length-1; i>=0; i--){
    let s = spots[i];
    if(s.pos.x < 0 || s.pos.x > width || s.pos.y < 0 || s.pos.y > height){
      spots.splice(i, 1);
    }
  }
  
  //adjust array lengths
  if(entities.length < numEntities){
    for(let i=0; i<(numEntities - entities.length); i++){
      let e = new Entity();
      entities.push(e);
    }
  }
  else if(entities.length >= maxEntities){
    for(let i=entities.length; i<maxEntities; i--){
      entities.splice(i, 1);
    }
  }

  if(spots.length < numSpots){
    for(let i=0; i<(numSpots - spots.length); i++){
      let s = new Spot();
      spots.push(s);
    }
  }
  else if(spots.length > numSpots){
    for(let i=spots.length; i<numSpots; i--){
      entities.splice(i, 1);
    }
  }

  if(entities.length >= maxEntities){
    chanceKill = 1;
    // console.log("combat mode");
    gameMode = "combat mode";
  }
  else if(entities.length <= numEntities){
    chanceKill = 0;
    // console.log("subsidized childcare mode");
    gameMode = "subsidized childcare mode";
  }
  else if(entities.length > (numEntities + numEntities/2) && entities.length < (maxEntities - maxEntities/2)){
    chanceKill = .45;
    // console.log("normal mode");
    gameMode = "standard mode";
  }
}

function keyPressed(){
  if(key === ' '){
    eyes = !eyes;
  }
}

class Entity {
  constructor(newCol, newPos){
    this.size = startSize;
    this.pos = newPos;
    if(typeof this.pos !== 'undefined'){
      //newPos found
    }
    else{
      this.pos = createVector(random(this.size/2, width-(this.size/2)), random(this.size/2, height-(this.size/2)));
    }
    
    this.col = newCol;
    if(typeof this.col !== 'undefined'){
      //newCol found
    }
    else{
      this.col = color(random(360), random(50, 100), 100, .5); //HSB
      // this.col = color(random(255), random(255), random(255), 150); //RGB
    }
    
    this.eyeSize = this.size/3;
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(); //make path nonlinear
    this.s = 1; //strength
    this.maxV = 1.5;
    this.isCharging = false;
    this.alive = true;
    this.birthing = false;
    this.cooldown = timer;
    this.birthTime = 0;
    this.outline = this.col;
    
    this.eyeCol = 0;
  }
  
  update(){
    this.acc = createVector(random(-1, 1), random(-1, 1));
    this.acc.mult(.07);
    this.vel.add(this.acc);
    this.vel.limit(this.maxV);
    this.pos.add(this.vel);
    this.checkWalls();
    // this.s += .5; //increase strength with time
    
    if(this.isCharging == true){
      this.isCharging = false;
      this.s+=growth;
      
      this.eyeCol = 200;
      
      if(this.size < maxSize){
        this.size+=growth;
      }
      else{
        this.size+=growth/2;
      }
    }
    else{
      this.eyeCol = 0;
    }
    
    if(this.birthing == true && (frameCount > (this.birthTime + this.cooldown))){
      this.birthing = false;
    }
  }
  
  draw(){
    if(this.col == this.outline){
      noStroke();
    }
    else{
      stroke(this.outline);
    }
    fill(this.col);
    circle(this.pos.x, this.pos.y, this.size);

    if(eyes == true){
      //eye:
      noStroke();
      this.eyeSize = this.size/3;

      fill(this.eyeCol);
      ellipse(this.pos.x, this.pos.y, this.eyeSize*1.5, this.eyeSize);

      fill(this.col);
      circle(this.pos.x, this.pos.y, this.eyeSize);
    }
  }
  
  checkWalls(){
    if(this.pos.x < this.size/2){
      this.vel.x *= -2;
    }
    if(this.pos.x > width-this.size/2){
      this.vel.x *= -2;
    }
    if(this.pos.y < this.size/2){
      this.vel.y *= -2;
    }
    if(this.pos.y > height-this.size/2){
      this.vel.y *= -2;
    }
  }
}

class Spot {
  constructor(){
    this.size = random(70, 100);
    // this.size = 75;
    this.pos = createVector(random(this.size/2, width-(this.size/2)), random(this.size/2, height-(this.size/2)));
    // this.alp = 255; //RGB
    this.alp = 1; //HSB
    this.col = color(255);
    this.vel = createVector(random(-.5, .5), random(-.5, .5));
    this.lays = 5; //number of layers for spotlight
  }
  
  //calculations for spot posiiton:
  update(){
    this.pos.add(this.vel);
    this.checkWalls();
  }
  
  draw(){
    noStroke();
    for(let i=0; i<this.lays; i++){
      // this.alp = i*(255/this.lays); //RGB
      this.alp = i*(1/this.lays); //HSB
      this.col.setAlpha(this.alp);
      fill(this.col);
      circle(this.pos.x, this.pos.y, this.size - (i*7));
    }
  }
  
  checkWalls(){
    if(this.pos.x < this.size/2){
      this.vel.x *= -1;
    }
    if(this.pos.x > width-this.size/2){
      this.vel.x *= -1;
    }
    if(this.pos.y < this.size/2){
      this.vel.y *= -1;
    }
    if(this.pos.y > height-this.size/2){
      this.vel.y *= -1;
    }
  }
}