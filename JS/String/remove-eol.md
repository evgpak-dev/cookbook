Функция `removeEol` предназначена для удаления символа перевода строки (конца строки) из самого конца текстовой строки, если он там присутствует.

```js
const EOL = /\r?\n$/;

export function removeEol(line) {
  if (typeof line !== 'string') return '';
  return line.replace(EOL, '');
}
```
