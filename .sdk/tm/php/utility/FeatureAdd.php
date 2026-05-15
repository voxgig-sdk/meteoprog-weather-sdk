<?php
declare(strict_types=1);

// MeteoprogWeather SDK utility: feature_add

class MeteoprogWeatherFeatureAdd
{
    public static function call(MeteoprogWeatherContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
