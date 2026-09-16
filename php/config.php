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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'location',
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
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'city',
                      'lang',
                      'lat',
                      'lon',
                      'unit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.current`',
                  ],
                  'parts' => [
                    'weather',
                    'current',
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
              'short' => 'Cloud coverage percentage',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'date',
              'name' => 'date',
              'short' => 'Date of the historical data',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'humidity',
              'short' => 'Humidity percentage',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'precipitation',
              'short' => 'Precipitation amount',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'pressure',
              'short' => 'Atmospheric pressure',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'temperature',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'Unix timestamp',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'weather',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'wind_direction',
              'short' => 'Wind direction in degrees',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'wind_speed',
              'short' => 'Wind speed',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'historical',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.historical`',
                  ],
                  'parts' => [
                    'weather',
                    'historical',
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
              'short' => 'Cloud coverage percentage',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'date',
              'name' => 'date',
              'short' => 'Date of the forecast',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'humidity',
              'short' => 'Humidity percentage',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'precipitation',
              'short' => 'Precipitation amount',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'pressure',
              'short' => 'Atmospheric pressure',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'temperature',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'Unix timestamp',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'weather',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'wind_direction',
              'short' => 'Wind direction in degrees',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'wind_speed',
              'short' => 'Wind speed',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'weather_forecast',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 7,
                        'kind' => 'query',
                        'name' => 'day',
                        'orig' => 'day',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'weather',
                    'forecast',
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
