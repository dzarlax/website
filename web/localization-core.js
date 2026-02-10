// Import skill icons mapping
import skillIcons from './skill-icons.js';

// Import default language (English)
import enTranslations from './localization-data-en.js';

// Cache for loaded translations
const translations = {
    en: enTranslations
};

// Expose translations globally IMMEDIATELY (before any async operations)
window.translations = translations;

// Async function to load language data dynamically
async function loadLanguage(lang) {
    if (translations[lang]) {
        return translations[lang]; // Already loaded
    }

    try {
        const module = await import(`./localization-data-${lang}.js`);
        translations[lang] = module.default;
        return module.default;
    } catch (error) {
        console.error(`Failed to load language "${lang}":`, error);
        // Fallback to English
        return translations.en || enTranslations;
    }
}

// Initialize localization with preferred language
async function initLocalization(lang) {
    if (!translations[lang]) {
        // Load language asynchronously if not already loaded
        await loadLanguage(lang);
    }
    
    const data = translations[lang] || translations.en;
    updateContentWithData(data, lang);
}

// Helper function to update localized content with given data
function updateLocalizedContentWithData(data, lang) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        let translationValue;

        if (key.includes('.')) {
            // Handle nested keys like 'menu.home', 'footer.copyright', etc.
            const parts = key.split('.');
            const section = parts[0];
            const subKey = parts[1];

            if (data[section] && data[section][subKey] !== undefined) {
                translationValue = data[section][subKey];
            }
        } else {
            translationValue = data[key];
        }

        if (translationValue !== undefined) {
            if (typeof translationValue === 'string') {
                element.textContent = translationValue;
            } else {
                console.warn(`Translation for key "${key}" in language "${lang}" is an object, not a string. Element:`, element);
            }
        }
    });

    // Specific updates for sections not solely relying on data-lang attributes for all text
    if (data.intro) {
        const introTitle = document.querySelector('#intro h2');
        if (introTitle) {
            // Clear any existing animation first
            if (introTitle.typingTimeout) {
                clearTimeout(introTitle.typingTimeout);
                introTitle.typingTimeout = null;
            }
            // Reset and restart typing animation with proper text length
            startTypingAnimation(introTitle, data.intro.title);
        }
        const introDesc = document.querySelector('#intro p');
        if (introDesc) introDesc.innerHTML = data.intro.description;
    }

    if (data.skills) {
        const skillsTitle = document.querySelector('#skills h2');
        if (skillsTitle) skillsTitle.textContent = data.skills.title;
    }

    if (data.experience) {
        const experienceTitle = document.querySelector('#experience h2');
        if (experienceTitle) experienceTitle.textContent = data.experience.title;
    }

    if (data.projects_title) {
        const projectsTitleEl = document.querySelector('#projects h2[data-lang="projects_title"]');
        if (projectsTitleEl) projectsTitleEl.textContent = data.projects_title;
    }

    if (data.contacts) {
        const contactTitle = document.querySelector('#contact h2');
        if (contactTitle) contactTitle.textContent = data.contacts.contact;
    }
}

function updateLocalizedContent() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const data = translations[currentLang];
    if (!data) return;

    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        let translationValue; // Renamed from textContent for clarity

        if (key.includes('.')) {
            // Handle nested keys like 'menu.home', 'footer.copyright', etc.
            const parts = key.split('.');
            const section = parts[0];
            const subKey = parts[1];

            if (data[section] && data[section][subKey] !== undefined) {
                translationValue = data[section][subKey];
            }
        } else {
            translationValue = data[key];
        }

        if (translationValue !== undefined) {
            if (typeof translationValue === 'string') {
                element.textContent = translationValue;
            } else {
                console.warn(`Translation for key "${key}" in language "${currentLang}" is an object, not a string. Element:`, element);
                // Optionally, to avoid breaking the UI with "[object Object]", 
                // you could set a fallback text or leave the content unchanged.
                // For now, just logging is fine, as the main fix will be in HTML data-lang attributes.
            }
        } else {
            // console.warn(`Translation key "${key}" not found for language "${currentLang}"`);
        }
    });

    // Specific updates for sections not solely relying on data-lang attributes for all text
    if (data.intro) {
        const introTitle = document.querySelector('#intro h2'); // Target specifically
        if (introTitle) {
            // Clear any existing animation first
            if (introTitle.typingTimeout) {
                clearTimeout(introTitle.typingTimeout);
                introTitle.typingTimeout = null;
            }
            // Reset and restart typing animation with proper text length
            startTypingAnimation(introTitle, data.intro.title);
        }
        const introDesc = document.querySelector('#intro p');
        if (introDesc) introDesc.innerHTML = data.intro.description;
    }

    if (data.skills) {
        const skillsTitle = document.querySelector('#skills h2');
        if (skillsTitle) skillsTitle.textContent = data.skills.title;
        // Skills items are handled by setupSkills
    }

    if (data.experience) {
        const experienceTitle = document.querySelector('#experience h2');
        if (experienceTitle) experienceTitle.textContent = data.experience.title;
        // Experience items are handled by updateContent
    }

    if (data.projects_title) { // Ensure this is updated
        const projectsTitleEl = document.querySelector('#projects h2[data-lang="projects_title"]');
        if (projectsTitleEl) projectsTitleEl.textContent = data.projects_title;
    }

    if (data.contacts) {
        const contactTitle = document.querySelector('#contact h2');
        if (contactTitle) contactTitle.textContent = data.contacts.contact;
        // Removed direct id-based updates for contact buttons, now handled by data-lang
    }
}

