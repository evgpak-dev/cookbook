### Защита от XSS на основе URL (javascript: URI)

Например, есть ссылка, в атрибут `href` которой вставляется динамические данные:

```html
<!-- Уязвимость: если в "userProfile.website" лежит "javascript:stealData()" -->
<a href="userProfile.website">Visit Website</a>
```

Если пользователь нажимает на тег `<a>`, ссылка на который начинается с `javascript:`, браузер немедленно запускает скрипт в контексте страницы.

**Решение:**

Всегда проверять список разрешенных протоколов URL (например, http:, https:) перед привязкой к href или src:

```js
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);

    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
```
