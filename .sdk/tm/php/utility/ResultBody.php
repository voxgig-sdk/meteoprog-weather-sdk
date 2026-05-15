<?php
declare(strict_types=1);

// MeteoprogWeather SDK utility: result_body

class MeteoprogWeatherResultBody
{
    public static function call(MeteoprogWeatherContext $ctx): ?MeteoprogWeatherResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
