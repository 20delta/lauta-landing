/**
 * Lauta Landing Page - Main JavaScript
 * Handles animations, interactions, and scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initScrollAnimations();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initDemoSelector();
    initFaqAccordion();
});

/**
 * Scroll-based reveal animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (!animatedElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('[data-animate]')) : [];
                const elementIndex = siblings.indexOf(entry.target);
                const delay = elementIndex * 100;

                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Header background change on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Check initial scroll position
    handleScroll();
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or the demo form submission
            if (href === '#') return;

            e.preventDefault();
            
            const target = document.querySelector(href);
            if (!target) return;

            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Form validation and submission handling
 */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Scheduling...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;

        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success state
            submitBtn.innerHTML = `
                <span>Demo Scheduled!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            // Reset form
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);

        } catch (error) {
            // Show error state
            submitBtn.innerHTML = `
                <span>Error - Try Again</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });

    // Add input validation styling
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.required && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = '';
            }
        });
    });
}

/**
 * Counter animation for statistics
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        element.textContent = current + (element.dataset.suffix || '');

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };

    requestAnimationFrame(updateCounter);
}

/**
 * Parallax effect for hero section (subtle)
 */
function initParallax() {
    const heroGlow = document.querySelector('.hero-glow');
    if (!heroGlow) return;

    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;

        heroGlow.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;
    });
}

// Initialize parallax on larger screens only
if (window.innerWidth > 768) {
    initParallax();
}

/**
 * Interactive Demo Selector
 * Handles document type card selection and demo switching
 */
function initDemoSelector() {
    const docCards = document.querySelectorAll('.doc-card');
    const viewerDocName = document.querySelector('.viewer-doc-name');
    const fullscreenBtn = document.querySelector('.demo-fullscreen-btn');
    const demoPlaceholder = document.getElementById('demoPlaceholder');
    
    if (!docCards.length) return;

    // Demo configuration - Add your Storylane URLs here
    const demoConfig = {
        'affirmation-opposition': {
            name: 'Affirmation In Opposition to Order to Show Cause',
            url: '#', // Replace with your Storylane URL
            embedUrl: '', // Replace with your Storylane embed URL
            duration: '~2 min demo'
        },
        '14-day-notice': {
            name: '14 Day Rent Demand Notice',
            url: '#', // Replace with your Storylane URL
            embedUrl: '',
            duration: '~1.5 min demo'
        },
        '14-day-bulk': {
            name: '14 Day Rent Demand Notice (Bulk)',
            url: '#', // Replace with your Storylane URL
            embedUrl: '',
            duration: '~3 min demo'
        },
        'petition-notice': {
            name: 'Petition and Notice of Petition',
            url: '#', // Replace with your Storylane URL
            embedUrl: '',
            duration: '~2 min demo'
        }
    };

    docCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            docCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            card.classList.add('active');
            
            // Get demo info
            const demoId = card.dataset.demo;
            const demo = demoConfig[demoId];
            
            if (demo) {
                // Update viewer header
                if (viewerDocName) {
                    viewerDocName.textContent = demo.name;
                }
                
                // Update viewer time
                const viewerTime = document.querySelector('.viewer-doc-time');
                if (viewerTime) {
                    viewerTime.textContent = demo.duration;
                }
                
                // Update fullscreen button link
                if (fullscreenBtn) {
                    fullscreenBtn.href = demo.url;
                }
                
                // If embed URL exists, load the Storylane demo
                if (demo.embedUrl) {
                    loadStorylaneDemoEmbed(demo.embedUrl);
                }
            }
            
            // Add visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });

    // Handle demo placeholder click
    if (demoPlaceholder) {
        demoPlaceholder.addEventListener('click', () => {
            const activeCard = document.querySelector('.doc-card.active');
            if (activeCard) {
                const demoId = activeCard.dataset.demo;
                const demo = demoConfig[demoId];
                
                if (demo && demo.url && demo.url !== '#') {
                    // Open Storylane demo in new tab
                    window.open(demo.url, '_blank');
                } else {
                    // Show coming soon message or scroll to contact form
                    showDemoComingSoon();
                }
            }
        });
    }
}

/**
 * Load Storylane demo embed
 * Call this function when you have your Storylane embed URLs ready
 */
function loadStorylaneDemoEmbed(embedUrl) {
    const container = document.querySelector('.demo-embed-container');
    const placeholder = document.getElementById('demoPlaceholder');
    
    if (!container || !embedUrl) return;
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.id = 'demoIframe';
    iframe.title = 'Lauta Interactive Demo';
    iframe.allow = 'fullscreen';
    iframe.style.cssText = 'width: 100%; height: 100%; border: none;';
    
    // Hide placeholder and show iframe
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    // Remove existing iframe if any
    const existingIframe = container.querySelector('iframe');
    if (existingIframe) {
        existingIframe.remove();
    }
    
    container.appendChild(iframe);
}

/**
 * Show coming soon message when demo isn't ready
 */
function showDemoComingSoon() {
    const placeholder = document.getElementById('demoPlaceholder');
    if (!placeholder) return;
    
    const content = placeholder.querySelector('.demo-placeholder-content');
    if (content) {
        const originalHTML = content.innerHTML;
        
        content.innerHTML = `
            <div class="demo-play-btn" style="background: var(--color-success);">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="28" height="28">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
            </div>
            <h4>Demo Coming Soon!</h4>
            <p>Schedule a live demo to see this in action</p>
            <a href="#demo" class="btn btn-primary" style="margin-top: 1rem;">Schedule Demo</a>
        `;
        
        // Reset after 3 seconds
        setTimeout(() => {
            content.innerHTML = originalHTML;
        }, 3000);
    }
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        }
    });

    // Open first FAQ item by default
    if (faqItems[0]) {
        faqItems[0].classList.add('active');
    }
}

