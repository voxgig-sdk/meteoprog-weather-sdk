<?php
declare(strict_types=1);

// MeteoprogWeather SDK utility: prepare_body

class MeteoprogWeatherPrepareBody
{
    public static function call(MeteoprogWeatherContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
