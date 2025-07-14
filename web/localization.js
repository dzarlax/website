// Map skill titles to Font Awesome icons
const skillIcons = {
    'Product Management': 'fas fa-briefcase',
    'UI/UX Prototyping': 'fas fa-layer-group',
    'AI & Development': 'fas fa-brain',
    'Agile Project Management': 'fas fa-code-branch',
    'Mobile Development': 'fas fa-mobile-alt',
    'Data Analysis': 'fas fa-chart-bar',
    'DevOps & Infrastructure': 'fas fa-server',
    'IoT & Systems': 'fas fa-microchip',
    'Управление продуктом': 'fas fa-briefcase',
    'UI/UX прототипирование': 'fas fa-layer-group',
    'ИИ и разработка': 'fas fa-brain',
    'Гибкое управление проектами': 'fas fa-code-branch',
    'Мобильная разработка': 'fas fa-mobile-alt',
    'Анализ данных': 'fas fa-chart-bar',
    'DevOps и инфраструктура': 'fas fa-server',
    'IoT и системы': 'fas fa-microchip',
    'Менаџмент производа': 'fas fa-briefcase',
    'UI/UX прототипирање': 'fas fa-layer-group',
    'АИ и развој': 'fas fa-brain',
    'Флексибилно управљање пројектима': 'fas fa-code-branch',
    'Мобилни развој': 'fas fa-mobile-alt',
    'Анализа података': 'fas fa-chart-bar',
    'DevOps и инфраструктура': 'fas fa-server',
    'IoT и системи': 'fas fa-microchip'
};

