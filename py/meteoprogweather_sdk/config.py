# MeteoprogWeather SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.meteoprog.com/v1",
            "auth": {
                "prefix": "",
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
            "type": "`$OBJECT`",
          },
          {
            "name": "location",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/weather/current",
                "parts": [
                  "weather",
                  "current",
                ],
                "select": {
                  "exist": [
                    "city",
                    "lang",
                    "lat",
                    "lon",
                    "unit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.current`",
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
            "short": "Cloud coverage percentage",
            "type": "`$INTEGER`",
          },
          {
            "name": "date",
            "short": "Date of the historical data",
            "type": "`$STRING`",
          },
          {
            "name": "humidity",
            "short": "Humidity percentage",
            "type": "`$INTEGER`",
          },
          {
            "name": "precipitation",
            "short": "Precipitation amount",
            "type": "`$NUMBER`",
          },
          {
            "name": "pressure",
            "short": "Atmospheric pressure",
            "type": "`$NUMBER`",
          },
          {
            "name": "temperature",
            "type": "`$OBJECT`",
          },
          {
            "name": "timestamp",
            "short": "Unix timestamp",
            "type": "`$INTEGER`",
          },
          {
            "name": "weather",
            "type": "`$OBJECT`",
          },
          {
            "name": "wind_direction",
            "short": "Wind direction in degrees",
            "type": "`$NUMBER`",
          },
          {
            "name": "wind_speed",
            "short": "Wind speed",
            "type": "`$NUMBER`",
          },
        ],
        "name": "historical",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/weather/historical",
                "parts": [
                  "weather",
                  "historical",
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.historical`",
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
            "short": "Cloud coverage percentage",
            "type": "`$INTEGER`",
          },
          {
            "name": "date",
            "short": "Date of the forecast",
            "type": "`$STRING`",
          },
          {
            "name": "humidity",
            "short": "Humidity percentage",
            "type": "`$INTEGER`",
          },
          {
            "name": "precipitation",
            "short": "Precipitation amount",
            "type": "`$NUMBER`",
          },
          {
            "name": "pressure",
            "short": "Atmospheric pressure",
            "type": "`$NUMBER`",
          },
          {
            "name": "temperature",
            "type": "`$OBJECT`",
          },
          {
            "name": "timestamp",
            "short": "Unix timestamp",
            "type": "`$INTEGER`",
          },
          {
            "name": "weather",
            "type": "`$OBJECT`",
          },
          {
            "name": "wind_direction",
            "short": "Wind direction in degrees",
            "type": "`$NUMBER`",
          },
          {
            "name": "wind_speed",
            "short": "Wind speed",
            "type": "`$NUMBER`",
          },
        ],
        "name": "weather_forecast",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 7,
                      "kind": "query",
                      "name": "day",
                      "orig": "day",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/weather/forecast",
                "parts": [
                  "weather",
                  "forecast",
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
