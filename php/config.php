<?php
declare(strict_types=1);

// MeteoprogWeather SDK configuration

class MeteoprogWeatherConfig
{
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
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'location',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'current',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'historical' => [
          'fields' => [
            [
              'name' => 'cloud',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'date',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'humidity',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'precipitation',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'pressure',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'temperature',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'timestamp',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 6,
            ],
            [
              'name' => 'weather',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 7,
            ],
            [
              'name' => 'wind_direction',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 8,
            ],
            [
              'name' => 'wind_speed',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 9,
            ],
          ],
          'name' => 'historical',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'weather_forecast' => [
          'fields' => [
            [
              'name' => 'cloud',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'date',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'humidity',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'precipitation',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'pressure',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'temperature',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'timestamp',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 6,
            ],
            [
              'name' => 'weather',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 7,
            ],
            [
              'name' => 'wind_direction',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 8,
            ],
            [
              'name' => 'wind_speed',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 9,
            ],
          ],
          'name' => 'weather_forecast',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 7,
                        'kind' => 'query',
                        'name' => 'day',
                        'orig' => 'day',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
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
