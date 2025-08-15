// Enhanced scroll animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for smooth section reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation to children
                const children = entry.target.querySelectorAll('.project-card, .skill-tag, .contact-btn');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('stagger-animation');
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Magnetic button effect
    document.querySelectorAll('.contact-btn, .project-link').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Enhanced parallax scrolling
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Animate header particles based on scroll
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.1;
            particle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced typing effect with multiple phrases
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const phrases = [
            'Product Manager & Tech Enthusiast',
            'Data-Driven Innovation Leader',
            'UI/UX Design Specialist',
            'Agile Project Management Expert'
        ];
        let currentPhrase = 0;
        
        function typePhrase() {
            const phrase = phrases[currentPhrase];
            typingElement.textContent = '';
            let i = 0;
            
            function typeChar() {
                if (i < phrase.length) {
                    typingElement.textContent += phrase.charAt(i);
                    i++;
                    setTimeout(typeChar, 100);
                } else {
                    setTimeout(() => {
                        deletePhrase();
                    }, 2000);
                }
            }
            
            function deletePhrase() {
                if (typingElement.textContent.length > 0) {
                    typingElement.textContent = typingElement.textContent.slice(0, -1);
                    setTimeout(deletePhrase, 50);
                } else {
                    currentPhrase = (currentPhrase + 1) % phrases.length;
                    setTimeout(typePhrase, 500);
                }
            }
            
            typeChar();
        }
        
        setTimeout(typePhrase, 1000);
    }

    // Loading states for dynamic content
    function showLoadingSpinner(container) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        container.appendChild(spinner);
        return spinner;
    }

    function hideLoadingSpinner(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }

    // Enhanced project cards with lazy loading
    const projectContainer = document.getElementById('projects-container');
    if (projectContainer) {
        const spinner = showLoadingSpinner(projectContainer);
        
        // Simulate loading delay for demonstration
        setTimeout(() => {
            hideLoadingSpinner(spinner);
            // Projects should already be loaded by the main script
        }, 1000);
    }

    // Ripple effect for buttons
    document.querySelectorAll('.contact-btn, .project-link').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes dynamically
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Improved skill tag interactions
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // All scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});
