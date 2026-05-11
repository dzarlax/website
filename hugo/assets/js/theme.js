// Theme handling with modern JavaScript

// Utility function to set theme
function setTheme(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('dark-mode', '');
        themeToggle.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('dark-mode');
        themeToggle.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on stored preference or system preference
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        setTheme('dark');
    }

    // Theme toggle handler with animation
    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.hasAttribute('dark-mode');
        
        // Add transition class for smooth color changes
        document.body.classList.add('theme-transition');
        
        const newTheme = isDark ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
        
        // Refresh animations for visible sections
        refreshAnimations();
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('dark-mode', '');
                themeToggle.classList.add('dark');
            } else {
                document.documentElement.removeAttribute('dark-mode');
                themeToggle.classList.remove('dark');
            }
        }
    });
}

// Refresh animations for visible sections
function refreshAnimations() {
    // Reset and retrigger animations for visible sections
    document.querySelectorAll('.reveal.active').forEach(el => {
        el.classList.remove('active');
        setTimeout(() => {
            el.classList.add('active');
        }, 50);
    });
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);

// Add CSS for theme transition
const style = document.createElement('style');
style.textContent = `
    .theme-transition,
    .theme-transition * {
        transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease !important;
    }
`;
document.head.appendChild(style);
