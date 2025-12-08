// ===================================
// SPACE WELDING & FABRICATION
// Interactive JavaScript Features
// ===================================

// === EMAILJS CONFIGURATION ===
// TODO: Replace these with your actual EmailJS credentials from https://www.emailjs.com/
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'Gjn0bPldrER-fshp-',      // Get from EmailJS Dashboard > Account > General
    SERVICE_ID: 'service_v5tmx2r',      // Get from EmailJS Dashboard > Email Services
    TEMPLATE_ID: 'template_rzbitfp'     // Get from EmailJS Dashboard > Email Templates
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
})();

// === STARFIELD ANIMATION ===
const canvas = document.getElementById('starfield');
if (!canvas) {
    console.error('Starfield canvas not found');
} else {
    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 800;
    let animationId;
    let galaxyOffset = 0;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (stars.length === 0) {
            initStars();
        }
    }

    // Draw galaxy swirls in background
    function drawGalaxy() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Rotating galaxy swirls (slowed down to match stars)
        galaxyOffset += 0.0002;

        // Multiple spiral arms
        for (let arm = 0; arm < 3; arm++) {
            const armAngle = (arm * Math.PI * 2 / 3) + galaxyOffset;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(armAngle);

            // Create spiral gradient
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, canvas.width * 0.8);
            gradient.addColorStop(0, 'rgba(60, 60, 100, 0.15)');
            gradient.addColorStop(0.3, 'rgba(40, 50, 80, 0.08)');
            gradient.addColorStop(0.6, 'rgba(20, 30, 60, 0.03)');
            gradient.addColorStop(1, 'rgba(10, 10, 30, 0)');

            // Draw spiral arm
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.ellipse(0, 0, canvas.width * 0.8, canvas.height * 0.3, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    // Star class - streak style
    class Star {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            // Random position in 3D space radiating from center
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * canvas.width;

            this.x = Math.cos(angle) * radius + canvas.width / 2;
            this.y = Math.sin(angle) * radius + canvas.height / 2;

            // Depth position
            if (initial) {
                this.z = Math.random() * canvas.width;
            } else {
                this.z = canvas.width;
            }

            this.prevX = this.x;
            this.prevY = this.y;

            // Random speed for variation (slowed down)
            this.speed = 0.2 + Math.random() * 0.6;

            // Star color - white or blue-white only
            if (Math.random() < 0.6) {
                this.color = { r: 255, g: 255, b: 255 }; // Pure white
            } else {
                this.color = { r: 180, g: 200, b: 255 }; // Blue-white
            }

            this.brightness = 0.7 + Math.random() * 0.3;
        }

        update() {
            this.prevX = this.x;
            this.prevY = this.y;

            // Move toward camera
            this.z -= this.speed;

            // Reset when passing camera
            if (this.z <= 1) {
                this.reset(false);
                return;
            }

            // 3D projection
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            const scale = 250 / this.z;
            this.x = (this.x - centerX) * scale + centerX;
            this.y = (this.y - centerY) * scale + centerY;
        }

        draw() {
            const depth = 1 - this.z / canvas.width;
            const opacity = Math.min(depth * this.brightness, 1);

            // Skip if off screen
            if (this.x < -50 || this.x > canvas.width + 50 ||
                this.y < -50 || this.y > canvas.height + 50) {
                return;
            }

            // Draw star as streak line
            const lineWidth = Math.max(0.5, depth * 2);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.moveTo(this.prevX, this.prevY);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        }
    }

    // Initialize stars
    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }

    // Animation loop
    function animateStars() {
        // Clear canvas
        ctx.fillStyle = 'rgba(10, 10, 10, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw galaxy background
        drawGalaxy();

        // Update and draw stars
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].draw();
        }

        // Continue loop
        animationId = requestAnimationFrame(animateStars);
    }

    // Initialize and start
    resizeCanvas();
    initStars();
    animateStars();

    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
}

// === MOBILE MENU TOGGLE ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === ACTIVE NAV LINK ON SCROLL ===
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === SCROLL ANIMATIONS (FADE-IN EFFECT) ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = [
    '.service-card',
    '.portfolio-item',
    '.testimonial-card',
    '.about-content',
    '.contact-item',
    '.contact-form'
];

animateElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// === CONTACT FORM HANDLING ===
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Phone validation (optional field, but validate if provided)
    if (phone) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            showFormMessage('Please enter a valid phone number.', 'error');
            return;
        }
    }

    // Form is valid - send via EmailJS
    try {
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            showFormMessage('EmailJS is not configured yet. Please contact via phone: +61 484 028 369', 'error');
            return;
        }

        // Send email using EmailJS
        const response = await emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            contactForm
        );

        console.log('Email sent successfully:', response);
        showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        contactForm.reset();

    } catch (error) {
        console.error('Email sending failed:', error);
        showFormMessage('Oops! Something went wrong. Please try again or call directly at +61 484 028 369.', 'error');
    }
});

// Display form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// === INITIALIZE ON LOAD ===
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    activateNavLink();

    // Log welcome message
    console.log('%c🚀 Space Welding & Fabrication', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite loaded successfully!', 'color: #00d4aa; font-size: 14px;');
});

// === PERFORMANCE: Debounce scroll events ===
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedActivateNavLink = debounce(activateNavLink, 10);
window.addEventListener('scroll', debouncedActivateNavLink);
