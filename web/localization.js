// Map skill titles to Font Awesome icons
const skillIcons = {
    'Product Management': 'fas fa-briefcase',
    'UI/UX Prototyping': 'fas fa-layer-group',
    'Audience/User Analysis': 'fas fa-users',
    'Agile Project Management': 'fas fa-code-branch',
    'Mobile Development': 'fas fa-mobile-alt',
    'Data Analysis': 'fas fa-chart-bar',
    'Process Optimization': 'fas fa-cogs',
    'Product Strategy': 'fas fa-bullseye',
    'Управление продуктом': 'fas fa-briefcase',
    'UI/UX прототипирование': 'fas fa-layer-group',
    'Анализ пользователей': 'fas fa-users',
    'Гибкое управление проектами': 'fas fa-code-branch',
    'Мобильная разработка': 'fas fa-mobile-alt',
    'Анализ данных': 'fas fa-chart-bar',
    'Оптимизация процессов': 'fas fa-cogs',
    'Стратегия продукта': 'fas fa-bullseye',
    'Менаџмент производа': 'fas fa-briefcase',
    'UI/UX прототипирање': 'fas fa-layer-group',
    'Анализа корисника': 'fas fa-users',
    'Флексибилно управљање пројектима': 'fas fa-code-branch',
    'Мобилни развој': 'fas fa-mobile-alt',
    'Анализа података': 'fas fa-chart-bar',
    'Оптимизација процеса': 'fas fa-cogs',
    'Стратегија производа': 'fas fa-bullseye'
};

