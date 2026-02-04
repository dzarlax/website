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
    const title = window.translations?.[currentLang]?.intro?.title || 'Product Manager';

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

// Tilt effect for skill cards - DISABLED (causes jumping on mobile)
function setupTiltEffect() {
    // Disabled to prevent jumping issues on mobile and desktop
    return;
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


// Mobile Header Toggle - REMOVED (not needed, using hamburger only)

// Scroll to Top Button Logic
function setupScrollToTop() {
    const scrollButton = document.getElementById('scroll-to-top');
    if (!scrollButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Clean up old localStorage key (not used anymore)
    localStorage.removeItem('mobileHeaderCollapsed');

    // Setup all animations
    setupTypingEffect();
    setupParallax();
    setupTiltEffect();
    setupCounters();
    setupAnimatedBackground();
    setupSmoothScrolling();
    setupScrollSpy();
    setupScrollToTop();

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (hamburger && nav && menuOverlay) {
        // Toggle menu
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });

        // Close menu when clicking on overlay
        menuOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
        });

        // Close menu when clicking on navigation links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        });

        // Swipe-to-close functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;

            // Swipe left to close menu
            if (swipeDistance < -minSwipeDistance) {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                    menuOverlay.classList.remove('active');
                }
            }
        }
    }

    // Add nav-link active class for current section
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

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

    // Scroll Progress Indicator
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }
});
