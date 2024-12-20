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

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.hasAttribute('dark-mode');
        if (isDark) {
            document.documentElement.removeAttribute('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.classList.remove('dark');
        } else {
            document.documentElement.setAttribute('dark-mode', '');
            localStorage.setItem('theme', 'dark');
            themeToggle.classList.add('dark');
        }
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

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);