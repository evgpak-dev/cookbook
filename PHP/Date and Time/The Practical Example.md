Here is a highly practical example covering creation, intervals, comparison, and timezone conversion.

### The Practical Example: Subscription Manager

```php
<?php

class SubscriptionManager
{
    /**
     * Starts a new trial by adding 30 days to the current UTC time.
     */
    public function startTrial(): DateTimeImmutable
    {
        // ALWAYS use UTC for backend logic and database storage
        $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
        
        // DateTimeImmutable is great because modify() returns a NEW object.
        // It does not alter the original $now variable (preventing sneaky bugs).
        return $now->modify('+30 days');
    }

    /**
     * Calculates the time remaining on a subscription.
     */
    public function getSubscriptionStatus(string $expirationDateString): array
    {
        $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
        $expirationDate = new DateTimeImmutable($expirationDateString, new DateTimeZone('UTC'));

        // 1. Comparison: You can compare DateTime objects directly
        if ($now > $expirationDate) {
            return[
                'status' => 'Expired',
                'days_remaining' => 0
            ];
        }

        // 2. Diffing: diff() returns a DateInterval object
        $interval = $now->diff($expirationDate);

        return[
            'status' => 'Active',
            // %a represents the total number of days
            'days_remaining' => (int) $interval->format('%a'),
            // We can also format it into a human-readable string
            'exact_time_left' => $interval->format('%m months, %d days, %h hours')
        ];
    }

    /**
     * Converts a UTC database date to the user's local timezone for the UI.
     */
    public function formatForUser(DateTimeImmutable $utcDate, string $userTimezone): string
    {
        // setTimezone() on an Immutable object returns a new instance with the new timezone
        $localDate = $utcDate->setTimezone(new DateTimeZone($userTimezone));
        
        // Format it nicely (e.g., "March 20, 2026 at 01:16 PM")
        return $localDate->format('F j, Y \a\t h:i A');
    }
}


// ==========================================
// 🚀 HOW TO USE IT IN PRACTICE
// ==========================================

$manager = new SubscriptionManager();

// 1. User signs up. Start their trial.
$trialExpiresUtc = $manager->startTrial();
echo "1. Saved to Database (UTC): " . $trialExpiresUtc->format('Y-m-d H:i:s') . "\n";

echo "--------------------------------------------------\n";

// 2. User looks at their dashboard in Uzbekistan
$userTimezone = 'Asia/Tashkent'; 
$displayDate = $manager->formatForUser($trialExpiresUtc, $userTimezone);

echo "2. Displayed to User in Tashkent: " . $displayDate . "\n";

echo "--------------------------------------------------\n";

// 3. Let's check the status of a user whose subscription expires on April 10, 2026
$dbExpirationDate = '2026-04-10 15:00:00';
$status = $manager->getSubscriptionStatus($dbExpirationDate);

echo "3. Status for an upcoming expiration:\n";
print_r($status);

echo "--------------------------------------------------\n";

// 4. Let's check a user who already expired (in the past)
$oldExpirationDate = '2023-01-01 10:00:00';
$expiredStatus = $manager->getSubscriptionStatus($oldExpirationDate);

echo "4. Status for an old expiration:\n";
print_r($expiredStatus);

?>
```