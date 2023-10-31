// Функция для изменения текста элементов меню на основе выбранного языка

function switchLang(lang) {
    document.querySelector('#intro h2').textContent = content_intro[lang].intro.title;
    document.querySelector('#intro p').textContent = content_intro[lang].intro.description;
    document.querySelector('#skills h2').textContent = content_skills[lang].skills.title;
    document.querySelector('#experience h2').textContent = content_experience[lang].experience.title;
    document.querySelector('#contact h2').textContent = menuText[lang].contact;
    document.querySelector('.contact-buttons .contact-button:nth-child(1)').textContent = content_contacts[lang].email;
    document.querySelector('.contact-buttons .contact-button:nth-child(2)').textContent = content_contacts[lang].linkedin;
    document.querySelector('.contact-buttons .contact-button:nth-child(3)').textContent = content_contacts[lang].github;

    const skillsDiv = document.querySelector('#skills div');
    skillsDiv.innerHTML = "";
    content_skills[lang].skills.items.forEach(item => {
        const span = document.createElement('span');
        span.textContent = item;
        span.className = "skill-tag";
        skillsDiv.appendChild(span);
    });

    const experienceList = document.querySelector('#experience ul');
    experienceList.innerHTML = "";
    content_experience[lang].experience.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        experienceList.appendChild(li);
    });

    const menuItems = document.querySelectorAll('[data-lang]');
    menuItems.forEach((item) => {
        const translationKey = item.getAttribute('data-lang'); // Получаем значение атрибута data-lang
        if (menuText[lang] && menuText[lang][translationKey]) {
            item.textContent = menuText[lang][translationKey];
        }
    });
}

