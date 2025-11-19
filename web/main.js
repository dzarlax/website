// Initialize everything on page load
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => {
                // Service worker registered successfully
            })
            .catch(error => {
                console.error('Service worker registration failed:', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Hide popover on scroll
    window.addEventListener('scroll', () => {
        const popover = document.getElementById('popover');
        if (popover) {
            popover.style.display = 'none';
        }
    });

    // Event listeners for language switcher
    const langEn = document.getElementById('lang-en');
    const langRu = document.getElementById('lang-ru');
    const langRs = document.getElementById('lang-rs');
    if (langEn) langEn.addEventListener('click', () => switchLang('en'));
    if (langRu) langRu.addEventListener('click', () => switchLang('ru'));
    if (langRs) langRs.addEventListener('click', () => switchLang('rs'));

    // Event listeners for contact buttons
    const contactButtons = document.querySelectorAll('.contact-buttons .contact-btn');
    if (contactButtons.length >= 5) {
        contactButtons[0].addEventListener('click', sendEmail);
        contactButtons[1].addEventListener('click', openLinkedIn);
        contactButtons[2].addEventListener('click', openGithub);
        contactButtons[3].addEventListener('click', openRSS);
        contactButtons[4].addEventListener('click', downloadResume);
    }

    // Create animated particles
    createParticles();

    // Start initial typing animation after localization loads
    setTimeout(() => {
        const introTitle = document.querySelector('#intro h2');
        if (introTitle && window.startTypingAnimation && window.translations) {
            if (introTitle.typingTimeout) {
                clearTimeout(introTitle.typingTimeout);
                introTitle.typingTimeout = null;
            }
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            const text = window.translations[currentLang]?.intro?.title || 'Product Manager';
            window.startTypingAnimation(introTitle, text);
        }
    }, 500);

    // Scroll animations
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

// Create animated particles in the header
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        particlesContainer.appendChild(particle);
    }
}
