<?php
declare(strict_types=1);

// MeteoprogWeather SDK exists test

require_once __DIR__ . '/../meteoprogweather_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MeteoprogWeatherSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
