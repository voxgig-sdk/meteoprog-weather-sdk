<?php
declare(strict_types=1);

// MeteoprogWeather SDK configuration

class MeteoprogWeatherConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MeteoprogWeather",
                "slug" => "meteoprog-weather",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.meteoprog.com/v1",
                "auth" => [
                    "prefix" => "",
                    "in" => "query",
                    "name" => "api_key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "current" => [],
                    "historical" => [],
                    "weather_forecast" => [],
                ],
            ],
            "entity" => [
        'current' => [
          'fields' => [
            [
              'name' => 'current',
              'title' => 'Current',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'location',
              'title' => 'Location',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'current',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/weather/current',
                  'segments' => [
                    [
                      'lit' => 'weather',
                    ],
                    [
                      'lit' => 'current',
                    ],
                  ],
                  'parts' => [
                    'weather',
                    'current',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.current`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'metric',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'city',
                      'lang',
                      'lat',
                      'lon',
                      'unit',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'historical' => [
          'fields' => [
            [
              'name' => 'clouds',
              'title' => 'Clouds',
              'type' => '`$INTEGER`',
              'short' => 'Cloud coverage percentage',
            ],
            [
              'name' => 'date',
              'title' => 'Date',
              'type' => '`$STRING`',
              'short' => 'Date of the historical data',
              'format' => 'date',
            ],
            [
              'name' => 'humidity',
              'title' => 'Humidity',
              'type' => '`$INTEGER`',
              'short' => 'Humidity percentage',
            ],
            [
              'name' => 'precipitation',
              'title' => 'Precipitation',
              'type' => '`$NUMBER`',
              'short' => 'Precipitation amount',
            ],
            [
              'name' => 'pressure',
              'title' => 'Pressure',
              'type' => '`$NUMBER`',
              'short' => 'Atmospheric pressure',
            ],
            [
              'name' => 'temperature',
              'title' => 'Temperature',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$INTEGER`',
              'short' => 'Unix timestamp',
            ],
            [
              'name' => 'weather',
              'title' => 'Weather',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'wind_direction',
              'title' => 'Wind Direction',
              'type' => '`$NUMBER`',
              'short' => 'Wind direction in degrees',
            ],
            [
              'name' => 'wind_speed',
              'title' => 'Wind Speed',
              'type' => '`$NUMBER`',
              'short' => 'Wind speed',
            ],
          ],
          'name' => 'historical',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/weather/historical',
                  'segments' => [
                    [
                      'lit' => 'weather',
                    ],
                    [
                      'lit' => 'historical',
                    ],
                  ],
                  'parts' => [
                    'weather',
                    'historical',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.historical`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'metric',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'city',
                      'end_date',
                      'lang',
                      'lat',
                      'lon',
                      'start_date',
                      'unit',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'weather_forecast' => [
          'fields' => [
            [
              'name' => 'clouds',
              'title' => 'Clouds',
              'type' => '`$INTEGER`',
              'short' => 'Cloud coverage percentage',
            ],
            [
              'name' => 'date',
              'title' => 'Date',
              'type' => '`$STRING`',
              'short' => 'Date of the forecast',
              'format' => 'date',
            ],
            [
              'name' => 'humidity',
              'title' => 'Humidity',
              'type' => '`$INTEGER`',
              'short' => 'Humidity percentage',
            ],
            [
              'name' => 'precipitation',
              'title' => 'Precipitation',
              'type' => '`$NUMBER`',
              'short' => 'Precipitation amount',
            ],
            [
              'name' => 'pressure',
              'title' => 'Pressure',
              'type' => '`$NUMBER`',
              'short' => 'Atmospheric pressure',
            ],
            [
              'name' => 'temperature',
              'title' => 'Temperature',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$INTEGER`',
              'short' => 'Unix timestamp',
            ],
            [
              'name' => 'weather',
              'title' => 'Weather',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'wind_direction',
              'title' => 'Wind Direction',
              'type' => '`$NUMBER`',
              'short' => 'Wind direction in degrees',
            ],
            [
              'name' => 'wind_speed',
              'title' => 'Wind Speed',
              'type' => '`$NUMBER`',
              'short' => 'Wind speed',
            ],
          ],
          'name' => 'weather_forecast',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/weather/forecast',
                  'segments' => [
                    [
                      'lit' => 'weather',
                    ],
                    [
                      'lit' => 'forecast',
                    ],
                  ],
                  'parts' => [
                    'weather',
                    'forecast',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'day',
                        'orig' => 'day',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 7,
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'metric',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'city',
                      'day',
                      'lang',
                      'lat',
                      'lon',
                      'unit',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MeteoprogWeatherFeatures::make_feature($name);
    }
}