// Built-in translations
const translations = {
    en: {
        menu: {
            home: 'Home',
            skills: 'Skills',
            experience: 'Experience',
            education: 'Education',
            achievements: 'Achievements',
            contact: 'Contact',
            projects_nav: 'Projects'
        },
        projects_title: 'Projects',
        view_project: 'View Project',
        intro: {
            title: 'Product Manager',
            description: 'Data-driven product leader with 8+ years guiding mobile & web innovation. Fuse deep analytics with UX intuition and AI-powered development to ship intuitive, high-impact features. Thrive in fast-evolving environments, turning customer insights and OKRs into clear roadmaps and measurable outcomes. Adept storyteller for execs, engineers, and clients alike. Native Russian, fluent English; conversational Serbian.'
        },
        skills: {
            title: 'Technical Proficiencies',
            items: [
                {
                    title: 'Product Management',
                    description: 'OKR, Scrum, Kanban, A/B Testing, Customer Development, Product Roadmapping, comprehensive lifecycle management from ideation to launch.'
                },
                {
                    title: 'UI/UX Prototyping',
                    description: 'Figma, Miro, user-centered design, creating intuitive interfaces, wireframing, user journey mapping, and usability testing.'
                },
                {
                    title: 'AI & Development',
                    description: 'AI tooling, Python, Go, JavaScript, Swift, SwiftUI, React, Next.js, Node.js, vibe-coding, OpenAI API, Prompt Engineering, NLP.'
                },
                {
                    title: 'Agile Project Management',
                    description: 'JIRA, Confluence, Scrum, Kanban, sprint planning, cross-functional team coordination, and continuous improvement methodologies.'
                },
                {
                    title: 'Mobile Development',
                    description: 'Swift, SwiftUI, Xcode, iOS, Android, responsive mobile applications, cross-platform development, and app store optimization.'
                },
                {
                    title: 'Data Analysis',
                    description: 'SQL, MySQL, PostgreSQL, ClickHouse, Metabase, Tableau, Google Analytics, DataGrip, Grafana, analytics and metrics-driven decisions.'
                },
                {
                    title: 'DevOps & Infrastructure',
                    description: 'Git, GitHub Actions, CI/CD, Docker, Kubernetes, Traefik, Linux, macOS, Windows, cloud infrastructure management.'
                },
                {
                    title: 'IoT & Systems',
                    description: 'MQTT, Zigbee2MQTT, Home Assistant, system integration, connected devices, and automation platforms.'
                }
            ]
        },
        experience: {
            title: 'Professional Experience',
            items: [
                {
                    title: 'Senior Product Manager',
                    company: 'Constructor.tech',
                    location: 'Belgrade',
                    period: '10/2024 - Present',
                    description: 'Product portfolio: Groups (video conferencing), Research (VS Code-based web IDE + Kubernetes app hosting), University Chatbots (Campus Assistant & Career Advisor) and the company-wide AI/ML Engine. Drove continuous development of the in-house video-conferencing tool and managed integration of an acquired competitor solution to enrich the feature set for education use-cases.'
                },
                {
                    title: 'Technical Project Manager',
                    company: 'Yandex Cloud',
                    location: 'Moscow-Belgrade',
                    period: '8/2022 - 9/2024',
                    description: 'Managed development team and processes for Yandex\'s data visualization product, Datalens. Coordinated cross-functional teams to ensure timely delivery of features and improvements. Performed Product Manager tasks, including feature design, mockup preparation, and active collaboration with team leads for planning and tracking development stages.'
                },
                {
                    title: 'Product Manager',
                    company: 'Yandex.Market',
                    location: 'Moscow',
                    period: '4/2021 - 8/2022',
                    description: 'Developed and managed the product roadmap for courier platform, gathered and prioritized feature requests, led a team of 10 people, including frontend and backend developers. Successfully implemented all client innovations on time, introduced an analytics system, and automated several processes, reducing the workload on client staff.'
                },
                {
                    title: 'Product Owner',
                    company: 'Russian Post',
                    location: 'Moscow',
                    period: '6/2020 - 4/2021',
                    description: 'Managed multi-disciplinary internal distributed team, that was developing an international service for preparing and validating product information from Russian Post clients for sending it overseas. Hired a full development team and led development of high-load backend for client data validation.'
                },
                {
                    title: 'Product Owner',
                    company: 'Anywayanyday',
                    location: 'Moscow',
                    period: '2/2019 - 6/2020',
                    description: 'Optimized product development by refining mobile development management, contractor selection, and UI/UX prototyping processes. Created analytics system to organize and act on findings from audience studies, product usage patterns, and competitive analyses. Refactored mobile app into Swift and latest Android framework.'
                },
                {
                    title: 'Senior Analyst | Product Manager',
                    company: 'Biglion | Western Union | NAU | Phillip Morris International | Mango Telecom',
                    location: 'Moscow',
                    period: '7/2017 - 2/2019',
                    description: 'Consulted on architecture and data format design for analytics projects. Prepared mobile app launches and website upgrades. Project managed technical development of apps in multiple industries and monitored performance.'
                },
                {
                    title: 'Chief Executive Officer',
                    company: 'Social Technologies',
                    location: 'Moscow',
                    period: '7/2016 - 8/2017',
                    description: 'Managed multi-disciplinary internal team and freelancers to create social media applications and web portals. Directed beta testing, UX/UI improvements and application release. Analysed feedback and competitive landscape to position product appropriately.'
                },
                {
                    title: 'Program Manager | QA Engineer',
                    company: 'Parallels',
                    location: 'Moscow',
                    period: '8/2012 - 12/2015',
                    description: 'Promoted from QA Engineer to Program Manager in 2014 for establishing testing plans and executing QA responsibilities well. Led product update releases, oversaw feature documentation, and incorporated findings from in-app analytics, user feedback, and business needs assessments.'
                }
            ]
        },
        education: {
            title: 'Education & Certifications',
            items: [
                {
                    degree: 'M.S. in Informatics and Telecommunications',
                    institution: 'MIEM HSE',
                    location: 'Moscow, Russia',
                    type: 'degree'
                },
                {
                    degree: 'B.S. in Automation and Computer Science',
                    institution: 'MIEM HSE',
                    location: 'Moscow, Russia',
                    type: 'degree'
                },
                {
                    degree: 'Cisco SMB Account Manager',
                    institution: 'Cisco',
                    type: 'certification'
                },
                {
                    degree: 'Lifesize Certified Sales Professional Network (CSPN)',
                    institution: 'Lifesize',
                    type: 'certification'
                },
                {
                    degree: 'Statistics Basics',
                    institution: 'Stepic',
                    type: 'course'
                },
                {
                    degree: 'Business Metrics in Data-Driven Companies',
                    institution: 'Coursera',
                    type: 'course'
                }
            ]
        },
        education_title: 'Education',
        achievements_title: 'Achievements',
        achievement_1_title: 'AI Products in EdTech and Research',
        achievement_1_desc: 'Contributed to the launch and development of AI platforms for scientific research, grant management, and educational analytics in an international environment',
        achievement_2_title: 'Process Optimization and Metrics Growth',
        achievement_2_desc: 'Improved internal workflows and introduced analytics in Yandex and other teams, resulting in increased efficiency and reduced team overhead',
        achievement_3_title: 'Cross-Functional Team Leadership',
        achievement_3_desc: 'Effectively led distributed teams of designers, analysts, and developers in complex product environments across web, mobile, and desktop',
        achievement_4_title: 'Broad Experience Across IT Products',
        achievement_4_desc: 'Worked on logistics, data visualization, video conferencing, and education-related platforms for both consumer and enterprise markets',
        contacts: {
            contact: 'Contact',
            email: 'Mail me',
            linkedin: 'Check my LinkedIn',
            github: 'My projects',
            rss: 'My news feed',
            download_resume: 'Download Resume'
        },
        footer: {
            copyright: '© 2025 Alexey Panfilov',
            rights: 'All rights reserved',
            home: 'Home',
            projects: 'Projects',
            news: 'News',
            privacy: 'Privacy Policy',
            terms: 'Terms of Use'
        },
        rss: {
            title: 'Dzarlax News',
            loading: 'Loading feed...',
            search_placeholder: 'Search news...',
            no_items: 'No news available',
            read_more: 'Read more',
            back_to_home: 'Home',
            back_to_feed: 'Back to feed',
            share: 'Share',
            page_info: 'Page {current} of {total} ({count} articles)',
            error_loading: 'Failed to load feed',
            error_article: 'Article not found',
            filters: {
                all: 'All',
                today: 'Today',
                week: 'This week',
                month: 'This month'
            }
        }
    },
    ru: {
        menu: {
            home: 'Главная',
            skills: 'Навыки',
            experience: 'Опыт',
            education: 'Образование',
            achievements: 'Достижения',
            contact: 'Контакты',
            projects_nav: 'Проекты'
        },
        projects_title: 'Проекты',
        view_project: 'Посмотреть проект',
        intro: {
            title: 'Продукт-менеджер',
            description: 'Продуктовый лидер, управляемый данными, с 8+ летним опытом руководства мобильными и веб-инновациями. Сочетаю глубокую аналитику с UX-интуицией и AI-разработкой для создания интуитивных, высокоэффективных функций. Процветаю в быстро развивающихся средах, превращая пользовательские инсайты и OKR в четкие дорожные карты и измеримые результаты. Умелый рассказчик для руководителей, инженеров и клиентов. Родной русский, свободный английский; разговорный сербский.'
        },
        skills: {
            title: 'Технические навыки',
            items: [
                {
                    title: 'Управление продуктом',
                    description: 'OKR, Scrum, Kanban, A/B тестирование, Customer Development, дорожные карты продукта, полный жизненный цикл от идеи до запуска.'
                },
                {
                    title: 'UI/UX прототипирование',
                    description: 'Figma, Miro, пользовательский дизайн, создание интуитивных интерфейсов, wireframing, карты пользовательских путей, тестирование юзабилити.'
                },
                {
                    title: 'ИИ и разработка',
                    description: 'AI-инструменты, Python, Go, JavaScript, Swift, SwiftUI, React, Next.js, Node.js, vibe-coding, OpenAI API, Prompt Engineering, NLP.'
                },
                {
                    title: 'Гибкое управление проектами',
                    description: 'JIRA, Confluence, Scrum, Kanban, планирование спринтов, координация кросс-функциональных команд, методологии непрерывного улучшения.'
                },
                {
                    title: 'Мобильная разработка',
                    description: 'Swift, SwiftUI, Xcode, iOS, Android, адаптивные мобильные приложения, кроссплатформенная разработка, оптимизация для App Store.'
                },
                {
                    title: 'Анализ данных',
                    description: 'SQL, MySQL, PostgreSQL, ClickHouse, Metabase, Tableau, Google Analytics, DataGrip, Grafana, решения на основе аналитики и метрик.'
                },
                {
                    title: 'DevOps и инфраструктура',
                    description: 'Git, GitHub Actions, CI/CD, Docker, Kubernetes, Traefik, Linux, macOS, Windows, управление облачной инфраструктурой.'
                },
                {
                    title: 'IoT и системы',
                    description: 'MQTT, Zigbee2MQTT, Home Assistant, интеграция систем, подключенные устройства, платформы автоматизации.'
                }
            ]
        },
        experience: {
            title: 'Опыт работы',
            items: [
                {
                    title: 'Старший продукт-менеджер',
                    company: 'Constructor.tech',
                    location: 'Белград',
                    period: '10/2024 - настоящее время',
                    description: 'Управление портфелем продуктов: Groups (видеоконференции), Research (веб-IDE на основе VS Code + хостинг приложений Kubernetes), University Chatbots (Campus Assistant & Career Advisor) и общая AI/ML платформа компании. Вёл непрерывную разработку внутреннего инструмента видеоконференций и управлял интеграцией приобретённого конкурентного решения для расширения функций для образовательных случаев.'
                },
                {
                    title: 'Технический менеджер проекта',
                    company: 'Яндекс.Облако',
                    location: 'Москва-Белград',
                    period: '8/2022 - 9/2024',
                    description: 'Управлял командой разработки и процессами для продукта визуализации данных Яндекса, Datalens. Координировал кросс-функциональные команды для обеспечения своевременной поставки функций и улучшений. Выполнял задачи Product Manager, включая дизайн функций, подготовку макетов и активное сотрудничество с тимлидами для планирования и отслеживания этапов разработки.'
                },
                {
                    title: 'Менеджер продукта',
                    company: 'Яндекс.Маркет',
                    location: 'Москва',
                    period: '4/2021 - 8/2022',
                    description: 'Разработал и управлял дорожной картой продукта для курьерской платформы, собирал и приоритизировал запросы функций, руководил командой из 10 человек, включая frontend и backend разработчиков. Успешно внедрил все клиентские инновации в срок, внедрил систему аналитики и автоматизировал несколько процессов, снизив нагрузку на клиентский персонал.'
                },
                {
                    title: 'Product Owner',
                    company: 'Почта России',
                    location: 'Москва',
                    period: '6/2020 - 4/2021',
                    description: 'Управлял многопрофильной внутренней распределённой командой, которая разрабатывала международный сервис для подготовки и валидации информации о продукции от клиентов Почты России для отправки за границу. Нанял полную команду разработки и руководил разработкой высоконагруженного бэкенда для валидации клиентских данных.'
                },
                {
                    title: 'Product Owner',
                    company: 'Anywayanyday',
                    location: 'Москва',
                    period: '2/2019 - 6/2020',
                    description: 'Оптимизировал разработку продукта, улучшив управление мобильной разработкой, выбор подрядчиков и процессы UI/UX прототипирования. Создал систему аналитики для организации и действий на основе результатов исследований аудитории, паттернов использования продукта и конкурентного анализа. Перевёл мобильное приложение на Swift и последний Android framework.'
                },
                {
                    title: 'Старший аналитик | Менеджер продукта',
                    company: 'Biglion | Western Union | NAU | Phillip Morris International | Mango Telecom',
                    location: 'Москва',
                    period: '7/2017 - 2/2019',
                    description: 'Консультировал по архитектуре и дизайну форматов данных для аналитических проектов. Подготавливал запуски мобильных приложений и обновления веб-сайтов. Управлял техническим развитием приложений в различных отраслях и мониторил производительность.'
                },
                {
                    title: 'Генеральный директор',
                    company: 'Social Technologies',
                    location: 'Москва',
                    period: '7/2016 - 8/2017',
                    description: 'Управлял многопрофильной внутренней командой и фрилансерами для создания приложений социальных сетей и веб-порталов. Руководил бета-тестированием, улучшениями UX/UI и релизом приложений. Анализировал обратную связь и конкурентный ландшафт для правильного позиционирования продукта.'
                },
                {
                    title: 'Program Manager | QA Engineer',
                    company: 'Parallels',
                    location: 'Москва',
                    period: '8/2012 - 12/2015',
                    description: 'Повышен с QA Engineer до Program Manager в 2014 году за создание планов тестирования и хорошее выполнение QA обязанностей. Руководил релизами обновлений продукта, курировал документацию функций и включал результаты внутриприложной аналитики, отзывов пользователей и оценок бизнес-потребностей.'
                }
            ]
        },
        education: {
            title: 'Образование и сертификаты',
            items: [
                {
                    degree: 'Магистр информатики и телекоммуникаций',
                    institution: 'МИЭМ НИУ ВШЭ',
                    location: 'Москва, Россия',
                    type: 'degree'
                },
                {
                    degree: 'Бакалавр автоматики и информатики',
                    institution: 'МИЭМ НИУ ВШЭ',
                    location: 'Москва, Россия',
                    type: 'degree'
                },
                {
                    degree: 'Cisco SMB Account Manager',
                    institution: 'Cisco',
                    type: 'certification'
                },
                {
                    degree: 'Lifesize Certified Sales Professional Network (CSPN)',
                    institution: 'Lifesize',
                    type: 'certification'
                },
                {
                    degree: 'Основы статистики',
                    institution: 'Stepic',
                    type: 'course'
                },
                {
                    degree: 'Бизнес-метрики в компаниях, управляемых данными',
                    institution: 'Coursera',
                    type: 'course'
                }
            ]
        },
        education_title: 'Образование',
        achievements_title: 'Достижения',
        achievement_1_title: 'AI-продукты в EdTech и науке',
        achievement_1_desc: 'Участвовал в запуске и развитии AI-платформ для научных исследований, управления грантами и образовательной аналитики в международной компании',
        achievement_2_title: 'Оптимизация и рост метрик',
        achievement_2_desc: 'Оптимизировал процессы и внедрил аналитику в командах Яндекса и других продуктов, что привело к росту эффективности и снижению нагрузки на команды',
        achievement_3_title: 'Руководство кросс-функциональными командами',
        achievement_3_desc: 'Успешно выстраивал работу команд из дизайнеров, аналитиков и разработчиков, включая международные распределённые команды в сложных продуктах',
        achievement_4_title: 'Широкий опыт в ИТ-продуктах',
        achievement_4_desc: 'Работал с веб, мобильными и десктопными платформами: от логистики и визуализации данных до видеоконференций и сервисов для студентов и учёных',
        contacts: {
            contact: 'Контакты',
            email: 'Напишите мне',
            linkedin: 'Посмотрите мой LinkedIn',
            github: 'Мои проекты',
            rss: 'Новостной фид',
            download_resume: 'Скачать резюме'
        },
        footer: {
            copyright: '© 2025 Алексей Панфилов',
            rights: 'Все права защищены',
            home: 'Главная',
            projects: 'Проекты',
            news: 'Новости',
            privacy: 'Политика конфиденциальности',
            terms: 'Условия использования'
        },
        rss: {
            title: 'Новости Dzarlax',
            loading: 'Загрузка ленты...',
            search_placeholder: 'Поиск по новостям...',
            no_items: 'Нет доступных новостей',
            read_more: 'Читать полностью',
            back_to_home: 'Главная',
            back_to_feed: 'Назад к ленте',
            share: 'Поделиться',
            page_info: 'Страница {current} из {total} ({count} новостей)',
            error_loading: 'Не удалось загрузить ленту',
            error_article: 'Новость не найдена',
            filters: {
                all: 'Все',
                today: 'Сегодня',
                week: 'За неделю',
                month: 'За месяц'
            }
        }
    },
    rs: {
        menu: {
            home: 'Почетна',
            skills: 'Вештине',
            experience: 'Искуство',
            education: 'Образовање',
            achievements: 'Достигнућа',
            contact: 'Контакт',
            projects_nav: 'Пројекти'
        },
        projects_title: 'Пројекти',
        view_project: 'Погледај пројекат',
        intro: {
            title: 'Продукт менаџер',
            description: 'Лидер производа вођен подацима са 8+ година искуства у руковођењу мобилним и веб иновацијама. Спајам дубоку аналитику са UX интуицијом и AI-развојем за испоруку интуитивних, високоефикасних функција. Процветам у брзо-развијајућим срединама, претварајући корисничке увиде и OKR-ове у јасне путне карте и мерљиве резултате. Вешт приповедач за руководиоце, инжењере и клијенте. Матерњи руски, течан енглески; конверзацијски српски.'
        },
        skills: {
            title: 'Техничке способности',
            items: [
                {
                    title: 'Менаџмент производа',
                    description: 'OKR, Scrum, Kanban, A/B тестирање, Customer Development, путне карте производа, комплетан животни циклус од идеје до лансирања.'
                },
                {
                    title: 'UI/UX прототипирање',
                    description: 'Figma, Miro, кориснички дизајн, стварање интуитивних интерфејса, wireframing, мапе корисничких путања, тестирање употребљивости.'
                },
                {
                    title: 'АИ и развој',
                    description: 'AI алати, Python, Go, JavaScript, Swift, SwiftUI, React, Next.js, Node.js, vibe-coding, OpenAI API, Prompt Engineering, NLP.'
                },
                {
                    title: 'Флексибилно управљање пројектима',
                    description: 'JIRA, Confluence, Scrum, Kanban, планирање спринтова, координација кросс-функционалних тимова, методологије континуираног побољшања.'
                },
                {
                    title: 'Мобилни развој',
                    description: 'Swift, SwiftUI, Xcode, iOS, Android, адаптивне мобилне апликације, кросс-платформски развој, оптимизација за App Store.'
                },
                {
                    title: 'Анализа података',
                    description: 'SQL, MySQL, PostgreSQL, ClickHouse, Metabase, Tableau, Google Analytics, DataGrip, Grafana, решења заснована на аналитици и метрикама.'
                },
                {
                    title: 'DevOps и инфраструктура',
                    description: 'Git, GitHub Actions, CI/CD, Docker, Kubernetes, Traefik, Linux, macOS, Windows, управљање облачном инфраструктуром.'
                },
                {
                    title: 'IoT и системи',
                    description: 'MQTT, Zigbee2MQTT, Home Assistant, интеграција система, повезани уређаји, платформе аутоматизације.'
                }
            ]
        },
        experience: {
            title: 'Професионално искуство',
            items: [
                {
                    title: 'Сениор продукт менаџер',
                    company: 'Constructor.tech',
                    location: 'Београд',
                    period: '10/2024 - сада',
                    description: 'Управљање портфељом производа: Groups (видео конференције), Research (веб-IDE на основу VS Code + Kubernetes хостинг апликација), University Chatbots (Campus Assistant & Career Advisor) и компанијска AI/ML платформа. Водио континуиран развој интерног алата за видео конференције и управљао интеграцијом купљеног конкурентног решења за проширење функција за образовне случајеве.'
                },
                {
                    title: 'Технички менаџер пројекта',
                    company: 'Yandex Cloud',
                    location: 'Москва-Београд',
                    period: '8/2022 - 9/2024',
                    description: 'Управљао тимом за развој и процесима за Yandex производ за визуализацију података, Datalens. Координисао кросс-функционалне тимове за обезбеђивање благовремене испоруке функција и побољшања. Обављао задатке Product Manager-а, укључујући дизајн функција, припрему макета и активну сарадњу са тим лидерима за планирање и праћење фаза развоја.'
                },
                {
                    title: 'Менаџер производа',
                    company: 'Yandex.Market',
                    location: 'Москва',
                    period: '4/2021 - 8/2022',
                    description: 'Развио и управљао путном картом производа за курирску платформу, сакупљао и приоритизовао захтеве за функцијама, водио тим од 10 људи, укључујући frontend и backend програмере. Успешно је имплементирао све клијентске иновације на време, увео систем аналитике и аутоматизовао неколико процеса, смањивши оптерећење клијентског особља.'
                },
                {
                    title: 'Product Owner',
                    company: 'Руска пошта',
                    location: 'Москва',
                    period: '6/2020 - 4/2021',
                    description: 'Управљао мултидисциплинарним интерним дистрибуираним тимом који је развијао међународни сервис за припремање и валидацију информација о производима од клијената Руске поште за слање у иностранство. Запослио је пуни развојни тим и водио развој високо-оптерећеног backend-а за валидацију клијентских података.'
                },
                {
                    title: 'Product Owner',
                    company: 'Anywayanyday',
                    location: 'Москва',
                    period: '2/2019 - 6/2020',
                    description: 'Оптимизовао развој производа побољшавањем управљања мобилним развојем, избором извођача и процесима UI/UX прототипирања. Створио систем аналитике за организовање и деловање на основу резултата студија публике, образаца коришћења производа и конкурентних анализа. Преправио мобилну апликацију у Swift и најновији Android framework.'
                },
                {
                    title: 'Старији аналитичар | Менаџер производа',
                    company: 'Biglion | Western Union | NAU | Phillip Morris International | Mango Telecom',
                    location: 'Москва',
                    period: '7/2017 - 2/2019',
                    description: 'Консултовао о архитектури и дизајну формата података за аналитичке пројекте. Припремао лансирање мобилних апликација и надоградње веб-сајтова. Управљао техничким развојем апликација у више индустрија и пратио перформансе.'
                },
                {
                    title: 'Генерални директор',
                    company: 'Social Technologies',
                    location: 'Москва',
                    period: '7/2016 - 8/2017',
                    description: 'Управљао мултидисциплинарним интерним тимом и фрилансерима за стварање апликација друштвених мрежа и веб портала. Руководио бета тестирањем, побољшањима UX/UI и издавањем апликација. Анализирао повратне информације и конкурентски пејзаж за правилно позиционирање производа.'
                },
                {
                    title: 'Program Manager | QA Engineer',
                    company: 'Parallels',
                    location: 'Москва',
                    period: '8/2012 - 12/2015',
                    description: 'Унапређен са QA Engineer-а на Program Manager-а 2014. године за успостављање планова тестирања и добро извршавање QA одговорности. Водио издања ажурирања производа, надгледао документацију функција и укључивао резултате из in-app аналитике, повратних информација корисника и процена пословних потреба.'
                }
            ]
        },
        education: {
            title: 'Образовање и сертификати',
            items: [
                {
                    degree: 'Магистар информатике и телекомуникација',
                    institution: 'МИЭМ НИУ ВШЭ',
                    location: 'Москва, Русија',
                    type: 'degree'
                },
                {
                    degree: 'Бакалавр аутоматике и информатике',
                    institution: 'МИЭМ НИУ ВШЭ',
                    location: 'Москва, Русија',
                    type: 'degree'
                },
                {
                    degree: 'Cisco SMB Account Manager',
                    institution: 'Cisco',
                    type: 'certification'
                },
                {
                    degree: 'Lifesize Certified Sales Professional Network (CSPN)',
                    institution: 'Lifesize',
                    type: 'certification'
                },
                {
                    degree: 'Основе статистике',
                    institution: 'Stepic',
                    type: 'course'
                },
                {
                    degree: 'Бизнис метрике у компанијама управљаним подацима',
                    institution: 'Coursera',
                    type: 'course'
                }
            ]
        },
        education_title: 'Образовање',
        achievements_title: 'Достигнућа',
        achievement_1_title: 'AI производи у образовању и науци',
        achievement_1_desc: 'Учествовао у развоју и лансирању AI платформи за научна истраживања, управљање грантовима и образовну аналитику у међународном окружењу',
        achievement_2_title: 'Оптимизација процеса и раст метрика',
        achievement_2_desc: 'Унапредио интерне процесе и увео аналитику у тимовима у Јандексу и другим пројектима, што је довело до веће ефикасности и мањег оптерећења тимова',
        achievement_3_title: 'Вођење међутимских тимова',
        achievement_3_desc: 'Успешно водио дистрибуиране тимове дизајнера, аналитичара и програмера у сложеним производима за веб, мобилне и десктоп платформе',
        achievement_4_title: 'Широко искуство у ИТ производима',
        achievement_4_desc: 'Радио на логистици, визуелизацији података, видео конференцијама и образовним платформама за појединце и компаније',
        contacts: {
            contact: 'Контакт',
            email: 'Пошаљите ми имејл',
            linkedin: 'Погледајте мој LinkedIn',
            github: 'Моји пројекти',
            rss: 'Мој новостни фид',
            download_resume: 'Преузми CV'
        },
        footer: {
            copyright: '© 2025 Алексеј Панфилов',
            rights: 'Сва права задржана',
            home: 'Почетна',
            projects: 'Пројекти',
            news: 'Вести',
            privacy: 'Политика приватности',
            terms: 'Услови коришћења'
        },
        rss: {
            title: 'Dzarlax Вести',
            loading: 'Учитавање...',
            search_placeholder: 'Претражи вести...',
            no_items: 'Нема доступних вести',
            read_more: 'Прочитај више',
            back_to_home: 'Почетна',
            back_to_feed: 'Назад на ленту',
            share: 'Подели',
            page_info: 'Страница {current} од {total} ({count} вести)',
            error_loading: 'Неуспешно учитавање ленте',
            error_article: 'Вест није пронађена',
            filters: {
                all: 'Све',
                today: 'Данас',
                week: 'Ове недеље',
                month: 'Овог месеца'
            }
        }
    }
};

