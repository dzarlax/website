async function fetchProjects() {
    try {
        const response = await fetch('../projects.json');
        if (!response.ok) {
            console.error(`Error fetching projects: ${response.status} ${response.statusText}`);
            return null;
        }
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Error fetching or parsing projects.json:', error);
        return null;
    }
}

function createProjectCard(project) {
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const card = document.createElement('div');
    card.classList.add('project-card');

    const title = project[`title_${currentLang}`] || project.title_en;
    const description = project[`description_${currentLang}`] || project.description_en;
    const tags = project[`tags_${currentLang}`] || project.tags_en || [];

    card.innerHTML = `
        <img src="${project.image}" alt="${title}" class="project-image">
        <h3 class="project-title">${title}</h3>
        <p class="project-description">${description}</p>
        <div class="project-tags">
            ${tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <a href="${project.link}" target="_blank" class="project-link">
            <i class="fas fa-external-link-alt"></i>
            <span data-lang="view_project">View Project</span> 
        </a>
    `;
    // The text for "View Project" will be updated by the global updateLocalizedContent function
    // when switchLang is called, which also triggers displayProjects.
    return card;
}

async function displayProjects() {
    const projectsData = await fetchProjects();
    const container = document.getElementById('projects-container');

    if (!container) {
        console.error('Projects container #projects-container not found.');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    if (projectsData && projectsData.length > 0) {
        projectsData.forEach((project, index) => {
            const card = createProjectCard(project);
            card.style.setProperty('--i', index + 1); // For staggered animation
            container.appendChild(card);
        });
    } else {
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        let message = 'No projects to display at the moment.';
        if (currentLang === 'ru') {
            message = 'Проектов для отображения пока нет.';
        } else if (currentLang === 'rs') {
            message = 'Тренутно нема пројеката за приказ.';
        }
        container.innerHTML = `<p>${message}</p>`;
    }

    // Ensure localized content is updated for any newly added elements
    if (typeof updateLocalizedContent === 'function') {
        updateLocalizedContent();
    }
}

// Initial display of projects on page load
document.addEventListener('DOMContentLoaded', displayProjects);

// Reload projects when language changes
document.addEventListener('languageChanged', displayProjects);
