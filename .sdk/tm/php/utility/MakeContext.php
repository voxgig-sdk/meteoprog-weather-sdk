<?php
declare(strict_types=1);

// MeteoprogWeather SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MeteoprogWeatherMakeContext
{
    public static function call(array $ctxmap, ?MeteoprogWeatherContext $basectx): MeteoprogWeatherContext
    {
        return new MeteoprogWeatherContext($ctxmap, $basectx);
    }
}
