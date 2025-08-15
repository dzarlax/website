/**
 * Enhanced animations for the personal website
 * Adds dynamic effects and interactions to improve user experience
 */

// Typing effect for the intro title
function setupTypingEffect() {
    const titleElement = document.querySelector('#intro h2');
    if (!titleElement) return;
    
    // Don't add typing effect if title is already set
    // This prevents the duplicate title issue
    if (titleElement.textContent && titleElement.textContent.trim() !== '') {
        return;
    }
    
    // Get title from translations
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const title = translations[currentLang]?.intro?.title || 'Product Manager';
    
    titleElement.textContent = '';
    titleElement.classList.add('typing-effect');
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < title.length) {
            titleElement.textContent += title.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                titleElement.classList.remove('typing-effect');
            }, 1000);
        }
    }, 100);
}

// Parallax effect for the header
function setupParallax() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// Tilt effect for skill cards
function setupTiltEffect() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return; // Disable on mobile
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Animated counter for experience years
function setupCounters() {
    const experienceYears = document.querySelector('#experience-years');
    if (!experienceYears) return;
    
    const targetNumber = parseInt(experienceYears.getAttribute('data-count') || '8');
    let currentNumber = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const interval = setInterval(() => {
                    if (currentNumber < targetNumber) {
                        currentNumber++;
                        experienceYears.textContent = currentNumber;
                    } else {
                        clearInterval(interval);
                    }
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(experienceYears);
}

// Animated background gradient
function setupAnimatedBackground() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.classList.add('gradient-animate');
        });
        
        section.addEventListener('mouseleave', () => {
            section.classList.remove('gradient-animate');
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Highlight active navigation link based on scroll position
function setupScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (href === '#' && current === '')) {
                link.classList.add('active');
            }
        });
    });
}

// Toggle mobile navigation menu
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Setup all animations
    setupTypingEffect();
    setupParallax();
    setupTiltEffect();
    setupCounters();
    setupAnimatedBackground();
    setupSmoothScrolling();
    setupScrollSpy();
    setupMobileMenu();
    
    // Add nav-link active class for current section
    const navLinks = document.querySelectorAll('nav a');
    navLinks[0].classList.add('active');
    
    // Add CSS class for nav links
    navLinks.forEach((link, index) => {
        link.style.setProperty('--i', index + 1);
    });
    
    // Add CSS class for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--i', index + 1);
    });
    
    // Add CSS class for contact buttons
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach((btn, index) => {
        btn.style.setProperty('--i', index + 1);
    });
});
