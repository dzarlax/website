# Feature Toggles System

Система управления видимостью разделов сайта через конфигурационные файлы.

## 📁 Структура файлов

```
config/
├── features.json         # Основная конфигурация (production)
├── features-dev.json     # Конфигурация для разработки
└── features-minimal.json # Минимальная конфигурация

web/
└── features.js          # Основной модуль управления
```

## ⚙️ Конфигурация

### Основной конфиг (`config/features.json`)

```json
{
  "features": {
    "intro": { "enabled": true, "description": "Секция знакомства" },
    "skills": { "enabled": true, "description": "Навыки и технологии" },
    "experience": { "enabled": true, "description": "Опыт работы" },
    "achievements": { "enabled": true, "description": "Достижения" },
    "projects": { "enabled": true, "description": "Портфолио проектов" },
    "contact": { "enabled": true, "description": "Контактная информация" }
  },
  "navigation": {
    "showDisabledSections": false,  // Показывать ли отключенные разделы в меню
    "animateToggle": true          // Анимировать включение/выключение
  },
  "debug": {
    "showFeatureStatus": false,    // Показывать статус в консоли
    "logToggleActions": false      // Логировать действия переключения
  }
}
```

## 🎮 Использование

### Программное управление

```javascript
// Проверить состояние фичи
if (window.featureManager.isFeatureEnabled('achievements')) {
    // секция достижений включена
}

// Включить/выключить фичу
window.featureManager.enableFeature('projects');
window.featureManager.disableFeature('experience');
window.featureManager.toggleFeature('skills');

// Получить список включенных фич
const enabled = window.featureManager.getEnabledFeatures();
console.log('Включенные разделы:', enabled);

// Подписаться на изменения фичи
window.featureManager.onFeatureChange('projects', (enabled, wasEnabled) => {
    console.log(`Проекты ${enabled ? 'включены' : 'выключены'}`);
});
```

### Панель администратора (для разработки)

Включите debug режим в конфигурации:

```json
{
  "debug": {
    "showFeatureStatus": true,
    "logToggleActions": true
  }
}
```

Панель появится в левом верхнем углу страницы с чекбоксами для переключения фич.

## 🔄 Смена конфигурации

### Способ 1: Замена файла
```bash
# Использовать dev конфигурацию
cp config/features-dev.json config/features.json

# Использовать минимальную конфигурацию  
cp config/features-minimal.json config/features.json
```

### Способ 2: Программная загрузка (TODO)
```javascript
// В будущем можно добавить
window.featureManager.loadConfig('./config/features-dev.json');
```

## 🎯 Примеры использования

### 1. Минимальное портфолио
Показать только основные разделы:
- ✅ Intro
- ✅ Skills  
- ✅ Projects
- ✅ Contact
- ❌ Experience
- ❌ Achievements

### 2. Полное портфолио
Показать все разделы (по умолчанию)

### 3. Демо режим
Показать все разделы + админ панель для демонстрации

## 🔧 Технические детали

### Автоматическое управление DOM
- Скрытие/показ секций через `display: none`
- Управление видимостью навигационных ссылок
- Плавные анимации переходов
- CSS классы для отключенных элементов

### Безопасность
- Fallback на включение всех фич при ошибке загрузки
- Проверки существования DOM элементов
- Graceful error handling

### Производительность
- Lazy loading конфигурации
- Кеширование состояний
- Минимальные DOM манипуляции

## 🐛 Отладка

```javascript
// В консоли браузера
window.featureManager.logDebugInfo();
window.featureManager.getFeatureConfig();
window.featureManager.createAdminPanel();
```

## 🚀 Развитие системы

### Планируемые фичи:
- [ ] A/B тестирование разделов
- [ ] Персонализация по пользователям
- [ ] Временные toggles (включить на X дней)
- [ ] Аналитика использования фич
- [ ] REST API для управления
- [ ] Групповые toggles 