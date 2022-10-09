// Initial Setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const canvas2 = document.getElementById("canvas2");
const c2 = canvas2.getContext("2d");

canvas2.width = innerWidth;
canvas2.height = innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;


const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Event Listeners
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Utility Functions
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Particle(x, y, radius, color, xOssze, yOssze, forgSzog, startRadian) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.radians = startRadian;
  this.velocity = 0.05;

  this.distanceFromCenter = 180;
  this.currentCenter = { x: x, y: y };

  this.xOssze = xOssze;
  this.yOssze = yOssze;
  this.forgSzog = forgSzog;

  this.update = () => {
    const lastPoint = { x: this.x, y: this.y };

    this.radians += this.velocity;

    const xkoo = Math.cos(this.radians) * this.distanceFromCenter * xOssze;
    const ykoo = Math.sin(this.radians) * this.distanceFromCenter * yOssze;

    const xkootr =
      xkoo * Math.cos(this.forgSzog) - ykoo * Math.sin(this.forgSzog);
    const ykootr =
      xkoo * Math.sin(this.forgSzog) + ykoo * Math.cos(this.forgSzog);

    this.x = this.currentCenter.x + xkootr;
    this.y = this.currentCenter.y + ykootr;
    this.draw(lastPoint);
  };

  this.draw = (lastPoint) => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };
}

const colors = ["#FFC300", "#780000", "#088eff"];

// Implementation
let particles;
function init() {
  particles = [];
  particles.push(
    new Particle(
      canvas.width / 2,
      canvas.height / 2,
      3,
      colors[0],
      1,
      0.3,
      Math.PI / 6,
      0
    )
  );
  particles.push(
    new Particle(
      canvas.width / 2,
      canvas.height / 2,
      3,
      colors[1],
      1,
      0.3,
      -Math.PI / 6,
      Math.PI
    )
  );
  particles.push(
    new Particle(
      canvas.width / 2,
      canvas.height / 2,
      3,
      colors[2],
      1,
      0.3,
      Math.PI / 2,
      -Math.PI
    )
  );
  c2.clearRect(0, 0, canvas.width, canvas.height);
  c2.beginPath();
  c2.globalCompositeOperation = "destination-over";
  c2.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2, false);
  const gradient = c2.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    35
  );
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, "#088eff");
  c2.fillStyle = gradient;
  c2.fill();
  c2.closePath();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255, 255, 255, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particles) => {
    particles.update();
  });
}

init();
animate();
