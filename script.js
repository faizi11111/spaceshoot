const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ravens = [];
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;

const planes = ["ac1.png", "ac2.png", "ac3.png", "ac4.png", "ac5.png"];

class Raven {
  constructor() {
    this.spriteHeight = 200;

    this.spriteWidth = 200;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDelete = false;
    this.image = new Image();
    this.image.src = planes[Math.floor(Math.random() * planes.length)];
  }

  update() {
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = -this.directionY;
      this.y += this.directionY;
    }
    if (this.x < 0 - this.width) this.markedForDelete = true;
  }

  draw() {
    console.log(this.x, this.y);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

function drawScore() {
  ctx.fillStyle = "pink";
  ctx.font = `40px Verdana`;
  ctx.fillText("Score: " + score, 50, 75);
  ctx.fillStyle = "red";
  ctx.fillText("Score: " + score, 52, 77);
}

const raven = new Raven();

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
  }
  drawScore();
  [...ravens].forEach((raven) => raven.update());
  [...ravens].forEach((raven) => raven.draw());
  ravens = ravens.filter((raven) => !raven.markedForDelete);
  requestAnimationFrame(animate);
}

animate(0);
