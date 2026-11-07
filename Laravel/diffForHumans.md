```php
now()->locale('ru')->subHours(2)->subMinutes(30)->diffForHumans([
    'parts' => 2,
    'short' => true,
    'join' => ' ',
]);
```

Source: https://masteringlaravel.io/daily/2026-10-29-why-does-diffforhumans-say-1-day-ago-for-something-47-hours-old