// Built-in translations
const translations = {
    en: {
        menu: {
            home: 'Home',
            skills: 'Skills',
            experience: 'Experience',
            contact: 'Contact'
        },
        intro: {
            title: 'Product Manager',
            description: 'Data-driven  product and project manager with 8+ years\' experience driving technology innovation. Integrate analytics tools with UI/UX knowledge to develop feature-rich apps that are simple to use. Track record of thriving in constantly evolving environments and leveraging process optimization skills. Adept at communicating goals, analyses, and value propositions. Fluent in Russian and English, basic knowledge of Serbian.'
        },
        skills: {
            title: 'Technical Proficiencies',
            items: [
                {
                    title: 'Product Management',
                    description: 'Overseeing product life cycle from ideation to launch, defining product vision, and aligning project objectives with company goals.'
                },
                {
                    title: 'UI/UX Prototyping',
                    description: 'Designing and testing prototypes to enhance user experience, focusing on creating intuitive and user-friendly interfaces.'
                },
                {
                    title: 'Audience/User Analysis',
                    description: 'Conducting research to understand user demographics, behaviors, and needs to inform user-centered design and product development.'
                },
                {
                    title: 'Agile Project Management',
                    description: 'Utilizing agile methodologies to facilitate adaptive planning, evolutionary development, early delivery, and continual improvement.'
                },
                {
                    title: 'Mobile Development',
                    description: 'Building responsive, high-performing mobile applications tailored for a wide range of devices, operating systems, and user scenarios.'
                },
                {
                    title: 'Data Analysis',
                    description: 'Analyzing datasets to extract actionable insights, inform strategic decisions, and support evidence-based practices.'
                },
                {
                    title: 'Process Optimization',
                    description: 'Streamlining business processes to enhance efficiency, reduce waste, and improve overall operational effectiveness.'
                },
                {
                    title: 'Product Strategy',
                    description: 'Crafting long-term strategic plans for product development, positioning, and market penetration to achieve competitive advantage.'
                }
            ]
        },
        experience: {
            title: 'Professional Experience',
            items: [
                'Seniour Product Manager, Constructor.tech (10/2024 - Present)',
                'Technical Project Manager, Yandex Cloud (8/2022 - 9/2024)',
                'Product Manager, Yandex.Market (4/2021 - 8/2022)',
                'Product Owner, Russian Post (6/2020 - 4/2021)',
                'Product Owner, Anywayanyday (2/2019 - 6/2020)',
                'Senior Analyst | Product Manager, Moscow (7/2017 - 2/2019)',
                'Chief Executive Officer, Social Technologies, Moscow (7/2016 - 8/2017)',
                'QA engineer | Program manager, Parallels (08/2012-12/2017)'
            ]
        },
        contacts: {
            contact: 'Contact',
            email: 'Mail me',
            linkedin: 'Check my LinkedIn',
            github: 'My projects',
            rss: 'My news feed'
        }
    },
    ru: {
        menu: {
            home: 'Главная',
            skills: 'Навыки',
            experience: 'Опыт',
            contact: 'Контакты'
        },
        intro: {
            title: 'Менеджер продукта',
            description: 'Управление продуктами и проектами, основанными на данных, с более чем 8-летним опытом стимулирования технологических инноваций. Интегрирую инструменты аналитики с знаниями UI/UX для создания функциональных приложений, которые просты в использовании. Имею опыт успешной работы в постоянно меняющихся условиях и применяю навыки оптимизации процессов. Умею четко ставить задачи, проводить анализ и формулировать предложения по ценности. Свободно владею русским и английским, имею базовые знания сербского.'
        },
        skills: {
            title: 'Технические навыки',
            items: [
                {
                    title: 'Управление продуктом',
                    description: 'Разработка и реализация стратегий продукта, включая планирование выпусков и управление жизненным циклом продукта.'
                },
                {
                    title: 'UI/UX прототипирование',
                    description: 'Создание макетов интерфейса и экспериментирование с пользовательскими путешествиями для обеспечения интуитивно понятного пользовательского опыта.'
                },
                {
                    title: 'Анализ пользователей',
                    description: 'Исследование потребностей и поведения целевой аудитории для улучшения функциональности и доступности продуктов.'
                },
                {
                    title: 'Гибкое управление проектами',
                    description: 'Применение гибких методологий, таких как Scrum и Kanban, для улучшения сотрудничества в команде и эффективности работы над проектами.'
                },
                {
                    title: 'Мобильная разработка',
                    description: 'Проектирование и разработка мобильных приложений для различных платформ, с учетом лучших практик и трендов в области мобильных технологий.'
                },
                {
                    title: 'Анализ данных',
                    description: 'Использование статистических инструментов и методов машинного обучения для извлечения значимых выводов из больших наборов данных.'
                },
                {
                    title: 'Оптимизация процессов',
                    description: 'Улучшение бизнес-процессов для повышения производительности, эффективности и качества работы.'
                },
                {
                    title: 'Стратегия продукта',
                    description: 'Формирование долгосрочного видения продукта и определение ключевых направлений развития, чтобы соответствовать требованиям рынка и достигнуть бизнес-целей.'
                }
            ]
        },
        experience: {
            title: 'Опыт работы',
            items: [
                'Старший продукт-менеджер, Constructor.tech (10/2024 - настоящее время)',
                'Технический менеджер проекта, Яндекс.Облако (8/2022 - 9/2024)',
                'Менеджер продукта, Яндекс.Маркет (4/2021 - 8/2022)',
                'Product Owner, Почта России (6/2020 - 4/2021)',
                'Product Owner, Anywayanyday (2/2019 - 6/2020)',
                'Старший аналитик | Менеджер продукта, Москва (7/2017 - 2/2019)',
                'Генеральный директор, Social Technologies, Москва (7/2016 - 8/2017)',
                'QA инженер | Program manager, Parallels (08/2012-12/2017)'
            ]
        },
        contacts: {
            contact: 'Контакты',
            email: 'Напишите мне',
            linkedin: 'Посмотрите мой LinkedIn',
            github: 'Мои проекты',
            rss: 'Новостной фид'
        }
    },
    rs: {
        menu: {
            home: 'Почетна',
            skills: 'Вештине',
            experience: 'Искуство',
            contact: 'Контакт'
        },
        intro: {
            title: 'Продукт Менаџер',
            description: 'Управљање производима и пројектима засновано на подацима са више од 8 година искуства у погону технолошке иновације. Интегришем алатке за аналитику са знањем о UI/UX да би развио апликације богате функцијама које су једноставне за коришћење. Имам доказану способност рада у стално мењајућим срединама и коришћења вештина оптимизације процеса. Способан за комуницирање циљева, анализа и предлога вредности. Течно говорим руски и енглески, основно знање српског.'
        },
        skills: {
            title: 'Техничке способности',
            items: [
                {
                    title: 'Менаџмент производа',
                    description: 'Надгледање животног циклуса производа од идеје до покретања, дефинисање визије производа и усклађивање пројектних циљева са циљевима компаније.'
                },
                {
                    title: 'UI/UX прототипирање',
                    description: 'Дизајнирање и тестирање прототипова за побољшање корисничког искуства, са фокусом на стварање интуитивних и лако користивих интерфејса.'
                },
                {
                    title: 'Анализа корисника',
                    description: 'Истраживање за разумевање демографије корисника, понашања и потреба ради информисања кориснички оријентисаног дизајна и развоја производа.'
                },
                {
                    title: 'Флексибилно управљање пројектима',
                    description: 'Коришћење агилних методологија за омогућавање адаптивног планирања, еволутивног развоја, ране испоруке и континуираног побољшања.'
                },
                {
                    title: 'Мобилни развој',
                    description: 'Креирање одзивних и високопроизводних мобилних апликација прилагођених широком спектру уређаја, оперативних система и корисничких сценарија.'
                },
                {
                    title: 'Анализа података',
                    description: 'Анализирање скупова података за извлачење акционих увида, информисање стратешких одлука и подршка пракси базираној на доказима.'
                },
                {
                    title: 'Оптимизација процеса',
                    description: 'Побољшање пословних процеса за повећање ефикасности, смањење отпада и побољшање укупне оперативне ефективности.'
                },
                {
                    title: 'Стратегија производа',
                    description: 'Креирање дугорочних стратешких планова за развој производа, позиционирање и продор на тржиште у циљу постизања конкурентске предности.'
                }
            ]
        },
        experience: {
            title: 'Професионално искуство',
            items: [
                'Сениор продукт менаџер, Constructor.tech (10/2024 - сада)',
                'Технички менаџер пројекта, Yandex Облак (8/2022 - 9/2024)',
                'Менаџер производа, Yandex.Маркет (4/2021 - 8/2022)',
                'Product Owner, Руска пошта (6/2020 - 4/2021)',
                'Product Owner, Anywayanyday (2/2019 - 6/2020)',
                'Стари аналитичар | Менаџер производа, Москва (7/2017 - 2/2019)',
                'Генерални директор, Social Technologies, Москва (7/2016 - 8/2017)',
                'QA инжењер | Менаџер програма, Parallels (08/2012-12/2017)'
            ]
        },
        contacts: {
            contact: 'Контакт',
            email: 'Пошаљи ми е-пошту',
            linkedin: 'Проверите мој LinkedIn',
            github: 'Моји пројекти',
            rss: 'Мој новостни фид'
        }
    }
};

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

