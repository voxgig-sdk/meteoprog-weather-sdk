<?php
declare(strict_types=1);

// MeteoprogWeather SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MeteoprogWeatherFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MeteoprogWeatherBaseFeature();
            case "test":
                return new MeteoprogWeatherTestFeature();
            default:
                return new MeteoprogWeatherBaseFeature();
        }
    }
}
