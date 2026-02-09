# CSS Optimization Design

## Context

### Текущее состояние

**CSS файл:**
- **Размер:** 2100+ строк (62KB)
- **Организация:** Смешанная - переменные, компоненты, responsive стили перемешаны
- **Дубликаты:**
  - `@keyframes float` - определен дважды (строки 421-434 и 479-492)
  - `@keyframes morph` - определен дважды (строки 435-448 и 493-506)
  - `.profile-image` - двойное определение (в `.intro` nesting и отдельно 454-462)
  - `.profile-badge` - двойное определение (в `.intro` nesting и отдельно 463-478)
  - `.education-item` vs отдельные `.education-*` классы (противоречивые подходы)
- **Media queries:** Разбросаны по файлу (126-147, 1285-1530, 1648-1673, 1674-1707, 1765-1779)
- **CSS Nesting:** ~40%覆盖 (частично используется в `.intro`, `.skills`, `.experience`)
- **Logical Properties:** ~15%覆盖 (в основном в новых секциях)

**Производительность:**
- CSS загружается синхронно через `<link rel="stylesheet" href="style.css">` в `<head>`
- Блокирует рендеринг до полной загрузки и парсинга
- LCP (Largest Contentful Paint) страдает от задержки первого рендера

### Ограничения

**Совместимость:**
- Ванильный JS, нет сборщиков (webpack/vite)
- CSS Nesting поддерживается в Chrome 112+, Safari 16.5+, Firefox 117+
- Logical Properties поддерживаются во всех современных браузерах
- Нужно сохранить поддержку мобильных браузеров (iOS Safari, Chrome Mobile)

**Архитектура:**
- Single-page application с модульной загрузкой JS
- Мультиязычность (en/ru/rs) через data-атрибуты
- Dark/light режим через `[dark-mode]` атрибут

**Цели:**
- Уменьшить размер CSS на 60% (2100+ → ~800-1000 строк)
- Улучшить LCP на 0.5-1s
- Увеличить CSS nesting до 90%
- Увеличить logical properties до 85%
- Полностью убрать дубликаты

## Goals / Non-Goals

**Goals:**
1. Выделить critical CSS для above-the-fold контента (~30-40KB)
2. Встроить critical CSS inline в `<head>` для мгновенного рендера
3. Загружать основной CSS асинхронно без блокировки
4. Удалить все дубликаты (@keyframes, классы)
5. Консолидировать все media queries в одну секцию
6. Реорганизовать CSS: variables → base → components → sections → utilities → responsive
7. Увеличить использование CSS nesting и logical properties
8. Сохранить 100% визуальную совместимость

**Non-Goals:**
- Изменение визуального дизайна
- Добавление новых фич (только рефакторинг)
- Переход на CSS-in-JS или CSS modules
- Использование препроцессоров (Sass/Less)
- Изменение JavaScript кода

## Decisions

### 1. Critical CSS стратегия

**Решение:** Inline critical CSS в `<head>` + async load остального

**Почему:**
- **Critical CSS** (~15KB): переменные, reset, base стили, `.intro`, `header`, `nav`
- **Non-critical CSS** (~47KB): остальные секции, которые не видны при первом рендере
- Inline critical позволяет браузеру отрисовать first viewport без задержек
- Async load через `<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">`

**Альтернативы рассмотрены:**
- ❌ **Split CSS files** - ухудшает performance (multiple requests)
- ❌ **HTTP/2 push** - не поддерживается на GitHub Pages
- ❌ **Critical CSS inlining + sync load** - все равно блокирует

**Реализация:**
```html
<head>
  <!-- Critical CSS inline -->
  <style>
    /* variables, reset, base, intro, header, nav */
  </style>

  <!-- Non-critical CSS async -->
  <link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="style.css"></noscript>
</head>
```

### 2. Организация CSS файла

**Решение:** Строгая иерархия с nesting

