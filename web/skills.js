// Import dependencies
import skillIcons from './skill-icons.js';

// Get translations from window object (populated by localization-core.js)
const getTranslations = () => window.translations || {};

// Popover functionality
function showPopover(text, event) {
    const popover = document.getElementById('popover');
    if (!popover) return;

    popover.textContent = text;
    popover.style.display = 'block';

    // Position the popover
    const rect = event.target.getBoundingClientRect();
    popover.style.left = `${event.clientX}px`;
    popover.style.top = `${rect.bottom + window.scrollY + 10}px`;
}

function hidePopover() {
    const popover = document.getElementById('popover');
    if (popover) {
        popover.style.display = 'none';
    }
}

// Add global click handler to hide popover
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('skill-tag')) {
        hidePopover();
    }
});

// Hide popover on scroll
window.addEventListener('scroll', hidePopover);

// Helper function to render skills with given data
function renderSkills(data) {
    const skillsContainer = document.querySelector('.skills__container');

    // Check if skills container exists (not present on all pages)
    if (!skillsContainer) {
        return;
    }

    if (!data || !data.skills) {
        return;
    }

    skillsContainer.innerHTML = '';

    // Render main skills title
    if (data.skills.title) {
        const titleElement = document.createElement('h3');
        titleElement.textContent = data.skills.title;
        titleElement.className = 'skills-section-title';
        skillsContainer.appendChild(titleElement);
    }

    let globalIndex = 0;

    // Helper function to create skill tags
    const createSkillTag = (item, index) => {
        const skillTag = document.createElement('div');
        skillTag.classList.add('skill-tag');
        skillTag.style.setProperty('--i', index + 1);

        // Add icon
        const iconClass = skillIcons[item.title] || 'fas fa-award';
        const icon = document.createElement('i');
        icon.className = iconClass + ' skill-icon';
        skillTag.appendChild(icon);

        // Add title
        const title = document.createElement('span');
        title.textContent = item.title;
        skillTag.appendChild(title);

        if (window.innerWidth <= 768) {
            // Mobile: Expandable content
            skillTag.addEventListener('click', function () {
                const existing = this.nextElementSibling;
                if (existing?.classList.contains('collapsible-content')) {
                    existing.remove();
                    this.classList.remove('active');
                } else {
                    // Remove any other open descriptions
                    document.querySelectorAll('.collapsible-content').forEach(el => el.remove());
                    document.querySelectorAll('.skill-tag').forEach(tag => tag.classList.remove('active'));

                    const content = document.createElement('div');
                    content.classList.add('collapsible-content');
                    content.textContent = item.description;
                    this.insertAdjacentElement('afterend', content);
                    this.classList.add('active');
                }
            });
        } else {
            // Desktop: Popover
            skillTag.addEventListener('mouseenter', (e) => showPopover(item.description, e));
            skillTag.addEventListener('mouseleave', hidePopover);
        }

        return skillTag;
    };

    // Render main skills items (Core Competencies)
    if (data.skills.items && data.skills.items.length > 0) {
        data.skills.items.forEach((item, index) => {
            globalIndex++;
            const skillTag = createSkillTag(item, globalIndex);
            skillTag.classList.add('core-competency');
            skillsContainer.appendChild(skillTag);
        });
    }

    // Render subsections (Technical Proficiencies, etc.)
    if (data.skills.subsections && data.skills.subsections.length > 0) {
        data.skills.subsections.forEach(subsection => {
            // Add subsection title
            const subsectionTitle = document.createElement('h3');
            subsectionTitle.textContent = subsection.title;
            subsectionTitle.className = 'skills-subsection-title';
            subsectionTitle.style.marginTop = '2rem';
            skillsContainer.appendChild(subsectionTitle);

            // Add subsection items
            if (subsection.items && subsection.items.length > 0) {
                subsection.items.forEach((item) => {
                    globalIndex++;
                    const skillTag = createSkillTag(item, globalIndex);
                    skillsContainer.appendChild(skillTag);
                });
            }
        });
    }
}

// Main function to setup skills based on current language
function setupSkills() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const translations = getTranslations();
    const data = translations[currentLang];
    if (!data) return;

    renderSkills(data);
}

// Window resize handler to update interaction mode
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setupSkills();
    }, 250);
});

// Listen for language changes
document.addEventListener('languageChanged', setupSkills);

// Initial render on page load
document.addEventListener('DOMContentLoaded', setupSkills);

// Export for testing
export { renderSkills, setupSkills, showPopover, hidePopover };
