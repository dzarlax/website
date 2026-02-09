// Get translations from window object (populated by localization-core.js)
const getTranslations = () => window.translations || {};

// Helper function to render education with given data
function renderEducation(data) {
    const educationList = document.querySelector('.education__list');

    if (!educationList) {
        return; // Education section not present on this page
    }

    if (!data.education) {
        return; // No education data available
    }

    educationList.innerHTML = '';

    data.education.items.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('education-item');
        div.style.setProperty('--i', index + 1);

        const typeIcon = {
            'degree': 'fas fa-graduation-cap',
            'certification': 'fas fa-certificate',
            'course': 'fas fa-book'
        };

        const iconElem = document.createElement('div');
        iconElem.classList.add('education-icon');
        iconElem.innerHTML = `<i class="${typeIcon[item.type] || 'fas fa-book'}"></i>`;
        div.appendChild(iconElem);

        const contentElem = document.createElement('div');
        contentElem.classList.add('education-content');

        const degreeElem = document.createElement('div');
        degreeElem.classList.add('education-degree');
        degreeElem.textContent = item.degree;
        contentElem.appendChild(degreeElem);

        const institutionElem = document.createElement('div');
        institutionElem.classList.add('education-institution');
        institutionElem.textContent = `${item.institution}${item.location ? ', ' + item.location : ''}`;
        contentElem.appendChild(institutionElem);

        div.appendChild(contentElem);
        educationList.appendChild(div);
    });
}

// Main function to setup education based on current language
function setupEducation() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const translations = getTranslations();
    const data = translations[currentLang];
    if (!data) return;

    renderEducation(data);
}

// Listen for language changes
document.addEventListener('languageChanged', setupEducation);

// Initial render on page load
document.addEventListener('DOMContentLoaded', setupEducation);

// Export for testing
export { renderEducation, setupEducation };
