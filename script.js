const exploreBtn =
document.getElementById('exploreBtn');

exploreBtn.addEventListener('click', () => {

  document
  .querySelector('#sobre')

  .scrollIntoView({

    behavior:'smooth'

  });

});

function animateCounter(id, target){

  const element =
  document.getElementById(id);

  let count = 0;

  const interval = setInterval(() => {

    count++;

    element.textContent =
    count + '%';

    if(count >= target){

      clearInterval(interval);

    }

  },30);

}

const observer =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      animateCounter('counter1',75);
      animateCounter('counter2',90);
      animateCounter('counter3',100);

    }

  });

});

observer.observe(
document.querySelector('.future-section')
);

const cards =
document.querySelectorAll(
'.info-box, .impact-card, .timeline-content, .project-card'
);

cards.forEach(card => {

  card.addEventListener('mousemove', (e) => {

    const rect =
    card.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    card.style.background = `

      radial-gradient(
      circle at ${x}px ${y}px,

      rgba(255,255,255,0.14),

      rgba(255,255,255,0.05))

    `;

  });

  card.addEventListener('mouseleave', () => {

    card.style.background =
    'rgba(255,255,255,0.05)';

  });

});

document.addEventListener('mousemove', (e) => {

  const planet =
  document.querySelector('.planet');

  const x =
  (window.innerWidth / 2 - e.pageX) / 40;

  const y =
  (window.innerHeight / 2 - e.pageY) / 40;

  planet.style.transform =

  `translate(-50%, -50%)
   rotateY(${x}deg)
   rotateX(${y}deg)`;

});

window.addEventListener('scroll', () => {

  const scroll =
  window.scrollY;

  document
  .querySelector('.planet-area')

  .style.transform =

  `translateY(${scroll * 0.08}px)`;

});

const floatingCards =
document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {

  card.style.animationDelay =
  `${index * 0.7}s`;

});
const modal =
document.getElementById('modal');

const modalTitle =
document.getElementById('modalTitle');

const modalText =
document.getElementById('modalText');

const closeBtn =
document.querySelector('.close-btn');

const projectCards =
document.querySelectorAll('.project-card');

projectCards.forEach(card => {

  card.addEventListener('click', () => {

    modalTitle.textContent =
    card.dataset.title;

    modalText.textContent =
    card.dataset.text;

    modal.classList.add('active');

  });

});

closeBtn.addEventListener('click', () => {

  modal.classList.remove('active');

});

window.addEventListener('click', (e) => {

  if(e.target === modal){

    modal.classList.remove('active');

  }

});

const canvas =
document.getElementById('space');

const ctx =
canvas.getContext('2d');

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

let particles = [];

const mouse = {
  x:null,
  y:null
};

window.addEventListener('mousemove', (e) => {

  mouse.x = e.x;
  mouse.y = e.y;

});

window.addEventListener('resize', () => {

  canvas.width =
  window.innerWidth;

  canvas.height =
  window.innerHeight;

});

class Particle{

  constructor(){

    this.x =
    Math.random() * canvas.width;

    this.y =
    Math.random() * canvas.height;

    this.size =
    Math.random() * 2;

    this.speedX =
    (Math.random() - 0.5) * 0.3;

    this.speedY =
    (Math.random() - 0.5) * 0.3;
  }

  update(){

    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < 0 ||
       this.x > canvas.width){

      this.speedX *= -1;

    }

    if(this.y < 0 ||
       this.y > canvas.height){

      this.speedY *= -1;

    }

    const dx =
    mouse.x - this.x;

    const dy =
    mouse.y - this.y;

    const distance =
    Math.sqrt(dx * dx + dy * dy);

    if(distance < 120){

      this.x -= dx / 35;
      this.y -= dy / 35;
    }

  }

  draw(){

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
    'rgba(0,255,213,0.8)';

    ctx.fill();

  }

}

function initParticles(){

  particles = [];

  for(let i = 0; i < 140; i++){

    particles.push(
      new Particle()
    );

  }

}

function connectParticles(){

  for(let a = 0;
      a < particles.length;
      a++){

    for(let b = a;
        b < particles.length;
        b++){

      const dx =
      particles[a].x -
      particles[b].x;

      const dy =
      particles[a].y -
      particles[b].y;

      const distance =
      dx * dx + dy * dy;

      if(distance < 12000){

        ctx.beginPath();

        ctx.strokeStyle =
        'rgba(0,255,213,0.08)';

        ctx.lineWidth = 1;

        ctx.moveTo(
          particles[a].x,
          particles[a].y
        );

        ctx.lineTo(
          particles[b].x,
          particles[b].y
        );

        ctx.stroke();

      }

    }

  }

}

//function shootingStar(){

//  const x =
  //Math.random() * canvas.width;

  //const y =
  //Math.random() * canvas.height / 2;

  //let length = 0;

  //function animateStar(){

   // ctx.beginPath();

    //ctx.moveTo(x + length, y);

//    ctx.lineTo(
  //    x + length - 120,
//      y + 40
//    );

//    ctx.strokeStyle =
//    'rgba(255,255,255,0.7)';

//    ctx.lineWidth = 2;

//    ctx.stroke();

//    length += 15;

//    if(length < 400){

//      requestAnimationFrame(
//        animateStar
//      );

 //   }

 // }

//  animateStar();

//}

//setInterval(() => {

//  shootingStar();

//}, 4000);

function animate(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(particle => {

    particle.update();
    particle.draw();

  });

  connectParticles();

  requestAnimationFrame(
    animate
  );

}

initParticles();
animate();
