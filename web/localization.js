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
        news_title: 'Latest News',
        view_all_news: 'View All News',
        read_more: 'Read More',
        ai_philosophy_title: 'AI Philosophy',
        ai_philosophy_pragmatic_title: 'Pragmatic AI',
        ai_philosophy_pragmatic_desc: 'Focus on fine-tuned small language models over generic LLMs. Cost-effective, privacy-preserving solutions for business-critical tasks.',
        ai_philosophy_privacy_title: 'Data Privacy First',
        ai_philosophy_privacy_desc: 'On-premise deployments. No data leaves your infrastructure. GDPR-compliant by design. Essential for enterprise adoption.',
        ai_philosophy_augmented_title: 'AI-Augmented Development',
        ai_philosophy_augmented_desc: 'Leveraging Cursor, Claude Code, and LLM agents to bridge ideation and implementation. 10x faster prototyping while maintaining quality.',
        menu_home: 'Back to Home',
        ai_workflow_title: 'AI-Native Workflow',
        ai_workflow_subtitle: 'Bridging the Gap Between Ideation and Implementation',
        ai_workflow_tools: 'Powered by Cursor, Claude Code, LLM Agents',
        ai_workflow_speed: '10x Faster Prototyping',
        philosophy_title: 'My AI Philosophy',
        philosophy_intro: "As a Product Manager who codes, I've developed a unique AI-augmented workflow that allows me to move from idea to working prototype in hours, not days. This isn't about replacing developers—it's about breaking down the friction between product thinking and technical implementation.",
        principle_1_title: 'Think in Systems',
        principle_1_desc: 'AI helps me think through architecture, dependencies, and edge cases before writing a single line of code.',
        principle_2_title: 'Ship Fast, Iterate',
        principle_2_desc: 'Rapid prototyping means I can validate ideas with real users and code, not just slides and specs.',
        principle_3_title: 'Deep Developer Empathy',
        principle_3_desc: 'Building things myself gives me first-hand understanding of technical constraints and developer pain points.',
        tools_title: 'My Toolkit',
        cursor_desc: 'My primary development environment. AI pair programming that understands context, suggests entire functions, and helps me write production-ready code faster.',
        cursor_f1: 'Context-aware code suggestions',
        cursor_f2: 'Natural language to SQL queries',
        cursor_f3: 'Multi-file refactoring with AI',
        cursor_f4: 'Bug detection and fixing assistance',
        claude_desc: 'AI CLI tool for code analysis, architecture discussions, and deep codebase understanding. Essential for rapid prototyping and code review.',
        claude_f1: 'Analyze entire codebases in seconds',
        claude_f2: 'Discuss architecture trade-offs',
        claude_f3: 'Generate boilerplate code instantly',
        claude_f4: 'Explain complex logic simply',
        agents_title: 'Custom LLM Agents',
        agents_desc: "Purpose-built AI agents for specific tasks: code review, test generation, documentation, and data analysis workflows.",
        agents_f1: 'Automated code review agents',
        agents_f2: 'Test generation from specs',
        agents_f3: 'Documentation writers',
        agents_f4: 'Data analytics assistants',
        process_title: 'My Process',
        step_1_title: 'Ideation & Requirements',
        step_1_desc: 'Use LLMs to think through requirements, edge cases, and user stories. Get instant feedback on product decisions from an AI perspective.',
        step_2_title: 'Architecture Design',
        step_2_desc: 'Discuss system architecture with AI. Evaluate trade-offs between different approaches. Generate database schemas and API designs in minutes.',
        step_3_title: 'Rapid Prototyping',
        step_3_desc: 'Use Cursor to generate boilerplate, implement features, and handle edge cases. Ship a working MVP in hours, not weeks.',
        step_4_title: 'Validation & Iteration',
        step_4_desc: 'Get real feedback from users. Use AI to analyze usage patterns, identify improvements, and iterate rapidly.',
        benefits_title: 'Why This Works',
        benefit_1_title: '10x Faster',
        benefit_1_desc: 'From idea to working prototype in hours instead of days or weeks.',
        benefit_2_title: 'Higher Quality',
        benefit_2_desc: 'AI catches edge cases I miss, suggests better patterns, and acts as a senior code reviewer.',
        benefit_3_title: 'Better Products',
        benefit_3_desc: 'Hands-on experience means I understand technical constraints before promising features.',
        benefit_4_title: 'Developer Empathy',
        benefit_4_desc: 'I feel the pain of technical debt, poor specs, and changing requirements firsthand.',
        cta_title: 'Interested in Collaboration?',
        cta_desc: "I'm always looking for opportunities to leverage AI-augmented development to build innovative products.",
        cta_button: 'Get in Touch',
        footer_text: '© 2024 Alexey Panfilov. Built with AI-augmented development.',
        intro: {
            title: 'Head of Product',
            description: "<strong>AI-Native Product Executive</strong> with 15 years building high-load systems and product portfolios from 0 to 1. Don't treat AI as magic - understand the difference between prompt engineering and agent-based systems, knowing when to use generic LLMs vs. fine-tuned small models for business-critical tasks. Don't limit myself to major LLM vendors - constantly testing and evaluating new models and approaches.<br><br>" +
                "Leveraging <strong>Cursor, Claude Code, and LLM agents</strong> to bridge ideation and technical execution - enabling rapid MVP prototyping with deep developer empathy. Successfully delivered systems at <strong>Yandex & Russian Post</strong> serving millions of users. Thrive in fast-evolving R&D environments, turning customer insights and OKRs into clear roadmaps and measurable outcomes. Adept storyteller for execs, engineers, and clients alike.<br><br>" +
                "<strong>Languages:</strong> Native Russian, fluent English, conversational Serbian."
        },
        skills: {
            title: 'Core Competencies',
            items: [
                {
                    title: 'AI-Augmented Product Leadership',
                    description: 'AI-native workflows using Cursor, Claude Code, and LLM agents for rapid prototyping and deep developer empathy. Bridge gap between ideation and technical execution, enabling 10x faster MVP development while maintaining strategic oversight.'
                },
                {
                    title: 'Portfolio & Strategy Management',
                    description: 'Orchestrating strategy across multiple concurrent products while managing several cross-functional teams with limited resources. Prioritizing based on business impact and technical feasibility while maintaining roadmap clarity and stakeholder alignment.'
                },
                {
                    title: 'Analytics-Driven Decision Making',
                    description: 'Building comprehensive analytics infrastructure from scratch across organizations. Transforming data chaos into actionable insights. SQL-first approach with deep expertise in ClickHouse, PostgreSQL, and BI tools for executive-level reporting.'
                },
                {
                    title: 'Enterprise-Grade AI Implementation',
                    description: 'Pragmatic AI focusing on fine-tuned small language models over generic LLMs. Data privacy-first approach with on-premise solutions. Successfully deploying AI systems serving millions of users in regulated environments.'
                }
            ],
            subsections: [
                {
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
                    description: "<strong>Product Portfolio:</strong> Orchestrate strategy for multiple AI/ML products including ResearchPelt (computational platform for scientists), VS Code-based web IDE, University Chatbots, Groups with LLM integration, Model Engine, and Insights analytics platform.<br><br><strong>Team Leadership:</strong> Lead cross-functional teams while balancing resource allocation across high-stakes projects. Prioritize based on immediate business impact and technical feasibility.<br><br><strong>AI Advocacy:</strong> Serve as internal AI Advocate training product managers on AI agent development. Deliver enterprise-grade fine-tuned models for specialized business tasks."
                },
                {
                    title: 'Technical Project Manager',
                    company: 'Yandex Cloud',
                    location: 'Moscow-Belgrade',
                    period: '8/2022 - 9/2024',
                    description: "<strong>Product Management:</strong> Managed development team and processes for Yandex's data visualization product Datalens. Performed feature design, mockup preparation, and collaboration with team leads for planning and tracking development stages.<br><br><strong>Team Coordination:</strong> Coordinated cross-functional teams to ensure timely delivery of features and improvements in fast-paced environment."
                },
                {
                    title: 'Product Manager',
                    company: 'Yandex.Market',
                    location: 'Moscow',
                    period: '4/2021 - 8/2022',
                    description: "<strong>Product Strategy:</strong> Led product roadmap for hyper-growth courier platform. Contributed to development of automated courier assignment system implementing algorithmic routing.<br><br><strong>Analytics Infrastructure:</strong> Built comprehensive analytics infrastructure enabling data-driven operational decisions.<br><br><strong>Team Leadership:</strong> Led 10-person cross-functional team delivering 100% of client innovations on schedule."
                },
                {
                    title: 'Product Owner',
                    company: 'Russian Post',
                    location: 'Moscow',
                    period: '6/2020 - 4/2021',
                    description: "<strong>Product Development:</strong> Built and led distributed team creating high-load validation engine processing data for international giants including iHerb and AliExpress.<br><br><strong>Compliance:</strong> Ensured 100% GDPR compliance and significantly reduced data entry errors through automated validation workflows.<br><br><strong>Team Building:</strong> Hired and managed full-stack development team from scratch."
                },
                {
                    title: 'Product Owner',
                    company: 'Anywayanyday',
                    location: 'Moscow',
                    period: '2/2019 - 6/2020',
                    description: "<strong>Process Optimization:</strong> Refined mobile development management, contractor selection, and UI/UX prototyping processes.<br><br><strong>Analytics:</strong> Created analytics system to organize and act on findings from audience studies, product usage patterns, and competitive analyses.<br><br><strong>Technical:</strong> Refactored mobile app using Swift and latest Android framework."
                },
                {
                    title: 'Senior Analyst | Product Manager',
                    company: 'Biglion | Western Union | NAU | Phillip Morris International | Mango Telecom',
                    location: 'Moscow',
                    period: '7/2017 - 2/2019',
                    description: "<strong>Consulting:</strong> Advised on architecture and data format design for analytics projects across multiple industries.<br><br><strong>Product Management:</strong> Prepared mobile app launches and website upgrades. Project managed technical development of apps and monitored performance."
                },
                {
                    title: 'Chief Executive Officer',
                    company: 'Social Technologies',
                    location: 'Moscow',
                    period: '7/2016 - 8/2017',
                    description: "<strong>Team Management:</strong> Managed multi-disciplinary internal team and freelancers to create social media applications and web portals.<br><br><strong>Product Direction:</strong> Directed beta testing, UX/UI improvements and application release. Analyzed feedback and competitive landscape to position product appropriately."
                },
                {
                    title: 'Program Manager | QA Engineer',
                    company: 'Parallels',
                    location: 'Moscow',
                    period: '8/2012 - 12/2015',
                    description: "<strong>Career Growth:</strong> Promoted from QA Engineer to Program Manager in 2014 for establishing testing plans and executing QA responsibilities.<br><br><strong>Product Management:</strong> Led product update releases, oversaw feature documentation, and incorporated findings from in-app analytics, user feedback, and business needs assessments."
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
        news_title: 'Последние новости',
        view_all_news: 'Все новости',
        read_more: 'Читать далее',
        ai_philosophy_title: 'Философия AI',
        ai_philosophy_pragmatic_title: 'Прагматичный AI',
        ai_philosophy_pragmatic_desc: 'Фокус на дообученных небольших моделях вместо универсальных LLM. Эффективные по стоимости, приватные решения для бизнес-критичных задач.',
        ai_philosophy_privacy_title: 'Приватность Данных — Приоритет',
        ai_philosophy_privacy_desc: 'On-premise развертывания. Данные не покидают вашу инфраструктуру. GDPR-совместимость по дизайну. Критически важно для enterprise.',
        ai_philosophy_augmented_title: 'AI-Augmented Разработка',
        ai_philosophy_augmented_desc: 'Использование Cursor, Claude Code и LLM агентов для соединения идей и реализации. 10x более быстрое прототипирование при сохранении качества.',
        menu_home: 'На главную',
        ai_workflow_title: 'AI-Native Подход',
        ai_workflow_subtitle: 'Соединение идей и технической реализации',
        ai_workflow_tools: 'На базе Cursor, Claude Code, LLM агентов',
        ai_workflow_speed: '10x быстрое прототипирование',
        philosophy_title: 'Моя AI философия',
        philosophy_intro: 'Как Product Manager, который кодит, я разработал уникальный AI-augmented подход, который позволяет мне двигаться от идеи к рабочему прототипу за часы, а не дни. Это не про замену разработчиков — это про устрение трения между продуктовым мышлением и технической реализацией.',
        principle_1_title: 'Думать системно',
        principle_1_desc: 'AI помогает мне продумать архитектуру, зависимости и edge cases до написания единой строчки кода.',
        principle_2_title: 'Быстрый запуск, итерации',
        principle_2_desc: 'Быстрое прототипирование означает, что я могу проверять идеи с реальными пользователями и кодом, а не слайдами и спецификациями.',
        principle_3_title: 'Глубокая эмпатия к разработчикам',
        principle_3_desc: 'Создание продуктов своими руками дает мне firsthand понимание технических ограничений и проблем разработчиков.',
        tools_title: 'Мой инструментарий',
        cursor_desc: 'Моя основная среда разработки. AI pair programming, который понимает контекст, предлагает целые функции и помогает мне писать production-ready код быстрее.',
        cursor_f1: 'Контекстные предложения кода',
        cursor_f2: 'Естественный язык в SQL запросы',
        cursor_f3: 'Мультифайловый рефакторинг с AI',
        cursor_f4: 'Обнаружение багов и помощь в исправлении',
        claude_desc: 'AI CLI инструмент для анализа кода, обсуждения архитектуры и глубокого понимания кодовой базы. Необходим для быстрого прототипирования и code review.',
        claude_f1: 'Анализ целых кодовых баз за секунды',
        claude_f2: 'Обсуждение архитектурных trade-offs',
        claude_f3: 'Мгновенная генерация boilerplate кода',
        claude_f4: 'Простое объяснение сложной логики',
        agents_title: 'Custom LLM агенты',
        agents_desc: 'Специальные AI агенты для специфических задач: code review, генерация тестов, документация и data аналитические workflows.',
        agents_f1: 'Автоматизированные агенты code review',
        agents_f2: 'Генерация тестов из спецификаций',
        agents_f3: 'Генераторы документации',
        agents_f4: 'Ассистенты data аналитики',
        process_title: 'Мой процесс',
        step_1_title: 'Идеация и требования',
        step_1_desc: 'Использую LLM для проработки требований, edge cases и user stories. Получаю мгновенную обратную связь по продуктовым решениям с AI точки зрения.',
        step_2_title: 'Дизайн архитектуры',
        step_2_desc: 'Обсуждаю системную архитектуру с AI. Оцениваю trade-offs между разными подходами. Генерирую database схемы и API дизайны за минуты.',
        step_3_title: 'Быстрое прототипирование',
        step_3_desc: 'Использую Cursor для генерации boilerplate, внедрения features и обработки edge cases. Запускаю рабочий MVP за часы, а не недели.',
        step_4_title: 'Валидация и итерации',
        step_4_desc: 'Получаю реальную обратную связь от пользователей. Использую AI для анализа паттернов использования, выявления улучшений и быстрых итераций.',
        benefits_title: 'Почему это работает',
        benefit_1_title: '10x быстрее',
        benefit_1_desc: 'От идеи до рабочего прототипа за часы вместо дней или недель.',
        benefit_2_title: 'Выше качество',
        benefit_2_desc: 'AI ловит edge cases, которые я пропускаю, предлагает лучшие паттерны и выступает как сениор code reviewer.',
        benefit_3_title: 'Лучше продукты',
        benefit_3_desc: 'Руки-on опыт означает, что я понимаю технические ограничения до обещания features.',
        benefit_4_title: 'Developer эмпатия',
        benefit_4_desc: 'Я чувствую боль технического долга, плохих спецификаций и меняющихся требований firsthand.',
        cta_title: 'Заинтересован в сотрудничестве?',
        cta_desc: 'Я всегда ищу возможности использовать AI-augmented разработку для создания инновационных продуктов.',
        cta_button: 'Свяжитесь',
        footer_text: '© 2024 Алексей Панфилов. Создано с AI-augmented разработкой.',
        intro: {
            title: 'Head of Product',
            description: '<strong>AI-Native продуктовый лидер</strong> с 15-летним опытом создания нагруженных систем и управления продуктовыми портфелями с нуля. Не рассматриваю AI как магию - понимаю разницу между промптингом и агентскими системами, знаю когда использовать универсальные LLM, а когда дообучать небольшие модели для бизнес-задач. Не ограничиваюсь основными LLM вендорами - постоянно тестирую и оцениваю новые модели и подходы.<br><br>' +
                'Использую <strong>Cursor, Claude Code и LLM агентов</strong> для соединения идей и технической реализации, быстрого прототипирования MVP и глубокого понимания разработчиков. Построил системы в <strong>Яндексе и Почте России</strong>, обслуживающие миллионы пользователей. Работаю в быстроменяющихся R&D окружениях, превращая customer insights и OKRs в четкие roadmaps и измеримые результаты. Умею говорить с execs, инженерами и клиентами на одном языке.<br><br>' +
                '<strong>Языки:</strong> Русский родной, английский свободно, сербский - базовый уровень.'
        },
        skills: {
            title: 'Ключевые компетенции',
            items: [
                {
                    title: 'AI-Augmented Продуктовое Лидерство',
                    description: 'AI-native рабочие процессы с использованием Cursor, Claude Code и LLM агентов для быстрого прототипирования и глубокого понимания разработчиков. Соединяю идеи и техническую реализацию, обеспечивая 10x более быструю разработку MVP при сохранении стратегического контроля.'
                },
                {
                    title: 'Управление Портфелем и Стратегией',
                    description: 'Оркестрация стратегии для нескольких одновременных продуктов с ограниченными ресурсами. Приоритизация на основе бизнес-воздействия и технической выполнимости. Управление несколькими кросс-функциональными командами при сохранении прозрачности roadmap и alignment стейкхолдеров.'
                },
                {
                    title: 'Аналитически-Обоснованные Решения',
                    description: 'Построение комплексной аналитической инфраструктуры с нуля в разных организациях. Превращение хаоса данных в действенные инсайты. SQL-first подход с глубокой экспертизой в ClickHouse, PostgreSQL и BI инструментах для отчетности на уровне исполнительного директоров.'
                },
                {
                    title: 'Enterprise-Grade Внедрение AI',
                    description: 'Прагматичный AI с фокусом на fine-tuned небольшие модели вместо универсальных LLM. Подход data privacy-first с on-premise решениями. Успешное развертывание AI систем для миллионов пользователей в регламентированных средах.'
                }
            ],
            subsections: [
                {
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
                    description: "<strong>Продуктовый портфель:</strong> Управляю стратегией множества AI/ML продуктов включая ResearchPelt (платформа для ученых), веб-IDE на базе VS Code, University Chatbots, Groups с интеграцией LLM, Model Engine и Insights.<br><br><strong>Лидерство:</strong> Руковожу кросс-функциональными командами, балансируя распределение ресурсов между высокоприоритетными проектами. Приоритизирую на основе бизнес-воздействия и технической выполнимости.<br><br><strong>AI Advocacy:</strong> Выступаю как внутренний AI Advocate, обучаю продакт-менеджеров разработке AI агентов. Доставляю enterprise-grade fine-tuned модели для бизнес-задач."
                },
                {
                    title: 'Технический менеджер проекта',
                    company: 'Яндекс.Облако',
                    location: 'Москва-Белград',
                    period: '8/2022 - 9/2024',
                    description: "<strong>Продукт-менеджмент:</strong> Управлял командой разработки и процессами для продукта визуализации данных Datalens. Выполнял дизайн функций, подготовку макетов и сотрудничество с тимлидами.<br><br><strong>Координация:</strong> Координировал кросс-функциональные команды для обеспечения своевременной поставки функций и улучшений в быстром окружении."
                },
                {
                    title: 'Менеджер продукта',
                    company: 'Яндекс.Маркет',
                    location: 'Москва',
                    period: '4/2021 - 8/2022',
                    description: "<strong>Стратегия:</strong> Управлял roadmap для быстрорастущей курьерской платформы. Участвовал в развитии системы автоматического назначения курьеров с алгоритмической маршрутизацией.<br><br><strong>Аналитика:</strong> Построил комплексную аналитику для data-driven операционных решений.<br><br><strong>Лидерство:</strong> Руководил командой из 10 человек, обеспечив 100% своевременную доставку клиентских инноваций."
                },
                {
                    title: 'Product Owner',
                    company: 'Почта России',
                    location: 'Москва',
                    period: '6/2020 - 4/2021',
                    description: "<strong>Разработка:</strong> Построил и возглавил распределенную команду, создавшую high-load валидационный движок для обработки данных международных гигантов включая iHerb и AliExpress.<br><br><strong>Compliance:</strong> Обеспечил 100% GDPR compliance и существенно снизил ошибки ввода данных через автоматическую валидацию.<br><br><strong>Команда:</strong> Нанял и управлял full-stack командой разработки с нуля."
                },
                {
                    title: 'Product Owner',
                    company: 'Anywayanyday',
                    location: 'Москва',
                    period: '2/2019 - 6/2020',
                    description: "<strong>Оптимизация:</strong> Улучшил управление мобильной разработкой, выбор подрядчиков и процессы UI/UX прототипирования.<br><br><strong>Аналитика:</strong> Создал систему аналитики для организации и действий на основе исследований аудитории и конкурентного анализа.<br><br><strong>Технологии:</strong> Перевёл мобильное приложение на Swift и последний Android framework."
                },
                {
                    title: 'Старший аналитик | Менеджер продукта',
                    company: 'Biglion | Western Union | NAU | Phillip Morris International | Mango Telecom',
                    location: 'Москва',
                    period: '7/2017 - 2/2019',
                    description: "<strong>Консалтинг:</strong> Консультировал по архитектуре и дизайну форматов данных для аналитических проектов в различных отраслях.<br><br><strong>Продукт-менеджмент:</strong> Подготавливал запуски мобильных приложений и обновления веб-сайтов. Управлял техническим развитием приложений и мониторил производительность."
                },
                {
                    title: 'Генеральный директор',
                    company: 'Social Technologies',
                    location: 'Москва',
                    period: '7/2016 - 8/2017',
                    description: "<strong>Управление командой:</strong> Управлял многопрофильной внутренней командой и фрилансерами для создания приложений социальных сетей и веб-порталов.<br><br><strong>Продуктовая стратегия:</strong> Руководил бета-тестированием, улучшениями UX/UI и релизом приложений. Анализировал обратную связь и конкурентный ландшафт."
                },
                {
                    title: 'Program Manager | QA Engineer',
                    company: 'Parallels',
                    location: 'Москва',
                    period: '8/2012 - 12/2015',
                    description: "<strong>Карьерный рост:</strong> Повышен с QA Engineer до Program Manager в 2014 году за разработку тест-планов и успешное выполнение QA обязанностей.<br><br><strong>Продукт-менеджмент:</strong> Руководил релизами обновлений, вел документацию функций и внедрял выводы аналитики, отзывов пользователей и бизнес-метрик в roadmap."
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
        news_title: 'Најновије вести',
        view_all_news: 'Све вести',
        read_more: 'Прочитај више',
        ai_philosophy_title: 'AI Филозофија',
        ai_philosophy_pragmatic_title: 'Прагматични AI',
        ai_philosophy_pragmatic_desc: 'Фокус на fine-tuned малим моделима уместо генеричких LLM. Ефикасна цена, приватна решења за бизнис-критичне задатке.',
        ai_philosophy_privacy_title: 'Приватност Података — Приоритет',
        ai_philosophy_privacy_desc: 'On-premise деплојмент. Подаци не напуштају вашу инфраструктуру. GDPR-сагласност по дизајну. Критично за enterprise.',
        ai_philosophy_augmented_title: 'AI-Augmented Развој',
        ai_philosophy_augmented_desc: 'Коришћење Cursor, Claude Code и LLM агената за повезивање идеја и имплементације. 10x бжи прототипирање задржавајући квалитет.',
        menu_home: 'Назад на почетну',
        ai_workflow_title: 'AI-Native Приступ',
        ai_workflow_subtitle: 'Повезивање идеја и техничке реализације',
        ai_workflow_tools: 'На бази Cursor, Claude Code, LLM агената',
        ai_workflow_speed: '10x бже прототипирање',
        philosophy_title: 'Моја AI филозофија',
        philosophy_intro: 'Као Product Manager који кодира, развио сам јединствен AI-augmented приступ који ми омогућава да се крећем од идеје до радног прототипа за сати, не дане. Ово није о замени развоја — ово укидање трења између продукт размишљања и техничке имплементације.',
        principle_1_title: 'Мисли системски',
        principle_1_desc: 'AI ми помаже да размислим о архитектури, зависностима и edge cases пре писанја једне линије кода.',
        principle_2_title: 'Брзо лансирање, итерације',
        principle_2_desc: 'Бзро прототипирање значи да могу да валидирам идеје са реалним корисницима и кодом, не слайдовима и спецификацијама.',
        principle_3_title: 'Дубока емпатија према развоју',
        principle_3_desc: 'Стварање производа сопственим рукама даје ми firsthand разумевање техничких ограничења и проблема програмера.',
        tools_title: 'Мој алатник',
        cursor_desc: 'Моја примарна оквина за развој. AI pair programming који разуме контекст, предлаже целе функције и помаже ми да пишем production-ready код бже.',
        cursor_f1: 'Контекстне предлозе кода',
        cursor_f2: 'Природни језик у SQL упите',
        cursor_f3: 'Мулти-файлови рефакторинг са AI',
        cursor_f4: 'Откривање багова и помоћ у поправци',
        claude_desc: 'AI CLI алат за анализу кода, дискусије архитектуре и дубоко разумевање кодне базе. Есенцијалан за бзро прототипирање и code review.',
        claude_f1: 'Анализира целе кодне базе за секунде',
        claude_f2: 'Дискутује архитектонске trade-offs',
        claude_f3: 'Генерише boilerplate код инстантно',
        claude_f4: 'Объясни сложу логику једноставно',
        agents_title: 'Custom LLM агенти',
        agents_desc: 'Наменски AI агенти за специфичне задатке: code review, генерација тестова, документација и data analytics workflows.',
        agents_f1: 'Аутоматизовани агенти code review',
        agents_f2: 'Генерација тестова из спецификација',
        agents_f3: 'Писци документације',
        agents_f4: 'Асистенти data аналитике',
        process_title: 'Мој процес',
        step_1_title: 'Идеација и захтеви',
        step_1_desc: 'Користим LLM за размишљање о захтевима, edge cases и user stories. Добијам инстантну повратну информацију о продукт одлукама из AI перспективе.',
        step_2_title: 'Дизајн архитектуре',
        step_2_desc: 'Дискутујем системску архитектуру са AI. Оцењујем trade-offs између различитих приступа. Генеришем database schema и API дизајне за минуте.',
        step_3_title: 'Бзро прототипирање',
        step_3_desc: 'Користим Cursor за генерацију boilerplate, имплементацију features и handloване edge cases. Лансирам радни MVP за сати, не недеље.',
        step_4_title: 'Валидација и итерације',
        step_4_desc: 'Добијам реалну повратну информацију од корисника. Користим AI за анализу паттерна коришћења, идентификовање побољшања и бзре итерације.',
        benefits_title: 'Зашто ово ради',
        benefit_1_title: '10x бже',
        benefit_1_desc: 'Од идеје до радног прототипа за сати уместо дана или недеља.',
        benefit_2_title: 'Виши квалитет',
        benefit_2_desc: 'АИ хвата edge cases које ја пропустам, предлаже боље паттерне и делује као сениор code reviewer.',
        benefit_3_title: 'Бољи производи',
        benefit_3_desc: 'Рукама-on искуство значи да разумем техничка ограничења пре обећавања features.',
        benefit_4_title: 'Developer емпатија',
        benefit_4_desc: 'Осјећам бол техничког дуга, лоших спецификација и мењајућих захтева firsthand.',
        cta_title: 'Заинтересован за сарадњу?',
        cta_desc: 'Увек тражим прилике да користим AI-augmented развој за стварање иновативних производа.',
        cta_button: 'Контакт',
        footer_text: '© 2024 Алексеј Панфилов. Направљено са AI-augmented развојем.',
        intro: {
            title: 'Head of Product',
            description: '<strong>AI-Native извршни директор производа</strong> са 15 година искуства у изградњи високо-оптеретћених система и продуктових портфеolia од 0 до 1. Не разматрам AI као магију - разумем разлику између prompt engineering-а и agent-based система, знам када користити генеричке LLM-ове, а када fine-tуновати мале моделе за бизнис-критичне задатке. Не ограничавам се главним LLM добављивачима - константно тестирам и оцењујем нове моделе и приступе.<br><br>' +
                'Користим <strong>Cursor, Claude Code и LLM агенте</strong> за повезивање идеја и техничке реализације, омогућавајући брзо прототипирање MVP и дубоко разумевање програмера. Изградио системе у <strong>Yandex-у и Руској пошти</strong> за милионе корисника. Радим у брзо-мењајућим R&D окружењима, претварајући customer insights и OKR-е у јасне roadmap-е и мерљиве резултате. Умеем да communикујем са execs, инжењерима и клијентима на истом језику.<br><br>' +
                '<strong>Језици:</strong> Матерњи руски, течан енглески, конверзацијски српски.'
        },
        skills: {
            title: 'Кључне компетенције',
            items: [
                {
                    title: 'AI-Augmented Продукт Лидерство',
                    description: 'AI-native токови рада користећи Cursor, Claude Code и LLM агенте за бзро прототипирање и дубоко разумевање програмера. Повезујем идеје и техничку реализацију, омогућавајући 10x бжи развој MVP док заджим стратешки надзор.'
                },
                {
                    title: 'Портфолио и Стратешки Менаџмент',
                    description: 'Оркестрирам стратегију за више истовремених производа са ограниченим ресурсима. Приоритизација на основу бизнис-воздействия и техничке изводљивости. Вођство више кросс-функционалних тимова са очувањем јасноће roadmap и alignment стейкхолдера.'
                },
                {
                    title: 'Аналитика-Вођена Одлучивања',
                    description: 'Градња свеобухватне аналитичке инфраструктуре од нуле преко организација. Трансформација хаоса података у акционе инсајте. SQL-first приступ са дубоком експертизом у ClickHouse, PostgreSQL и BI алатима за executive ниво извештавања.'
                },
                {
                    title: 'Enterprise-Grade AI Имплементација',
                    description: 'Прагматичан AI са фокусом на fine-tuned мале моделе уместо генеричких LLM. Приступ data privacy-first са on-premise решењима. Успешна деплојментација AI система за милионе корисника урегулисаним окружењима.'
                }
            ],
            subsections: [
                {
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
                    description: "<strong>Продукт портфолио:</strong> Оркестрирам стратегију за више AI/ML производа укључујући ResearchPelt (рачунска платформа за научнике), веб-IDE на бази VS Code, University Chatbots, Groups са LLM интеграцијом, Model Engine и Insights.<br><br><strong>Лидерство:</strong> Водим кросс-функционалне тимове балансирајући расподелу ресурса између високо-приоритетних пројеката. Приоритизујем на основу бизнис-утцаја и техничке изводљивости.<br><br><strong>AI Advocacy:</strong> Служим као интерни AI Advocate обучавајући product менаџере на AI агент развој. Испоручујем enterprise-grade fine-tuned моделе за бизнис задатке."
                },
                {
                    title: 'Технички менаџер пројекта',
                    company: 'Yandex Cloud',
                    location: 'Москва-Београд',
                    period: '8/2022 - 9/2024',
                    description: "<strong>Продукт менаџмент:</strong> Управљао тимом за развој и процесима за Datalens производ за визуализацију података. Обављао дизајн функција, припрему макета и сарадњу са тим лидерима.<br><br><strong>Координација:</strong> Координисао кросс-функционалне тимове за благовремену испоруку функција и побољшања у брзом окружењу."
                },
                {
                    title: 'Менаџер производа',
                    company: 'Yandex.Market',
                    location: 'Москва',
                    period: '4/2021 - 8/2022',
                    description: "<strong>Стратегија:</strong> Водио roadmap за брзо-растућу курирску платформу. Учествовао у развоју система аутоматског додељивања курира са алгоритамском маршрутизацијом.<br><br><strong>Аналитика:</strong> Изградио свеобухватну аналитику за data-driven оперативне одлуке.<br><br><strong>Лидерство:</strong> Водио тим од 10 особа, обезбеђујући 100% благовремено испоручавање клијентских иновација."
                },
                {
                    title: 'Product Owner',
                    company: 'Руска пошта',
                    location: 'Москва',
                    period: '6/2020 - 4/2021',
                    description: "<strong>Развој:</strong> Изградио и водио дистрибуирани тим креирајући високо-оптерећени валидациони енџин за обраду података међународних гиганата укључујући iHerb и AliExpress.<br><br><strong>Compliance:</strong> Осигурао 100% GDPR усаглашеност и значајно смањио грешке уноса података кроз аутоматску валидацију.<br><br><strong>Тим:</strong> Запослио и водио full-stack развојни тим од нуле."
                },
                {
                    title: 'Product Owner',
                    company: 'Anywayanyday',
                    location: 'Москва',
                    period: '2/2019 - 6/2020',
                    description: "<strong>Оптимизација:</strong> Побољшао управљање мобилним развојем, избор извођача и процесе UI/UX прототипирања.<br><br><strong>Аналитика:</strong> Створио систем аналитике за организовање и деловање на основу студија публике и конкурентних анализа.<br><br><strong>Технологије:</strong> Преписио мобилну апликацију у Swift и најновији Android framework."
                },
                {
                    title: 'Старији аналитичар | Менаџер производа',
                    company: 'Biglion | Western Union | NAU | Phillip Morris International | Mango Telecom',
                    location: 'Москва',
                    period: '7/2017 - 2/2019',
                    description: "<strong>Консалтинг:</strong> Консултовао о архитектури и дизајну формата података за аналитичке пројекте у више индустрија.<br><br><strong>Продукт менаџмент:</strong> Припремао лансирање мобилних апликација и надоградње веб-сајтова. Управљао техничким развојем апликација и пратио перформансе."
                },
                {
                    title: 'Генерални директор',
                    company: 'Social Technologies',
                    location: 'Москва',
                    period: '7/2016 - 8/2017',
                    description: "<strong>Управљање тимом:</strong> Управљао мултидисциплинарним интерним тимом и фрилансерима за стварање апликација друштвених мрежа и веб портала.<br><br><strong>Продукт стратегија:</strong> Руководио бета тестирањем, побољшањима UX/UI и издавањем апликација. Анализирао повратне информације и конкурентски пејзаж."
                },
                {
                    title: 'Program Manager | QA Engineer',
                    company: 'Parallels',
                    location: 'Москва',
                    period: '8/2012 - 12/2015',
                    description: "<strong>Кариерни раст:</strong> Унапређен са QA Engineer-а на Program Manager-а 2014. за успостављање тест планова и успешно извршавање QA одговорности.<br><br><strong>Продукт менаџмент:</strong> Водио издања ажурирања производа, надгледао документацију функција и укључивао резултате аналитике и повратних информација корисника у roadmap."
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
        if (introDesc) introDesc.innerHTML = data.intro.description;
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

    // Render main skills title
    if (data.skills.title) {
        const titleElement = document.createElement('h3');
        titleElement.textContent = data.skills.title;
        titleElement.className = 'skills-section-title';
        skillsContainer.appendChild(titleElement);
    }

    let globalIndex = 0;

    // Helper function to create skill tags
    const createSkillTag = (item, index) => {
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
            skillTag.addEventListener('click', function () {
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

        return skillTag;
    };

    // Render main skills items (Core Competencies)
    if (data.skills.items && data.skills.items.length > 0) {
        data.skills.items.forEach((item, index) => {
            globalIndex++;
            const skillTag = createSkillTag(item, globalIndex);
            skillTag.classList.add('core-competency'); // Add special class for core competencies
            skillsContainer.appendChild(skillTag);
        });
    }

    // Render subsections (Technical Proficiencies, etc.)
    if (data.skills.subsections && data.skills.subsections.length > 0) {
        data.skills.subsections.forEach(subsection => {
            // Add subsection title
            const subsectionTitle = document.createElement('h3');
            subsectionTitle.textContent = subsection.title;
            subsectionTitle.className = 'skills-subsection-title';
            subsectionTitle.style.marginTop = '2rem';
            skillsContainer.appendChild(subsectionTitle);

            // Add subsection items
            if (subsection.items && subsection.items.length > 0) {
                subsection.items.forEach((item) => {
                    globalIndex++;
                    const skillTag = createSkillTag(item, globalIndex);
                    skillsContainer.appendChild(skillTag);
                });
            }
        });
    }
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
    const experienceList = document.querySelector('.experience__list');

    if (experienceList && data.experience) {
        experienceList.innerHTML = '';

        data.experience.items.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('experience__item');
            li.style.setProperty('--i', index + 1);

            // Pure BEM structure without extra wrapper
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

    // Update education section
    const educationList = document.querySelector('.education__list');
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