**Новая структура:**
```css
/* ========================================
   1. VARIABLES & DESIGN TOKENS
   ======================================== */
:root { }
[dark-mode] { }

/* ========================================
   2. BASE STYLES (Reset, Typography)
   ======================================== */
html { }
body { }
* { }

/* ========================================
   3. LAYOUT UTILITIES
   ======================================== */
.container { }
section { }

/* ========================================
   4. COMPONENTS (Nested)
   ======================================== */
.theme-toggle { }
.hamburger { }
.project-card { }

/* ========================================
   5. SECTIONS (Nested)
   ======================================== */
.intro { }
.skills { }
.experience { }
.education { }
.projects { }
.achievements { }
.contact { }

/* ========================================
   6. RESPONSIVE (Consolidated)
   ======================================== */
@media (max-width: 768px) { }
@media (max-width: 480px) { }
@media (min-width: 768px) { }
@media (min-width: 1024px) { }
@media (min-width: 1200px) { }

/* ========================================
   7. KEYFRAMES (Consolidated)
   ======================================== */
@keyframes fadeIn { }
@keyframes float { }
@keyframes morph { }
```

**Почему:**
- Логичный поток от глобального к специфичному
- Все media queries в одном месте для легкого поиска
- Все @keyframes консолидированы
- Nesting группирует связанные стили вместе

### 3. Удаление дубликатов

**Решение:** Оставить nested версии, удалить flat версии

**Действия:**
- Удалить standalone `.profile-image` (454-462) - оставить в `.intro` nesting
- Удалить standalone `.profile-badge` (463-478) - оставить в `.intro` nesting
- Удалить второй `@keyframes float` (479-492) - оставить первый (421-434)
- Удалить второй `@keyframes morph` (493-506) - оставить первый (435-448)
- Консолидировать `.education-item-*` (nested) с `.education-*` (flat) - выбрать nested подход

**Почему:**
- Nested версии более современные и легче поддерживаются
- Соответствует цели увеличения nesting до 90%
- Уменьшает размер файла

### 4. CSS Nesting расширение

**Решение:** Конвертировать все flat стили в nesting где возможно

**Пример конверсии:**
```css
/* BEFORE (Flat) */
.experience__item { }
.experience__item-date { }
.experience__item:hover { }

/* AFTER (Nested) */
.experience__item {
    &-date { }
    &:hover { }
}
```

**Секции для конверсии:**
- `.skills` - уже частично nested, расширить до 100%
- `.projects` - конвертировать `.project-card` nested
- `.education` - конвертировать `.education-item-*` в nesting
- `.contact` - конвертировать `.contact-btn` nested
- `.achievements` - конвертировать `.achievement-card` nested
- `footer` - расширить nesting для `.footer-*`

### 5. Logical Properties внедрение

**Решение:** Заменить physical properties на logical

**Примеры конверсии:**
```css
/* BEFORE → AFTER */
width → inline-size
height → block-size
margin-left → margin-inline-start
margin-right → margin-inline-end
padding-left → padding-inline-start
padding-right → padding-inline-end
top → inset-block-start
bottom → inset-block-end
left → inset-inline-start
right → inset-inline-end
```

**Секции для обновления:**
- `.experience__item` - использовать `inset-inline-*` вместо `left/right`
- `.projects` - использовать `inline-size` вместо `width`
- `.intro` - использовать `inset-block-*` вместо `top/bottom`
- Media queries - уже используют `inline-size/block-size`, расширить

**Почему:**
- Автоматическая RTL поддержка для Arabic/Hebrew
- Лучшее соответствие writing mode
- Современный стандарт

## Risks / Trade-offs

### Риск 1: Critical CSS определение
**Риск:** Слишком много/мало CSS в critical секции
- → **Mitigation:** Использовать инструменты (Puppeteer/Critical) для автоматического выделения
- → **Mitigation:** Тестировать LCP на 3G connection
- → **Mitigation:** Включать только стили для `.intro`, `header`, `nav`, variables, reset

### Риск 2: CSS Nesting совместимость
**Риск:** Старые браузеры не поддерживают nesting
- → **Mitigation:** Fallback - предоставлять non-nested версию если <1% пользователей
- → **Mitigation:** Can I Use показывает 85%+ global support
- → **Mitigation:** Тестировать в Safari 16.5+, Firefox 117+

