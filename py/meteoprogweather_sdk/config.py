# MeteoprogWeather SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MeteoprogWeather",
            "slug": "meteoprog-weather",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.meteoprog.com/v1",
            "auth": {
                "prefix": "",
                "in": "query",
                "name": "api_key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "current": {},
                "historical": {},
                "weather_forecast": {},
            },
        },
        "entity": {
      "current": {
        "fields": [
          {
            "name": "current",
            "title": "Current",
            "type": "`$OBJECT`",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$OBJECT`",
          },
        ],
        "name": "current",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/weather/current",
                "segments": [
                  {
                    "lit": "weather",
                  },
                  {
                    "lit": "current",
                  },
                ],
                "parts": [
                  "weather",
                  "current",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.current`",
                },
                "args": {
                  "query": [
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "metric",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "city",
                    "lang",
                    "lat",
                    "lon",
                    "unit",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "historical": {
        "fields": [
          {
            "name": "clouds",
            "title": "Clouds",
            "type": "`$INTEGER`",
            "short": "Cloud coverage percentage",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "short": "Date of the historical data",
            "format": "date",
          },
          {
            "name": "humidity",
            "title": "Humidity",
            "type": "`$INTEGER`",
            "short": "Humidity percentage",
          },
          {
            "name": "precipitation",
            "title": "Precipitation",
            "type": "`$NUMBER`",
            "short": "Precipitation amount",
          },
          {
            "name": "pressure",
            "title": "Pressure",
            "type": "`$NUMBER`",
            "short": "Atmospheric pressure",
          },
          {
            "name": "temperature",
            "title": "Temperature",
            "type": "`$OBJECT`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$INTEGER`",
            "short": "Unix timestamp",
          },
          {
            "name": "weather",
            "title": "Weather",
            "type": "`$OBJECT`",
          },
          {
            "name": "wind_direction",
            "title": "Wind Direction",
            "type": "`$NUMBER`",
            "short": "Wind direction in degrees",
          },
          {
            "name": "wind_speed",
            "title": "Wind Speed",
            "type": "`$NUMBER`",
            "short": "Wind speed",
          },
        ],
        "name": "historical",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/weather/historical",
                "segments": [
                  {
                    "lit": "weather",
                  },
                  {
                    "lit": "historical",
                  },
                ],
                "parts": [
                  "weather",
                  "historical",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.historical`",
                },
                "args": {
                  "query": [
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "metric",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "city",
                    "end_date",
                    "lang",
                    "lat",
                    "lon",
                    "start_date",
                    "unit",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "weather_forecast": {
        "fields": [
          {
            "name": "clouds",
            "title": "Clouds",
            "type": "`$INTEGER`",
            "short": "Cloud coverage percentage",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "short": "Date of the forecast",
            "format": "date",
          },
          {
            "name": "humidity",
            "title": "Humidity",
            "type": "`$INTEGER`",
            "short": "Humidity percentage",
          },
          {
            "name": "precipitation",
            "title": "Precipitation",
            "type": "`$NUMBER`",
            "short": "Precipitation amount",
          },
          {
            "name": "pressure",
            "title": "Pressure",
            "type": "`$NUMBER`",
            "short": "Atmospheric pressure",
          },
          {
            "name": "temperature",
            "title": "Temperature",
            "type": "`$OBJECT`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$INTEGER`",
            "short": "Unix timestamp",
          },
          {
            "name": "weather",
            "title": "Weather",
            "type": "`$OBJECT`",
          },
          {
            "name": "wind_direction",
            "title": "Wind Direction",
            "type": "`$NUMBER`",
            "short": "Wind direction in degrees",
          },
          {
            "name": "wind_speed",
            "title": "Wind Speed",
            "type": "`$NUMBER`",
            "short": "Wind speed",
          },
        ],
        "name": "weather_forecast",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/weather/forecast",
                "segments": [
                  {
                    "lit": "weather",
                  },
                  {
                    "lit": "forecast",
                  },
                ],
                "parts": [
                  "weather",
                  "forecast",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "day",
                      "orig": "day",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 7,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "metric",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "city",
                    "day",
                    "lang",
                    "lat",
                    "lon",
                    "unit",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
