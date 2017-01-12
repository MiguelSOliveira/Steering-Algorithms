var ship;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 150);
    ship = new Ship(width, height/2);
}

function draw() {
  background(0);
  var mouse = createVector(mouseX, mouseY);
  fill(170);
  ellipse(mouse.x, mouse.y, 48, 48);

  ship.arrive(mouse);
  ship.update();
  ship.show();
}

function Ship(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 4;
    this.maxForce = 0.1;
}

Ship.prototype.applyForce = function (force) {
    this.acc.add(force);
}

Ship.prototype.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

Ship.prototype.arrive = function (target) {
    // same as seek but decrease magnitude as it gets to the target
    var desired = target.sub(this.pos);
    var curMag = desired.mag();
    if (curMag < 100) {
        var newMag = map(curMag, 0, 100, 0, this.maxSpeed);
        desired.setMag(newMag);
    } else {
        desired.setMag(this.maxSpeed);
    }

    var steer = desired.sub(this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
}

Ship.prototype.show = function() {
    var theta = this.vel.heading() + radians(90);
    var r = 4.5;
    fill(175);
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape(TRIANGLES);
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape();
    pop();
}