// Content update function (wrapper for backward compatibility)
function updateContent(lang) {
    const data = translations[lang];
    if (!data) return;

    updateContentWithData(data, lang);
}

// Language switcher function (async for dynamic loading)
async function switchLang(lang) {
    // Show loading state
    document.documentElement.classList.add('loading-language');

    try {
        // Load language data if not already loaded
        const data = await loadLanguage(lang);

        // Update content with loaded language data
        updateContentWithData(data, lang);

        // Dispatch the languageChanged event so other modules can update
        const event = new CustomEvent('languageChanged', { detail: { language: lang } });
        document.dispatchEvent(event);
    } catch (error) {
        console.error("Error switching language:", error);
        // Fallback to English on error
        const enData = translations.en || enTranslations;
        updateContentWithData(enData, 'en');
    } finally {
        // Remove loading state
        document.documentElement.classList.remove('loading-language');
    }
}

// Helper function to update content with given translation data
function updateContentWithData(data, lang) {
    if (!data) return;

    // Call the comprehensive update function for data-lang attributes
    updateLocalizedContentWithData(data, lang);

    // Update language buttons state
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.remove('active');
    });
    const langBtn = document.getElementById('lang-' + lang);
    if (langBtn) {
        langBtn.classList.add('active');
    }

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);

    // Trigger reveal animations
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 300);
}

// Window resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';

        // Re-trigger typing animation on resize if needed
        const introTitle = document.querySelector('#intro h2');
        if (introTitle && window.translations) {
            // Clear any existing animation first
            if (introTitle.typingTimeout) {
                clearTimeout(introTitle.typingTimeout);
                introTitle.typingTimeout = null;
            }
            const text = window.translations[currentLang]?.intro?.title || 'Product Manager';
            startTypingAnimation(introTitle, text);
        }
    }, 250);
});

// Initialize on page load
async function initializeLocalization() {
    // Get preferred language
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = (navigator.language || navigator.userLanguage).split('-')[0];

    // Check if saved language is available, otherwise use browser language or English
    let defaultLang = 'en';
    if (savedLang && translations[savedLang]) {
        defaultLang = savedLang;
    } else if (translations[browserLang]) {
        defaultLang = browserLang;
    } else if (savedLang && savedLang !== 'en') {
        // Language is saved but not loaded yet, load it asynchronously
        try {
            await loadLanguage(savedLang);
            defaultLang = savedLang;
        } catch (error) {
            defaultLang = 'en';
        }
    }

    // Initial content update
    updateContent(defaultLang);

    // Dispatch languageChanged event for other modules that need to update
    const event = new CustomEvent('languageChanged', { detail: { language: defaultLang } });
    document.dispatchEvent(event);
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await initializeLocalization();
    });
} else {
    // DOM is already ready, initialize immediately
    initializeLocalization();
}

// Simple typing animation function
function startTypingAnimation(element, text) {
    if (!element || !text) return;

    // Clear any existing timeouts or animations
    if (element.typingTimeout) {
        clearTimeout(element.typingTimeout);
        element.typingTimeout = null;
    }

    // Always disable animation on mobile or when screen is narrow
    if (window.innerWidth <= 768) {
        element.textContent = text;
        element.classList.remove('typing-effect');
        element.style.removeProperty('width');
        element.style.removeProperty('white-space');
        element.style.removeProperty('overflow');
        element.style.removeProperty('border-right');
        return;
    }

    // Clean up any existing animations
    element.classList.remove('typing-effect');
    element.style.removeProperty('width');
    element.textContent = '';

    // For desktop, use simple typewriter effect
    element.classList.add('typing-effect');

    let index = 0;
    const typingSpeed = 80; // milliseconds per character

    const typeChar = () => {
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1);
            index++;
            element.typingTimeout = setTimeout(typeChar, typingSpeed);
        }
        // Cursor blinking is handled by CSS
    };

    // Start typing after a small delay
    element.typingTimeout = setTimeout(typeChar, 300);
}

// Expose for backward compatibility
window.skillIcons = skillIcons;
window.updateLocalizedContent = updateLocalizedContent;
window.startTypingAnimation = startTypingAnimation;
window.switchLang = switchLang;

// Export functions for module usage
export { initLocalization, switchLang, loadLanguage, updateContent, updateContentWithData, updateLocalizedContent, startTypingAnimation };
