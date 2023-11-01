
async function loadLocalizationData(lang) {
    try {
        console.log(lang)
        const response = await fetch(`localization/${lang}.json`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Произошла ошибка при загрузке данных:', error);
        return null;
    }
}


async function switchLang(lang) {
    const localizationData = await loadLocalizationData(lang);
    document.querySelector('#intro h2').textContent = localizationData.intro.title;
    document.querySelector('#intro p').textContent = localizationData.intro.description;
    document.querySelector('#skills h2').textContent = localizationData.skills.title;
    document.querySelector('#experience h2').textContent = localizationData.experience.title;
    document.querySelector('#contact h2').textContent = localizationData.contacts.contact;
// Получаем кнопки по их id
    const emailButton = document.getElementById('emailButton');
    const linkedinButton = document.getElementById('linkedinButton');
    const githubButton = document.getElementById('githubButton');

// Устанавливаем текст с использованием локализационных данных
    emailButton.textContent = localizationData.contacts.email;
    linkedinButton.textContent = localizationData.contacts.linkedin;
    githubButton.textContent = localizationData.contacts.github;


    const skillsDiv = document.querySelector('#skills div');
    skillsDiv.innerHTML = "";
    localizationData.skills.items.forEach(item => {
        const span = document.createElement('span');
        span.textContent = item;
        span.className = "skill-tag";
        skillsDiv.appendChild(span);
    });

    const experienceList = document.querySelector('#experience ul');
    experienceList.innerHTML = "";
    localizationData.experience.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        experienceList.appendChild(li);
    });

    const menuItems = document.querySelectorAll('[data-lang]');
    menuItems.forEach((item) => {
        const translationKey = item.getAttribute('data-lang'); // Получаем значение атрибута data-lang
        if (localizationData.menu && localizationData.menu[translationKey]) {
            item.textContent = localizationData.menu[translationKey];
        }
    });
}