// Skills interaction setup
function setupSkills(lang) {
    const data = translations[lang];
    const skillsContainer = document.querySelector('#skills div');
    skillsContainer.innerHTML = '';
    
    data.skills.items.forEach((item, index) => {
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
            skillTag.addEventListener('click', function() {
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

        skillsContainer.appendChild(skillTag);
    });
}

// Content update function
function updateContent(lang) {
    const data = translations[lang];
    if (!data) return;

    // Update menu items
    document.querySelectorAll('[data-lang]').forEach(item => {
        const key = item.getAttribute('data-lang');
        if (data.menu[key]) {
            item.textContent = data.menu[key];
        }
    });

    // Update intro section
    document.querySelector('#intro h2').textContent = data.intro.title;
    document.querySelector('#intro p').textContent = data.intro.description;

    // Update skills section
    document.querySelector('#skills h2').textContent = data.skills.title;
    setupSkills(lang);

    // Update experience section
    document.querySelector('#experience h2').textContent = data.experience.title;
    const experienceList = document.querySelector('#experience ul');
    experienceList.innerHTML = '';
    
    data.experience.items.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.setProperty('--i', index + 1);
        
        // Parse the experience item to extract components
        const parts = item.split(', ');
        let title = '';
        let company = '';
        let dateRange = '';
        
        // Extract date range (usually at the end in parentheses)
        const dateMatch = item.match(/\(([^)]+)\)$/);
        if (dateMatch && dateMatch[1]) {
            dateRange = dateMatch[1];
        }
        
        // Extract title and company
        if (parts.length >= 2) {
            title = parts[0];
            // Remove the date part from the company
            company = parts[1].replace(/\s*\([^)]*\)$/, '');
        } else {
            title = item.replace(/\s*\([^)]*\)$/, '');
        }
        
        // Create structured experience item
        const dateElem = document.createElement('span');
        dateElem.classList.add('experience-date');
        dateElem.textContent = dateRange;
        li.appendChild(dateElem);
        
        const titleElem = document.createElement('div');
        titleElem.classList.add('experience-title');
        titleElem.textContent = title;
        li.appendChild(titleElem);
        
        if (company) {
            const companyElem = document.createElement('div');
            companyElem.classList.add('experience-company');
            companyElem.textContent = company;
            li.appendChild(companyElem);
        }
        
        experienceList.appendChild(li);
    });

    // Update contact section
    document.querySelector('#contact h2').textContent = data.contacts.contact;

    // Update contact buttons
    document.getElementById('emailButton').textContent = data.contacts.email;
    document.getElementById('linkedinButton').textContent = data.contacts.linkedin;
    document.getElementById('githubButton').textContent = data.contacts.github;
    document.getElementById('rssButton').textContent = data.contacts.rss;

    // Update language buttons state
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById('lang-' + lang).classList.add('active');

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

// Language switcher function
function switchLang(lang) {
    console.log("Switching language to:", lang);
    if (translations[lang]) {
        updateContent(lang);
        console.log("Language switched successfully");
    } else {
        console.error("Translation not found for language:", lang);
    }
}

// Window resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        setupSkills(currentLang);
    }, 250);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get preferred language
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = (navigator.language || navigator.userLanguage).split('-')[0];
    const defaultLang = savedLang || (translations[browserLang] ? browserLang : 'en');
    
    // Initial content update
    updateContent(defaultLang);
    
    // Hide popover on scroll
    window.addEventListener('scroll', hidePopover);
});
