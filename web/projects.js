// Utility function to escape HTML content and prevent XSS
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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

    // Safely escape HTML content to prevent XSS
    const title = escapeHtml(project[`title_${currentLang}`] || project.title_en);
    const description = escapeHtml(project[`description_${currentLang}`] || project.description_en);
    const tags = project[`tags_${currentLang}`] || project.tags_en || [];
    const link = escapeHtml(project.link);

    // Create title element
    const titleElement = document.createElement('h3');
    titleElement.className = 'project-title';
    titleElement.textContent = title;
    card.appendChild(titleElement);

    // Create description element
    const descElement = document.createElement('p');
    descElement.className = 'project-description';
    descElement.textContent = description;
    card.appendChild(descElement);

    // Create tags container
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'project-tags';
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'project-tag';
        tagElement.textContent = escapeHtml(tag);
        tagsContainer.appendChild(tagElement);
    });
    card.appendChild(tagsContainer);

    // Create link element
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer'; // Security improvement
    linkElement.className = 'project-link';
    
    const iconElement = document.createElement('i');
    iconElement.className = 'fas fa-external-link-alt';
    linkElement.appendChild(iconElement);
    
    const spanElement = document.createElement('span');
    spanElement.setAttribute('data-lang', 'view_project');
    spanElement.textContent = 'View Project';
    linkElement.appendChild(spanElement);
    
    card.appendChild(linkElement);

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