// Function to update all localizable content
function updateLocalizedContent() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const data = translations[currentLang];
    if (!data) return;

    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        let translationValue; // Renamed from textContent for clarity

        if (key.includes('.')) {
            // Handle nested keys like 'menu.home', 'footer.copyright', etc.
            const parts = key.split('.');
            const section = parts[0];
            const subKey = parts[1];
            
            if (data[section] && data[section][subKey] !== undefined) {
                translationValue = data[section][subKey];
            }
        } else {
            translationValue = data[key];
        }
        
        if (translationValue !== undefined) {
            if (typeof translationValue === 'string') {
                element.textContent = translationValue;
            } else {
                console.warn(`Translation for key "${key}" in language "${currentLang}" is an object, not a string. Element:`, element);
                // Optionally, to avoid breaking the UI with "[object Object]", 
                // you could set a fallback text or leave the content unchanged.
                // For now, just logging is fine, as the main fix will be in HTML data-lang attributes.
            }
        } else {
            // console.warn(`Translation key "${key}" not found for language "${currentLang}"`);
        }
    });

    // Specific updates for sections not solely relying on data-lang attributes for all text
    if (data.intro) {
        const introTitle = document.querySelector('#intro h2'); // Target specifically
        if (introTitle) {
            // Clear any existing animation first
            if (introTitle.typingTimeout) {
                clearTimeout(introTitle.typingTimeout);
                introTitle.typingTimeout = null;
            }
            // Reset and restart typing animation with proper text length
            startTypingAnimation(introTitle, data.intro.title);
        }
        const introDesc = document.querySelector('#intro p');
        if (introDesc) introDesc.textContent = data.intro.description;
    }

    if (data.skills) {
        const skillsTitle = document.querySelector('#skills h2');
        if (skillsTitle) skillsTitle.textContent = data.skills.title;
        // Skills items are handled by setupSkills
    }
    
    if (data.experience) {
        const experienceTitle = document.querySelector('#experience h2');
        if (experienceTitle) experienceTitle.textContent = data.experience.title;
        // Experience items are handled by updateContent
    }

    if (data.projects_title) { // Ensure this is updated
        const projectsTitleEl = document.querySelector('#projects h2[data-lang="projects_title"]');
        if (projectsTitleEl) projectsTitleEl.textContent = data.projects_title;
    }
    
    if (data.contacts) {
        const contactTitle = document.querySelector('#contact h2');
        if (contactTitle) contactTitle.textContent = data.contacts.contact;
        // Removed direct id-based updates for contact buttons, now handled by data-lang
    }
}

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
    
    // Check if skills container exists (not present on all pages)
    if (!skillsContainer) {
        return;
    }
    
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

    // Update menu items (now handled by updateLocalizedContent)
    // document.querySelectorAll('[data-lang]').forEach(item => {
    //     const key = item.getAttribute('data-lang');
    //     if (data.menu[key]) { // This was specific to menu, adjust for broader use
    //         item.textContent = data.menu[key];
    //     }
    // });
    
    // Call the new comprehensive update function
    updateLocalizedContent(); // This will handle all data-lang elements

    // Specific updates not covered by data-lang or needing complex logic remain here or in setupSkills
    // Update intro section (now handled by updateLocalizedContent)
    // document.querySelector('#intro h2').textContent = data.intro.title;
    // document.querySelector('#intro p').textContent = data.intro.description;

    // Update skills section (title handled by updateLocalizedContent, items by setupSkills)
    // document.querySelector('#skills h2').textContent = data.skills.title;
    setupSkills(lang); // This rebuilds skills which might be necessary

    // Update experience section (title handled by updateLocalizedContent)
    const experienceList = document.querySelector('#experience ul');
    experienceList.innerHTML = '';
    
    data.experience.items.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.setProperty('--i', index + 1);
        
        // Create structured experience item from object
        const dateElem = document.createElement('span');
        dateElem.classList.add('experience-date');
        dateElem.textContent = item.period;
        li.appendChild(dateElem);
        
        const titleElem = document.createElement('div');
        titleElem.classList.add('experience-title');
        titleElem.textContent = item.title;
        li.appendChild(titleElem);
        
        const companyElem = document.createElement('div');
        companyElem.classList.add('experience-company');
        companyElem.textContent = `${item.company}${item.location ? ', ' + item.location : ''}`;
        li.appendChild(companyElem);
        
        if (item.description) {
            const descriptionElem = document.createElement('div');
            descriptionElem.classList.add('experience-description');
            descriptionElem.textContent = item.description;
            li.appendChild(descriptionElem);
        }
        
        experienceList.appendChild(li);
    });

    // Update education section
    const educationList = document.querySelector('#education-list');
    if (educationList && data.education) {
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

    // Update contact section (handled by updateLocalizedContent)
    // document.querySelector('#contact h2').textContent = data.contacts.contact;

    // Update contact buttons (handled by updateLocalizedContent)
    // document.getElementById('emailButton').textContent = data.contacts.email;
    // document.getElementById('linkedinButton').textContent = data.contacts.linkedin;
    // document.getElementById('githubButton').textContent = data.contacts.github;
    // document.getElementById('rssButton').textContent = data.contacts.rss;

    // Update language buttons state
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.remove('active');
    });
    const langBtn = document.getElementById('lang-' + lang);
    if (langBtn) {
        langBtn.classList.add('active');
    }

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
    if (translations[lang]) {
        updateContent(lang); // This already updates localStorage and button states

        // Dispatch the languageChanged event so other modules can update
        const event = new CustomEvent('languageChanged', { detail: { language: lang } });
        document.dispatchEvent(event);
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
        
        // Re-trigger typing animation on resize if needed
        const introTitle = document.querySelector('#intro h2');
        if (introTitle && window.translations) {
            // Clear any existing animation first
            if (introTitle.typingTimeout) {
                clearTimeout(introTitle.typingTimeout);
                introTitle.typingTimeout = null;
            }
            const text = window.translations[currentLang]?.intro?.title || 'Product Manager';
            startTypingAnimation(introTitle, text);
        }
    }, 250);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get preferred language
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = (navigator.language || navigator.userLanguage).split('-')[0];
    const defaultLang = savedLang || (translations[browserLang] ? browserLang : 'en');
    
    // Initial content update
    updateContent(defaultLang); // This will also call updateLocalizedContent
    
    // Hide popover on scroll
    window.addEventListener('scroll', hidePopover);

    // Dispatch languageChanged event for other modules that might need to update
    // This is important if displayProjects relies on it for initial load localization
    const event = new CustomEvent('languageChanged', { detail: { language: defaultLang } });
    document.dispatchEvent(event);
});