### Риск 3: Визуальные регрессии после рефакторинга
**Риск:** Удаление дубликатов может сломать стили
- → **Mitigation:** Комплексное тестирование перед деплоем
- → **Mitigation:** Сравнительные скриншоты (before/after)
- → **Mitigation:** Проверка всех breakpoints (480, 768, 1024, 1200px)
- → **Mitigation:** Rollback plan - сохранить git commit с оригинальным CSS

### Риск 4: Async load fallback
**Риск:** Async load может не сработать в некоторых браузерах
- → **Mitigation:** `<noscript>` тег с синхронной загрузкой
- → **Mitigation:** `onload` fallback для старых браузеров
- → **Mitigation:** Тестировать с отключенным JavaScript

### Trade-off: Размер vs Readability
**Trade-off:** Минификация уменьшит размер еще на 30%, но ухудшит читаемость
- → **Решение:** Не минифицировать, сохранить читаемость
- → **Обоснование:** Проект personal portfolio, readability важнее
- → **Альтернатива:** Использовать минификацию только для production (опционально)

## Migration Plan

### Phase 1: Анализ и подготовка (1-2 часа)
1. Создать branch `feature/css-optimization`
2. Запустить анализ текущего CSS:
   - Найти все дубликаты (grep "@keyframes", class names)
   - Определить critical CSS (intro, header, nav)
   - Замерить текущие метрики (LCP, file size)

### Phase 2: Critical CSS выделение (1-2 часа)
3. Создать `critical.css` с extracted стилями:
   - Variables (`:root`, `[dark-mode]`)
   - Reset (`*`, `html`, `body`)
   - Base styles
   - `.intro` (first viewport)
   - `header`, `nav`, `.theme-toggle`, `.hamburger`
4. Тестировать critical CSS standalone
5. Интегрировать в `index.html` как inline `<style>`

### Phase 3: Удаление дубликатов (1 час)
6. Удалить standalone `.profile-image` и `.profile-badge`
7. Удалить дубликаты `@keyframes float` и `@keyframes morph`
8. Консолидировать `.education` классы в nested подход
9. Проверить что стили не сломались

### Phase 4: Реорганизация и nesting (2-3 часа)
10. Реорганизовать `style.css` по новой структуре
11. Конвертировать flat стили в nesting (skills, projects, education, contact, achievements, footer)
12. Заменить physical properties на logical properties
13. Переместить все media queries в конец файла
14. Переместить все @keyframes в конец файла

### Phase 5: Async load интеграция (30 минут)
15. Обновить `index.html`:
    - Inline critical CSS
    - Async load для основного CSS
    - Добавить `<noscript>` fallback
16. Убедиться что non-critical стили загружаются асинхронно

### Phase 6: Тестирование (1-2 часа)
17. Визуальное тестирование:
    - Desktop Chrome/Firefox/Safari
    - Mobile iOS Safari/Chrome
    - Все breakpoints (480, 768, 1024, 1200px)
    - Dark/light режимы
    - Анимации и transitions
18. Performance тестирование:
    - LCP измерение (до/после)
    - Network throttling (3G)
    - Lighthouse score
19. Кросс-браузерная проверка:
    - CSS Nesting fallback
    - Logical Properties support

### Phase 7: Деплой и мониторинг (30 минут)
20. Merge branch в main
21. Deploy to GitHub Pages
22. Проверить production:
    - LCP через Chrome DevTools
    - Lighthouse performance score
    - Визуальная целостность

### Rollback Strategy
- Если обнаружены критические баги:
  - Revert commit `git revert <commit-hash>`
  - Force push to GitHub Pages
  - Сохранить branch для последующего фикса

## Open Questions

1. **Critical CSS границы:** Включить ли `.skills` в critical если он visible on large screens?
   - **Решение:** Нет, только `.intro`, `header`, `nav` - остальное lazy load

2. **Minification:** Использовать ли CSS minification для production?
   - **Решение:** Нет в рамках этого изменения, возможно позже как отдельная задача

3. **RTL languages:** Нужен ли теперьRTL тестирование после внедрения logical properties?
   - **Решение:** Да, добавить Arabic/Hebrew тестирование если поддержка планируется

4. **Browser support:** Стоит ли добавить fallback для старых браузеров без CSS nesting?
   - **Решение:** Нет, CSS nesting поддерживается 85%+ браузеров, достаточно для personal portfolio
