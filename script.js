// ===================================
// SPACE WELDING & FABRICATION
// Interactive JavaScript Features
// ===================================

// === EMAILJS CONFIGURATION ===
// Public EmailJS identifiers (safe to expose; restrict allowed domains in the EmailJS dashboard)
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
function setMenuOpen(open) {
    hamburger.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

hamburger.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('active'));
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

// Close mobile menu when tapping anywhere outside it
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        setMenuOpen(false);
    }
});

// Close mobile menu with the Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        setMenuOpen(false);
        hamburger.focus();
    }
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

// Respect the user's reduced-motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
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
const submitButton = contactForm.querySelector('.submit-button');
const submitButtonText = submitButton.textContent;
const honeypot = document.getElementById('company_website');
let isSending = false;

function setSending(sending) {
    isSending = sending;
    submitButton.disabled = sending;
    submitButton.setAttribute('aria-busy', String(sending));
    submitButton.textContent = sending ? 'Sending…' : submitButtonText;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ignore repeat submits while a message is already sending
    if (isSending) return;

    // Honeypot: real visitors never see this field, so if it's filled it's a bot.
    // Pretend it worked and send nothing.
    if (honeypot && honeypot.value.trim() !== '') {
        showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        contactForm.reset();
        return;
    }

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
        setSending(true);
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
    } finally {
        setSending(false);
    }
});

// Display form message (stays visible until dismissed or the form is used again)
function showFormMessage(message, type) {
    formMessage.textContent = '';
    formMessage.className = `form-message ${type}`;

    const text = document.createElement('span');
    text.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'form-message-close';
    closeButton.setAttribute('aria-label', 'Dismiss message');
    closeButton.textContent = '×';
    closeButton.addEventListener('click', hideFormMessage);

    formMessage.append(text, closeButton);
    formMessage.style.display = 'block';
}

function hideFormMessage() {
    formMessage.style.display = 'none';
    formMessage.textContent = '';
    formMessage.className = 'form-message';
}

// Clear an old error once the visitor starts editing the form again
contactForm.addEventListener('input', () => {
    if (formMessage.classList.contains('error')) hideFormMessage();
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

// === PORTFOLIO LIGHTBOX ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

if (lightbox && typeof lightbox.showModal === 'function') {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('.portfolio-overlay h3')?.textContent.trim() || '';
        const detail = item.querySelector('.portfolio-overlay p')?.textContent.trim() || '';

        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View larger photo: ${title}`);

        const open = () => {
            lightboxImg.src = img.currentSrc || img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = detail ? `${title} — ${detail}` : title;
            lightbox.showModal();
        };

        item.addEventListener('click', open);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
        });
    });

    document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());

    // Close when tapping the dark backdrop (outside the photo)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.close();
    });
}
