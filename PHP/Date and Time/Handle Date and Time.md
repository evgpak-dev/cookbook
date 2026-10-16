### 1. Creating Dates

You can create dates from the current time, from a string, or from a specific format.

```php
// 1. Current time
$now = new DateTimeImmutable(); 

// 2. From a standard string (PHP is smart at parsing these)
$invoiceDate = new DateTimeImmutable('2026-04-09 15:30:00');
$nextMonday = new DateTimeImmutable('next monday');

// 3. From a custom/weird format (Very common when receiving API data)
$rawApiDate = '09/04/2026'; // DD/MM/YYYY
$parsedDate = DateTimeImmutable::createFromFormat('d/m/Y', $rawApiDate);
```

---

### 2. Formatting Dates (Output)

Use the `format()` method. The formatting letters are the same as the old `date()` function.

```php
$date = new DateTimeImmutable();

echo $date->format('Y-m-d'); // 2026-04-09 (Standard database format)
echo $date->format('d.m.Y H:i'); // 09.04.2026 11:01 (European/CIS format)
echo $date->format('l, F j, Y'); // Thursday, April 9, 2026
echo $date->format(DateTimeInterface::ATOM); // 2026-04-09T11:01:00+05:00 (Standard API format)
```

---

### 3. Modifying Dates and Math

You can modify dates using `modify()` (for simple strings) or `add()`/`sub()` using `DateInterval`.

```php
$now = new DateTimeImmutable();

// Simple modifications
$tomorrow = $now->modify('+1 day');
$nextMonth = $now->modify('+1 month');
$lastFriday = $now->modify('last friday');

// Advanced math using DateInterval (P = Period, Y = Year, M = Month, D = Day, T = Time, H = Hour)
// Example: Add 2 days and 4 hours (P 2D T 4H)
$interval = new DateInterval('P2DT4H');
$futureDate = $now->add($interval);
```

---

### 4. Comparing Dates and Finding the Difference

Because they are objects, you can compare them using standard operators (`>`, `<`, `==`).

```php
$date1 = new DateTimeImmutable('2026-04-01');
$date2 = new DateTimeImmutable('2026-04-09');

if ($date2 > $date1) {
    echo "Date 2 is in the future.\n";
}

// Finding the exact difference
$diff = $date1->diff($date2);

echo "Difference: {$diff->days} days.\n"; // Difference: 8 days.
echo "Formatted: {$diff->y} years, {$diff->m} months, {$diff->d} days.\n";
```

---

### 5. Timezones: The Architectural Gold Standard

**The Golden Rule:** 
1. **Database:** ALWAYS save dates to your database in `UTC` (+00:00). Never save local time in the DB.
2. **Backend Logic:** Do all your comparisons and math in `UTC`.
3. **Frontend/View:** ONLY convert to the user's local timezone (`Europe/Moscow`) at the very last second when displaying it to the user.

```php
// 1. Receiving data (e.g., creating a user right now in UTC for the DB)
$dbDate = new DateTimeImmutable('now', new DateTimeZone('UTC'));
echo "Saved to DB: " . $dbDate->format('Y-m-d H:i:s') . "\n";

// 2. Fetching from DB and showing it to a user in Uzbekistan
$fetchedFromDb = new DateTimeImmutable('2026-04-09 06:01:00', new DateTimeZone('UTC'));

// Change timezone for display
$moscowTimezone = new DateTimeZone('Europe/Moscow'); // UTC+5
$localDate = $fetchedFromDb->setTimezone($moscowTimezone);

echo "Displayed to User: " . $localDate->format('d.m.Y H:i:s') . "\n"; 
// Output will correctly be: 09.04.2026 11:01:00
```