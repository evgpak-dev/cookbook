# Fatal error: Uncaught Error: Class CMain not found in ...

Если при запуске скрипта в консоли выдает данную ошибку, это может быть по одной из двух причин:

## 1. Отключен short_open_tag в конфиге PHP
Запустить скрипт, передав параметр принудительно через флаг -d:

```bash
php -d short_open_tag=On -f /путь/к/run_import.php
```

Если после этого скрипт запустился - проблема в этом.

**Решение**
1. Узнать, какой `php.ini` использует консоль:
```bash
php --ini | grep "Loaded Configuration File"
```
2. Найти строку `short_open_tag = Off` и заменить её на:
```ini
short_open_tag = On
```

## 2. Неверно вычислен $_SERVER['DOCUMENT_ROOT']

Проверить шапку скрипта

```php
<?php

if (php_sapi_name() !== 'cli') {
    die("Only CLI mode allowed.\n");
}

$_SERVER['DOCUMENT_ROOT'] = dirname(__DIR__, 2); // в данном случае подразумевается, что cli-скрипт лежит в /local/scripts/run_import.php


define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);
define("BX_CRONTAB", true);
define("BX_NO_ACCELERATOR_RESET", true);

require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
```