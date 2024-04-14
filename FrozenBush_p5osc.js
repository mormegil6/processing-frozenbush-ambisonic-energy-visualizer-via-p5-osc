var windowSizeOffset = 5; // sometimes full-screen canvas is still slightly bigger than browser's window - so here the canvas can be reduced by a number of pixels - I just don't like to have the scroll bars around the animation window..
var pixdens = 1;
var webgl = 1;
let scalePreview = 1;

var allParticles = [];
var maxLevel = 5;
var useFill = false;

function setup() {
  setupOsc(12001, 3334);
  if (webgl == 0) {createCanvas(windowWidth-windowSizeOffset, windowHeight-windowSizeOffset); // normal
  } else if (webgl == 1) {createCanvas(windowWidth-windowSizeOffset, windowHeight-windowSizeOffset, WEBGL); // WEBGL
  }
  pixelDensity(pixdens);
  
  let canvas = document.getElementById('defaultCanvas0');
  canvas.style.width = round(width * scalePreview) + "px";
  canvas.style.height = round(height * scalePreview) + "px";
  
  canvas.oncontextmenu = () => false;  // Removes right-click menu.
  noCursor();
  
  //colorMode(HSB, 360); // original
  colorMode(HSB, 360, 360, 360, 1); // modified
} 

function draw() {
  background(0);
  // Create fade effect.
  noStroke();
  fill(0, 30);
  if (webgl == 0) {
    rect(0, 0, width, height); //normal
  } else {
    rect(-width/2, -height/2, width, height); 
  }
  
  drawDots();
  console.log(frameRate());
  
  // Move and spawn particles.
  // Remove any that is below the velocity threshold.
  for (var i = allParticles.length-1; i > -1; i--) {
    allParticles[i].move();
    
    if (allParticles[i].vel.mag() < 0.88) { // how fast they disappear / how long they stay
      allParticles.splice(i, 1); // original
    }
  }
  
  if (allParticles.length > 0) {
    // Run script to get points to create triangles with.
    data = Delaunay.triangulate(allParticles.map(function(pt) {
      return [pt.pos.x, pt.pos.y];
    }));
    
    strokeWeight(2.7); // how visible are triangles (?)
    
    // Display triangles individually.
    for (var j = 0; j < data.length; j += 3) {
      // Collect particles that make this triangle.
      var p1 = allParticles[data[j]];
      var p2 = allParticles[data[j+1]];
      var p3 = allParticles[data[j+2]];
      
      // Don't draw triangle if its area is too big.
      var distThresh = 66; // how far they spread (?) / how far they connect
      
      if (dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y) > distThresh) {
        continue;
      }
      if (dist(p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue;
      }
      if (dist(p1.pos.x, p1.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue;
      }
      // Base its hue by the particle's life.
      if (useFill) {
        noStroke();
        fill(165+p1.life*1.5, 360, 360);
      } else {
        noFill();
        colorMode(HSB);
        let c1 = color(`hsba(170, 100%, 100%, 1.00)`);
        let c2 = color(`hsba(270, 100%, 100%, 1.00)`);
        let c3 = lerpColor(c1, c2, p1.level*0.33*(-1));
        stroke(c3);
        //stroke(165+p1.life*1.5, 360, 360); //original
      }
      triangle(p1.pos.x, p1.pos.y, 
               p2.pos.x, p2.pos.y, 
               p3.pos.x, p3.pos.y);
    }
  }
}

function mousePressed() {
  if (mouseButton == RIGHT) {
    useFill = ! useFill;
  }
}

// Moves to a random direction and comes to a stop.
// Spawns other particles within its lifetime.
function Particle(x, y, level) {
  this.level = level;
  this.life = 0;
  
  this.pos = new p5.Vector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.mult(map(this.level, 0, maxLevel, 6, 1)); //orig 5, 2 //how far they spread
  //this.vel.mult(map(this.level, 0, maxLevel, 4.1, 0.005));
  
  this.move = function() {
    this.life++;
    // Add friction.
    this.vel.mult(0.95); //0.86?
    this.pos.add(this.vel);
    // Spawn a new particle if conditions are met.
    if (this.life % 10 == 0) {
      if (this.level > 0) {
        this.level -= 2;
        var newParticle = new Particle(this.pos.x, this.pos.y, this.level-2);
        allParticles.push(newParticle);
      }
    }
  }
}
