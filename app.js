const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleCount = 15;
const radius = Math.min(canvas.width, canvas.height) / 2;
const maxSpeed = 1;
const minSpeed = 1;
const colors = ['rgba(255, 255, 255, 1)'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        const dx = this.x - canvas.width / 2;
        const dy = this.y - canvas.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const direction = Math.atan2(dy, dx);
      
        this.x += Math.cos(direction) * this.speed;
        this.y += Math.sin(direction) * this.speed;
      
        if (distance > radius) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const particles = [];

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
