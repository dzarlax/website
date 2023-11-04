
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

function showPopover(text, event) {
    const popover = document.getElementById('popover');
    if (!popover) {
        console.error('Popover element not found');
        return;
    }
    popover.textContent = text;
    popover.style.display = 'block';
    popover.style.left = `${event.pageX}px`;
    popover.style.top = `${event.pageY + 20}px`; // 20 пикселей ниже курсора
}

function hidePopover() {
    const popover = document.getElementById('popover');
    if (popover) {
        popover.style.display = 'none';
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
    const rssButton = document.getElementById('rssButton');

    // Устанавливаем текст с использованием локализационных данных
    emailButton.textContent = localizationData.contacts.email;
    linkedinButton.textContent = localizationData.contacts.linkedin;
    githubButton.textContent = localizationData.contacts.github;
    rssButton.textContent = localizationData.contacts.rss;

    const skillsDiv = document.querySelector('#skills div');
    skillsDiv.innerHTML = "";
    localizationData.skills.items.forEach(item => {
        const span = document.createElement('span');
        span.textContent = item.title; 
        span.classList.add('skill-tag');
        if (window.innerWidth <= 768) {
            // Для мобильных устройств добавляем контейнер для разворачиваемого текста
            const content = document.createElement('div');
            content.classList.add('collapsible-content');
            content.textContent = item.description;
            console.log( content.textContent);
            content.style.display = 'none'; // Скрываем текст по умолчанию
            span.addEventListener('click', function() {
                // При нажатии на span показываем или скрываем текст
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    this.classList.add("active"); // Можно добавить стиль для активного состояния
                } else {
                    content.style.display = 'none';
                    this.classList.remove("active");
                }
            console.log(content)// Добавляем разворачиваемый текст в DOM сразу после span
            span.insertAdjacentElement('afterend', content);
        });

        }
        else {
            // Измените обработчик событий на клик
            span.addEventListener('click', function(event) {
                // Предотвратите распространение события, чтобы не вызвать скрытие всплывающего окна
                event.stopPropagation();
                // Если есть описание, покажите всплывающее окно
                if (item.description && item.description.trim() !== "") {
                    showPopover(item.description, event);
                }
            });
        }
        // Добавляем класс dark_theme если включена темная тема
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            span.classList.add('dark_theme');
        }
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
    // Удаляем класс .active-lang со всех кнопок
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('active-lang');
    });

    // Добавляем класс .active-lang к кнопке, соответствующей выбранному языку
    document.getElementById('lang-' + lang).classList.add('active-lang');
     // Добавьте этот обработчик событий, чтобы закрыть всплывающее окно при клике вне его
     document.addEventListener('click', hidePopover);
}

