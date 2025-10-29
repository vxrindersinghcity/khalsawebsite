/**
 * KHALSA SCAFFOLDING LTD - Enhanced JavaScript
 * Professional UI interactions and animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Enhanced Loading Screen with Progress
    // ========================================
    const loadingScreen = document.getElementById('loadingScreen');
    let loadingProgress = 0;
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
        loadingProgress += Math.random() * 30;
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(progressInterval);
        }
        updateLoadingText(loadingProgress);
    }, 500);
    
    function updateLoadingText(progress) {
        const statusText = document.querySelector('.loading-status-text');
        if (statusText) {
            if (progress < 30) {
                statusText.textContent = 'Initializing Experience';
            } else if (progress < 60) {
                statusText.textContent = 'Loading Resources';
            } else if (progress < 90) {
                statusText.textContent = 'Preparing Content';
            } else {
                statusText.textContent = 'Ready to Launch';
            }
        }
    }
    
    // Hide loading screen after animation completes
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 4000);
    
    // ========================================
    // Video Enhancement
    // ========================================
    const video = document.getElementById('scfvid');
    const videoPlayBtn = document.querySelector('.video-play-btn');
    
    if (video) {
        // Ensure video plays on load
        video.play().catch(err => {
            console.log('Video autoplay prevented:', err);
            // Show play button if autoplay fails
            if (videoPlayBtn) {
                videoPlayBtn.style.display = 'flex';
            }
        });
        
        // Loop video when it ends
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
        
        // Play button functionality
        if (videoPlayBtn) {
            videoPlayBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
            
            // Hide play button when video is playing
            video.addEventListener('play', () => {
                videoPlayBtn.style.opacity = '0';
            });
            
            video.addEventListener('pause', () => {
                videoPlayBtn.style.opacity = '1';
            });
        }
    }
    
    // ========================================
    // Enhanced Mobile Navigation
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            
            // Update ARIA attributes
            this.setAttribute('aria-expanded', isActive);
            
            // Animate menu items
            if (isActive) {
                navLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.animation = 'slideIn 0.3s ease forwards';
                    }, index * 50);
                });
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // ========================================
    // Enhanced Smooth Scrolling
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70; // Height of fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // ========================================
    // Enhanced Scroll to Top Button
    // ========================================
    const scrollTopBtn = document.getElementById('scrollTop');
    let isScrolling = false;
    
    if (scrollTopBtn) {
        // Show/hide scroll to top button with debouncing
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(() => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            }, 100);
        });
        
        // Scroll to top functionality with animation
        scrollTopBtn.addEventListener('click', () => {
            if (isScrolling) return;
            
            isScrolling = true;
            const startPosition = window.pageYOffset;
            const duration = 800;
            const startTime = performance.now();
            
            function scrollAnimation(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeInOutQuad = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                window.scrollTo(0, startPosition * (1 - easeInOutQuad));
                
                if (progress < 1) {
                    requestAnimationFrame(scrollAnimation);
                } else {
                    isScrolling = false;
                }
            }
            
            requestAnimationFrame(scrollAnimation);
        });
    }
    
    // ========================================
    // Enhanced Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        // Update navbar style on scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle scroll events for better performance
    let scrollThrottle;
    window.addEventListener('scroll', () => {
        if (scrollThrottle) {
            clearTimeout(scrollThrottle);
        }
        scrollThrottle = setTimeout(updateActiveLink, 50);
    });
    
    // ========================================
    // Enhanced Fade In Animation on Scroll
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for child elements
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
                
                // Only observe once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // ========================================
    // Enhanced Statistics Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    let statsAnimated = false;
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2500;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                // Add completion animation
                element.parentElement.classList.add('completed');
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // Create observer for stats section
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    statNumbers.forEach((stat, index) => {
                        setTimeout(() => {
                            animateCounter(stat);
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ========================================
    // Gallery Lightbox Enhancement
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                createLightbox(img.src, img.alt);
            }
        });
    });
    
    function createLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox active';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${src}" alt="${alt}" class="lightbox-image">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleLightboxKeyboard);
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
            document.removeEventListener('keydown', handleLightboxKeyboard);
        }
        
        function handleLightboxKeyboard(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    }
    
    // ========================================
    // Form Enhancement (for future contact form)
    // ========================================
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // ========================================
    // Parallax Effect for Hero Section
    // ========================================
    const heroSection = document.querySelector('.hero');
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroSection && heroPattern) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroPattern.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // ========================================
    // Enhanced Image Lazy Loading
    // ========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================
    // Service Card Hover Effects
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // ========================================
    // Copy to Clipboard for Contact Details
    // ========================================
    const contactLinks = document.querySelectorAll('.contact-info a, .quote-btn');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Show tooltip for phone/email
            if (href.startsWith('tel:') || href.startsWith('mailto:')) {
                showTooltip(this, 'Click to open');
            }
        });
    });
    
    function showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--dark-gray);
            color: var(--white);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.85rem;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }, 2000);
    }
    
    // ========================================
    // Performance Monitoring
    // ========================================
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
            }
        });
        
        perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // ========================================
    // Prevent FOUC (Flash of Unstyled Content)
    // ========================================
    document.documentElement.classList.add('js-loaded');
    
    // ========================================
    // Network Status Detection
    // ========================================
    window.addEventListener('online', () => {
        console.log('Connection restored');
        showNotification('Connection restored', 'success');
    });
    
    window.addEventListener('offline', () => {
        console.log('Connection lost');
        showNotification('Connection lost. Some features may be unavailable.', 'warning');
    });
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#ff9800' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ========================================
    // Smooth Page Transitions
    // ========================================
    const allLinks = document.querySelectorAll('a:not([href^="#"])');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip external links and special protocols
            if (href && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
                e.preventDefault();
                
                // Add fade out animation
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    // ========================================
    // Initialize on Page Load
    // ========================================
    window.addEventListener('load', () => {
        // Remove loading class
        document.body.classList.remove('loading');
        
        // Trigger initial animations
        updateActiveLink();
        
        // Log performance metrics
        if (window.performance && window.performance.timing) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }
    });
});

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could send this to an error logging service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========================================
// Service Worker Registration (for PWA support)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            registration => {
                console.log('ServiceWorker registered:', registration);
            },
            err => {
                console.log('ServiceWorker registration failed:', err);
            }
        ).catch(err => {
            // Service worker not available, continue normally
            console.log('ServiceWorker not supported');
        });
    });
}

// ========================================
// Add CSS Animation Keyframes
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(20px);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 9999;
    }
    
    .lightbox.active {
        opacity: 1;
        visibility: visible;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }
    
    .lightbox-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 140, 0, 0.9);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        background: #ff8c00;
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);