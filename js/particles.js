/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function Particle() {
  this.x     = Math.random() * canvas.width;
  this.y     = Math.random() * canvas.height;
  this.vx    = (Math.random() - 0.5) * 0.3;
  this.vy    = (Math.random() - 0.5) * 0.3;
  this.size  = Math.random() * 1.5 + 0.5;
  this.alpha = Math.random() * 0.4 + 0.1;
  this.color = Math.random() > 0.5 ? '#6366F1' : '#22D3EE';
}
Particle.prototype.update = function() {
  this.x += this.vx; this.y += this.vy;
  if (this.x < 0)              this.x = canvas.width;
  if (this.x > canvas.width)   this.x = 0;
  if (this.y < 0)              this.y = canvas.height;
  if (this.y > canvas.height)  this.y = 0;
};
Particle.prototype.draw = function() {
  ctx.save();
  ctx.globalAlpha = this.alpha;
  ctx.fillStyle   = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 120) * 0.08;
        ctx.strokeStyle = '#6366F1';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animateParticles);
}
animateParticles();
