### 1. Установить cookie (>PHP 7.3.0)

```php
<?php

declare(strict_types=1);

$cookieName  = 'auth_token';
$cookieValue = bin2hex(random_bytes(32));

$options = [
    // Expiration: 7 days from now
    'expires' => time() + (60 * 60 * 24 * 7),

    // Scope: Available across the entire site
    'path' => '/',

    // Domain: Leave empty string to lock to the current host (prevents subdomain access)
    'domain' => '',

    // Transport Security: Transmit ONLY over HTTPS
    'secure' => true,

    // XSS Mitigation: Inaccessible to JavaScript (document.cookie cannot read it)
    'httponly' => true,

    // CSRF Mitigation: Controls whether the cookie is sent on cross-site requests
    'samesite' => 'Lax', // Options: 'Strict', 'Lax', or 'None'
];

// Set the cookie
$isSet = setcookie($cookieName, $cookieValue, $options);

if (!$isSet) {
    error_log("Failed to set cookie. Headers may have already been sent.");
}
```

### 2. Удалить cookie

```php
setcookie('auth_token', '', [
    'expires'  => time() - 3600,
    'path'     => '/',
    'domain'   => '',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'Lax',
]);

unset($_COOKIE['auth_token']);
```