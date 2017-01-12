var ship;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 120);
    ship = new Ship(createVector(width / 2, height / 2));
}

function draw() {
    var mouse = createVector(mouseX, mouseY);
    background(255);
    fill(170);
    strokeWeight(2);
    ellipse(mouse.x, mouse.y, 48, 48);

    ship.seek(mouse);
    ship.update();
    ship.drawShip();
}

function Ship(position) {
    this.pos = position;
    this.acc = createVector();
    this.vel = createVector();
    this.maxSpeed = 4;
    this.maxForce = 0.1;
}

Ship.prototype.addForce = function (force) {
    this.acc.add(force);
}

Ship.prototype.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

Ship.prototype.seek = function (target) {
    // calculate our desired direction
    var desiredDir = target.sub(this.pos);
    desiredDir.setMag(this.maxSpeed);

    // steer = desired - velocity
    var steer = desiredDir.sub(this.vel);
    // limit force on turning
    steer.limit(this.maxForce);

    this.addForce(steer);
}

Ship.prototype.drawShip = function () {
    var theta = this.vel.heading() + radians(90);
    var r = 10;
    fill(175);
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape(TRIANGLES);
    vertex(0, -r * 2);
    vertex(-r, r * 2);
    vertex(r, r * 2);
    endShape();
    pop();
}