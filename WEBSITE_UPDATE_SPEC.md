# Спецификация обновления сайта (dzarlax.dev)

## Контекст
Резюме генерируется из файлов локализации. Обновляем только английскую версию - русский и сербский агент сделает отдельно.

---

## 1. Файл: `web/localization-data-en.js`

### 1.1 Обновить intro.description

**Усилить AI:**
```javascript
description: "<strong>AI-Native Product Executive</strong> with 15 years building high-load systems and product portfolios from 0 to 1. Experience with prompt engineering and agent-based systems, knowing when to use generic LLMs vs. fine-tuned small models for business-critical tasks.<br><br>" +
    "Leveraging <strong>Cursor, Claude Code, and LLM agents</strong> to bridge ideation and technical execution. Built <strong>AI/ML platforms for universities</strong> and data systems at <strong>Yandex & Russian Post</strong> serving millions of users.<br><br>" +
    "<strong>Languages:</strong> Native Russian, fluent English, conversational Serbian."
```

### 1.2 Обновить Constructor.tech опыт (experience.items[0])

```javascript
description: "<strong>Product Portfolio:</strong> Orchestrate strategy for 6+ AI/ML products including Research (computational platform for scientists), VS Code-based web IDE with Kubernetes hosting, University Chatbots, Groups (video conferencing), Model Engine (corporate AI layer), and Insights.<br><br><strong>Insights:</strong> Building team productivity intelligence platform with AI-augmented development. Created working prototype with Semantic Layer (knowledge graph: 178 entities, 2700+ relationships), Gemini AI integration, Discovery Engine for auto-metrics. PostgreSQL + Express backend, React + Vite frontend.<br><br><strong>AI Advocacy:</strong> Internal AI Advocate training PMs on AI agent development. Deliver AI Agents for specialized business tasks."
```

### 1.3 Обновить Yandex Cloud опыт (experience.items[1])

```javascript
description: "<strong>Product:</strong> DataLens - already the main BI system in Yandex with active internal usage and external clients.<br><br><strong>Role:</strong> Technical PM working with dev team on new features and technical solutions. Managed interactions within the team and with external teams. Both product and technical feature development.<br><br><strong>Key Contributions:</strong> Participated in open-source release and on-prem version preparation. Deep ClickHouse integration. 50,000+ users in largest installation."
```

### 1.4 Обновить Russian Post опыт (experience.items[3])

```javascript
description: "<strong>Product:</strong> High-load validation engine for international shipping data<br><br><strong>Scale:</strong> Processed 2M+ addresses daily for clients including iHerb and AliExpress<br><br><strong>Quality:</strong> Reduced error rate from 30% to 2% through automated validation workflows. 100% GDPR compliance - zero incidents over 18 months.<br><br><strong>Team:</strong> Hired and managed full-stack development team from scratch (4 → 8 engineers)."
```

---

## 2. SEO обновления в `index.html`

### 2.1 Обновить meta description (строка 36-37)

```html
<meta name="description" content="Alexey Panfilov (Dzarlax) - AI-Native Product Executive with 15 years experience. Built AI/ML platforms for universities, data systems at Yandex serving millions. Expert in Cursor, Claude Code, LLM agents.">
```

### 2.2 Обновить keywords (строка 38-39)

```html
<meta name="keywords" content="AI Product Manager, LLM agents, Cursor, Claude Code, Product Strategy, ClickHouse, Data Warehouse, Yandex, EdTech, RAG, Vector Database, Prompt Engineering, Alexey Panfilov, Dzarlax">
```

### 2.3 Обновить jobTitle в JSON-LD (строка 123)

```json
"jobTitle": "Head of Product",
```

---

## 3. Файл: `projects.json`

### Обновить Todoist Bot description

```json
"description_en": "Smart Telegram bot integrating with Todoist for efficient task management. Built with AI-assisted development (Cursor). Features intelligent message concatenation, automatic due date parsing with NLP, and containerized deployment.",
```

---

## Чеклист после изменений

- [ ] Скачать PDF резюме - проверить что изменения применились
- [ ] Проверить SEO meta tags через view source
- [ ] Открыть dzarlax.dev и проверить intro текст
