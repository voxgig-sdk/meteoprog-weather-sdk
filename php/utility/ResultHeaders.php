<?php
declare(strict_types=1);

// MeteoprogWeather SDK utility: result_headers

class MeteoprogWeatherResultHeaders
{
    public static function call(MeteoprogWeatherContext $ctx): ?MeteoprogWeatherResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
