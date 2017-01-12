var d = 25;
var ships = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 150);
    ships.push(new Ship(width/2, height/2, 3, -2))
}

function draw() {
    fill(255);
    strokeWeight(2);
    stroke(170);
    rect(d, d, width - d*2, height - d*2);

    for (var i = 0; i < ships.length; i++) {
        ships[i].boundaries();
        ships[i].update();
        ships[i].show();
    }

}

function mousePressed() {
    ships.push(new Ship(mouseX, mouseY, random(-5, 5), random(-5, 5)));
}

function Ship(x, y, vx, vy) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.vel.mult(5);
    this.acc = createVector();
    this.maxSpeed = 4;
    this.maxForce = 0.1;
}

Ship.prototype.boundaries = function () {
    var desired = null;

    if (this.pos.x > width - d*2) {
        desired = createVector(- this.maxSpeed, this.vel.y);
    }

    if (this.pos.x < d*2) {
        desired = createVector(this.maxSpeed, this.vel.y);
    }

    if (this.pos.y < d*2) {
        desired = createVector(this.vel.x, this.maxSpeed);
    }

    if (this.pos.y > height - d*2) {
        desired = createVector(this.vel.x, -this.maxSpeed);
    }

    if (desired) {
        var steer = desired.sub(this.vel);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }
}

Ship.prototype.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

Ship.prototype.applyForce = function (force) {
    this.acc.add(force);
}

Ship.prototype.show = function() {
    var theta = this.vel.heading() + radians(90);
    var r = 7;
    fill(175);
    stroke(0);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(theta);
    beginShape(TRIANGLES);
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape();
    pop();
}
