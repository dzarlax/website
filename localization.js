
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
        span.setAttribute('data-skill', item);
        skillsDiv.appendChild(span);
    });

    const skills = skillsDiv.querySelectorAll('.skill-tag');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', function() {
            const skillName = this.getAttribute('data-skill');

            fetch(`https://wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&titles=${skillName}`)
                .then(response => response.json())
                .then(data => {
                    const pages = data.query.pages;
                    const page = Object.values(pages)[0];
                    const extract = page.extract;

                    const tooltip = document.createElement('div');
                    tooltip.classList.add('tooltip');
                    tooltip.innerHTML = extract;

                    document.body.appendChild(tooltip);

                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.left + 'px';
                    tooltip.style.top = (rect.bottom + 10) + 'px';
                    tooltip.style.display = 'block';
                });
        });

        skill.addEventListener('mouseout', function() {
            const tooltips = document.querySelectorAll('.tooltip');
            tooltips.forEach(tooltip => {
                tooltip.remove();
            });
        });
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

