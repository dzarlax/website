// Theme handling
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on stored preference or system preference
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.setAttribute('dark-mode', '');
        themeToggle.classList.add('dark');
    }

    // Theme toggle handler with animation
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.hasAttribute('dark-mode');
        
        // Add transition class for smooth color changes
        document.body.classList.add('theme-transition');
        
        if (isDark) {
            document.documentElement.removeAttribute('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.classList.remove('dark');
        } else {
            document.documentElement.setAttribute('dark-mode', '');
            localStorage.setItem('theme', 'dark');
            themeToggle.classList.add('dark');
        }
        
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
