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

// === HERO SLIDESHOW ===
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slideInterval = 5000; // 5 seconds
let slideTimer;

// Function to show specific slide
function showSlide(index) {
    // Ensure index is within bounds
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Function to advance to next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Function to start slideshow
function startSlideshow() {
    slideTimer = setInterval(nextSlide, slideInterval);
}

// Function to reset slideshow timer
function resetSlideshow() {
    clearInterval(slideTimer);
    startSlideshow();
}

// Add click event to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetSlideshow();
    });
});

// Start slideshow on load
if (slides.length > 0 && dots.length > 0) {
    startSlideshow();
}

// Pause slideshow when user is not on the page (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(slideTimer);
    } else {
        startSlideshow();
    }
});

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
