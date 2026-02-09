// Get translations from window object (populated by localization-core.js)
const getTranslations = () => window.translations || {};

// Helper function to render experience with given data
function renderExperience(data) {
    const experienceList = document.querySelector('.experience__list');

    if (!experienceList) {
        return; // Experience section not present on this page
    }

    if (!data.experience) {
        return; // No experience data available
    }

    experienceList.innerHTML = '';

    data.experience.items.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('experience__item');
        li.style.setProperty('--i', index + 1);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'experience__item-date';
        dateSpan.textContent = item.period;

        const titleH3 = document.createElement('h3');
        titleH3.className = 'experience__item-title';
        titleH3.textContent = item.title;

        const companyDiv = document.createElement('div');
        companyDiv.className = 'experience__item-company';
        companyDiv.textContent = `${item.company} | ${item.location}`;

        const descP = document.createElement('p');
        descP.className = 'experience__item-description';
        descP.innerHTML = item.description;

        li.appendChild(dateSpan);
        li.appendChild(titleH3);
        li.appendChild(companyDiv);
        li.appendChild(descP);

        experienceList.appendChild(li);
    });
}

// Main function to setup experience based on current language
function setupExperience() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const translations = getTranslations();
    const data = translations[currentLang];
    if (!data) return;

    renderExperience(data);
}

// Listen for language changes
document.addEventListener('languageChanged', setupExperience);

// Initial render on page load
document.addEventListener('DOMContentLoaded', setupExperience);

// Export for testing
export { renderExperience, setupExperience };
