// Theme handling — canonical two-attribute pattern that the
// dzarlax/design-system bundle expects.
//
//   <html dark-mode>  — force dark (overrides system pref)
//   <html light-mode> — force light (overrides system pref)
//   <html> (no attr)  — follow `prefers-color-scheme`
//
// We always pick one of the two attributes (never "no attr") so that
// DS's `@media (prefers-color-scheme: dark) :root:not([light-mode])`
// fallback never silently overrides the user's manual choice on devices
// whose system pref disagrees with that choice. The lander's style.css
// only listens to `[dark-mode]` (no @media), so eager resolution is
// required for the lander to track theme correctly anyway.
//
// Kept in sync with web/theme.js (lander copy).

(function () {
    const ROOT = document.documentElement;
    const STORAGE_KEY = 'theme';
    const mqDark = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        if (theme === 'dark') {
            ROOT.setAttribute('dark-mode', '');
            ROOT.removeAttribute('light-mode');
        } else {
            ROOT.setAttribute('light-mode', '');
            ROOT.removeAttribute('dark-mode');
        }
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) themeToggle.classList.toggle('dark', theme === 'dark');
    }

    function setTheme(theme, persist) {
        applyTheme(theme);
        if (persist) {
            try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
        }
    }

    function resolveInitial() {
        let stored = null;
        try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
        if (stored === 'dark' || stored === 'light') return stored;
        return mqDark.matches ? 'dark' : 'light';
    }

    function initTheme() {
        const initial = resolveInitial();
        applyTheme(initial);

        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function () {
                const isDark = ROOT.hasAttribute('dark-mode');
                document.body.classList.add('theme-transition');
                setTheme(isDark ? 'light' : 'dark', true);
                setTimeout(() => document.body.classList.remove('theme-transition'), 500);
                refreshAnimations();
            });
        }

        mqDark.addEventListener('change', function (e) {
            let stored = null;
            try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
            if (stored === 'dark' || stored === 'light') return;
            applyTheme(e.matches ? 'dark' : 'light');
        });
    }

    function refreshAnimations() {
        document.querySelectorAll('.reveal.active').forEach(el => {
            el.classList.remove('active');
            setTimeout(() => el.classList.add('active'), 50);
        });
    }

    document.addEventListener('DOMContentLoaded', initTheme);

    const style = document.createElement('style');
    style.textContent = `
        .theme-transition,
        .theme-transition * {
            transition: background-color 0.5s ease, color 0.5s ease,
                        border-color 0.5s ease, box-shadow 0.5s ease !important;
        }
    `;
    document.head.appendChild(style);
})();
