/**
 * Lauta Landing Page - Main JavaScript
 * Handles: FAQ accordion, mobile menu, sticky CTA, and header scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initMobileMenu();
    initStickyCTA();
    initHeaderScroll();
});

/**
 * FAQ Accordion
 * Toggles FAQ items open/closed on click
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Mobile Menu
 * Toggles mobile navigation menu
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

/**
 * Sticky CTA Button
 * Shows/hides sticky CTA based on scroll position
 */
function initStickyCTA() {
    const stickyCta = document.getElementById('stickyCta');
    const hero = document.getElementById('hero');
    
    if (!stickyCta || !hero) return;
    
    const heroHeight = hero.offsetHeight;
    
    function updateStickyCta() {
        if (window.scrollY > heroHeight * 0.5) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', updateStickyCta, { passive: true });
    updateStickyCta(); // Check initial state
}

/**
 * Header Scroll Effect
 * Adds dark background to header when leaving hero section
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const hero = document.getElementById('hero');
    
    if (!header) return;
    
    // Use hero height as threshold, fallback to 100vh
    const getThreshold = () => hero ? hero.offsetHeight * 0.7 : window.innerHeight * 0.7;
    
    function updateHeader() {
        if (window.scrollY > getThreshold()) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader, { passive: true });
    updateHeader(); // Check initial state
}
