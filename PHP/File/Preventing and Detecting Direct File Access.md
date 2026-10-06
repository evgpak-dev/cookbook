> If a file was requested directly by the web server, PHP's $_SERVER['SCRIPT_FILENAME'] (the initial script that executed) will match __FILE__ (the current file). If it was included by another file, they will be different.

```php
declare(strict_types=1);

if (realpath(__FILE__) === realpath($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    // This file was accessed DIRECTLY via its URL
    http_response_code(403);
    exit('Direct access to this script is forbidden.');
}
```