// Simple typing animation function
function startTypingAnimation(element, text) {
    if (!element || !text) return;
    
    // Clear any existing timeouts or animations
    if (element.typingTimeout) {
        clearTimeout(element.typingTimeout);
        element.typingTimeout = null;
    }
    
    // Always disable animation on mobile or when screen is narrow
    if (window.innerWidth <= 768) {
        element.textContent = text;
        element.classList.remove('typing-effect');
        element.style.removeProperty('width');
        element.style.removeProperty('white-space');
        element.style.removeProperty('overflow');
        element.style.removeProperty('border-right');
        return;
    }
    
    // Clean up any existing animations
    element.classList.remove('typing-effect');
    element.style.removeProperty('width');
    element.textContent = '';
    
    // For desktop, use simple typewriter effect
    element.classList.add('typing-effect');
    
    let index = 0;
    const typingSpeed = 80; // milliseconds per character
    
    const typeChar = () => {
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1);
            index++;
            element.typingTimeout = setTimeout(typeChar, typingSpeed);
        }
        // Cursor blinking is handled by CSS
    };
    
    // Start typing after a small delay
    element.typingTimeout = setTimeout(typeChar, 300);
}

// Expose for other scripts if needed (e.g. projects.js calling it)
window.updateLocalizedContent = updateLocalizedContent;
window.startTypingAnimation = startTypingAnimation;
window.translations = translations;
