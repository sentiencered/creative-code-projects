console.log("hello")
function setup(){
    createCanvas(windowWidth, windowHeight)
}

function draw(){
    background(220)
    ellipse(mouseX, mouseY, 20, 20)
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}