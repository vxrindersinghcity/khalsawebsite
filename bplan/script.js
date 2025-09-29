// ===== MOBILE NAVIGATION TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== GALLERY FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Get selected services
    const services = [];
    document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
        services.push(checkbox.value);
    });
    data.services = services;
    
    // Here you would normally send the data to a server
    console.log('Form submitted with data:', data);
    
    // Show success message
    showNotification('Thank you for your inquiry! We will contact you within 24 hours.', 'success');
    
    // Reset form
    this.reset();
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    console.log('Newsletter subscription:', email);
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    
    this.reset();
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add specific animation classes based on element
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .package-card, .testimonial-card, .stat-card').forEach((el, index) => {
    el.dataset.delay = index * 100;
    observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate stat counters when they come into view
const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            
            h3.textContent = '0' + suffix;
            animateCounter(h3, number);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ===== LAZY LOADING FOR GALLERY IMAGES =====
const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
}, { rootMargin: '50px' });

// Observe all gallery images
document.querySelectorAll('.gallery-item img').forEach(img => {
    imageObserver.observe(img);
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroSection && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== DYNAMIC COPYRIGHT YEAR =====
const currentYear = new Date().getFullYear();
const copyrightElements = document.querySelectorAll('.footer-bottom p');
copyrightElements.forEach(el => {
    el.innerHTML = el.innerHTML.replace('2024', currentYear);
});

// ===== ADD NOTIFICATION STYLES DYNAMICALLY =====
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: -400px;
        background: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: right 0.3s ease;
        z-index: 9999;
        max-width: 400px;
    }
    
    .notification.show {
        right: 20px;
    }
    
    .notification.success {
        border-left: 5px solid #4caf50;
    }
    
    .notification.success i {
        color: #4caf50;
    }
    
    .notification.info {
        border-left: 5px solid #2196f3;
    }
    
    .notification.info i {
        color: #2196f3;
    }
    
    .animated {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: -100%;
            left: 20px;
            right: 20px;
            top: auto;
            bottom: 20px;
        }
        
        .notification.show {
            right: 20px;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ===== FORM VALIDATION =====
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            emailField.classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Add validation to contact form
contactForm.addEventListener('submit', function(e) {
    if (!validateForm(this)) {
        e.preventDefault();
        showNotification('Please fill in all required fields correctly.', 'error');
    }
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== PRELOAD CRITICAL IMAGES =====
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload hero background and other critical images
preloadImages([
    'hero-bg.jpg',
    'wedding1.jpg',
    'wedding2.jpg'
]);

// ===== GALLERY LIGHTBOX =====
const galleryLinks = document.querySelectorAll('.gallery-link');

galleryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const item = this.closest('.gallery-item');
        const img = item.querySelector('img');
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        
        createLightbox(img.src, title, description);
    });
});

function createLightbox(imageSrc, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="${title}">
            <div class="lightbox-caption">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    // Close functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ===== ADD LIGHTBOX STYLES =====
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    }
    
    .lightbox.active {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .lightbox.active .lightbox-content {
        transform: scale(1);
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 70vh;
        display: block;
        margin: 0 auto;
        border-radius: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 2rem;
        color: white;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .lightbox-close:hover {
        transform: scale(1.2);
    }
    
    .lightbox-caption {
        text-align: center;
        color: white;
        margin-top: 1rem;
    }
    
    .error {
        border-color: #e74c3c !important;
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(lightboxStyles);

// ===== TESTIMONIAL SLIDER (OPTIONAL ENHANCEMENT) =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (window.innerWidth <= 768) {
            testimonial.style.display = i === index ? 'block' : 'none';
        }
    });
}

// Add navigation dots for mobile testimonials
if (window.innerWidth <= 768 && testimonials.length > 0) {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonials();
        });
        dotsContainer.appendChild(dot);
    });
    
    document.querySelector('.testimonials-grid').appendChild(dotsContainer);
}

function updateTestimonials() {
    showTestimonial(currentTestimonial);
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

// Auto-advance testimonials on mobile
if (window.innerWidth <= 768) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials();
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
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

// Optimize scroll event handlers
const optimizedScroll = debounce(() => {
    // Header scroll effect
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    if (heroSection && scrolled < window.innerHeight) {
        requestAnimationFrame(() => {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        });
    }
}, 10);

window.addEventListener('scroll', optimizedScroll);

console.log('Premier Events website initialized successfully!');