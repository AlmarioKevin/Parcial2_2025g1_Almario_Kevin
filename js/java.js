document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const body = document.body;

    body.classList.add('hide-content');

    setTimeout(() => {
        introScreen.classList.add('fade-out');

        introScreen.addEventListener('transitionend', () => {
            introScreen.style.display = 'none'; 
            body.classList.remove('hide-content'); 
        }, { once: true });

    }, 1000); 
});



document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('Home');
    const heroContent = document.querySelector('.hero-content');
    const serviceSections = document.querySelectorAll('.card-servicio');
    const servicesTitle = document.getElementById('services-title');

    const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroContent.classList.add('animate');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.5 
    });

    if (homeSection) {
        textObserver.observe(homeSection);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                servicesTitle.classList.add('animate__fadeInDown');
                titleObserver.disconnect();
            }
        });
    }, { threshold: 0.1 });

    if (servicesTitle) {
        titleObserver.observe(servicesTitle);
    }

    const observerCards = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeInUp');
                observerCards.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceSections.forEach(section => {
        observerCards.observe(section);
    });
});






document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const portafolioSection = document.getElementById('portafolio');
    let currentIndex = 0;
    let observer;

    const updateCarousel = () => {
        projectCards.forEach(card => {
            card.classList.remove('active', 'prev', 'next');
        });

        const totalCards = projectCards.length;
        const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        const nextIndex = (currentIndex + 1) % totalCards;

        projectCards[currentIndex].classList.add('active');
        projectCards[prevIndex].classList.add('prev');
        projectCards[nextIndex].classList.add('next');
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCarousel();
                observer.unobserve(entry.target);
            }
        });
    };

    observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });

    if (portafolioSection) {
        observer.observe(portafolioSection);
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % projectCards.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
        updateCarousel();
    });

});




document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            successMessage.classList.remove('d-none');

            form.reset();
            form.classList.remove('was-validated');

            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 5000);
        }

        form.classList.add('was-validated');
    }, false);
});






const canvas = document.getElementById('distortionCanvas');
const ctx = canvas.getContext('2d');

let mouse = { x: undefined, y: undefined };
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 5;
        this.opacity = 1;
        this.color = 'rgba(255, 255, 255, 0.1)';
        this.velocity = {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1
        };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity -= 0.01;
        this.radius *= 0.98;
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'source-over';

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0.01 || particles[i].radius < 1) {
            particles.splice(i, 1);
            i--;
        }
    }
}
animate();






document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.getElementById("About-us");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animatedElements = document.querySelectorAll('.animate-on-scroll');

                animatedElements.forEach((element, index) => {
                    element.classList.add('animate__animated', element.dataset.animation);
                    element.style.animationDelay = `${index * 0.15}s`;
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05
    });

    observer.observe(aboutSection);
});





document.addEventListener("DOMContentLoaded", function () {
    const services = document.querySelectorAll('.card-servicio-container');
    const navItems = document.querySelectorAll('.nav-servicios .nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;

                navItems.forEach(item => {
                    item.classList.remove('active');
                });

                const activeNavItem = document.querySelector(`.nav-servicios .nav-item[data-target="#${targetId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    }, observerOptions);

    services.forEach(service => {
        observer.observe(service);
    });
});