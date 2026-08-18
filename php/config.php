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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
                  'parts' => [
                    'weather',
                    'current',
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
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'humidity',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'precipitation',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'pressure',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'temperature',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'timestamp',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'weather',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'wind_direction',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'wind_speed',
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
                  'parts' => [
                    'weather',
                    'historical',
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
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'humidity',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'precipitation',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'pressure',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'temperature',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'timestamp',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'weather',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'wind_direction',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'wind_speed',
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
                  'parts' => [
                    'weather',
                    'forecast',
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
