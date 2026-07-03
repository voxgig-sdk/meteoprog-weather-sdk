# MeteoprogWeather SDK configuration


def make_config():
    return {
        "main": {
            "name": "MeteoprogWeather",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.meteoprog.com/v1",
            "auth": {
                "prefix": "Bearer",
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
            "active": True,
            "name": "current",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "location",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
        ],
        "name": "current",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "city",
                      "orig": "city",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "historical": {
        "fields": [
          {
            "active": True,
            "name": "cloud",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "date",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "humidity",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "precipitation",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "pressure",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "temperature",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "timestamp",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "weather",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "wind_direction",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "wind_speed",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 9,
          },
        ],
        "name": "historical",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "city",
                      "orig": "city",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "weather_forecast": {
        "fields": [
          {
            "active": True,
            "name": "cloud",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "date",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "humidity",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "precipitation",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "pressure",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "temperature",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "timestamp",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "weather",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "wind_direction",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "wind_speed",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 9,
          },
        ],
        "name": "weather_forecast",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "city",
                      "orig": "city",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 7,
                      "kind": "query",
                      "name": "day",
                      "orig": "day",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
