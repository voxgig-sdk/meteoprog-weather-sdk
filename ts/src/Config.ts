
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MeteoprogWeather',
        slug: "meteoprog-weather",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.meteoprog.com/v1",

    auth: {
      prefix: '',
      in: 'query',
      name: 'api_key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        current: {
        },
  
        historical: {
        },
  
        weather_forecast: {
        },
  
    }
  }


  entity = {
    "current": {
      "fields": [
        {
          "name": "current",
          "type": "`$OBJECT`"
        },
        {
          "name": "location",
          "type": "`$OBJECT`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/weather/current",
              "segments": [
                {
                  "lit": "weather"
                },
                {
                  "lit": "current"
                }
              ],
              "select": {
                "exist": [
                  "city",
                  "lang",
                  "lat",
                  "lon",
                  "unit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.current`"
              },
              "parts": [
                "weather",
                "current"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "historical": {
      "fields": [
        {
          "name": "clouds",
          "short": "Cloud coverage percentage",
          "type": "`$INTEGER`"
        },
        {
          "format": "date",
          "name": "date",
          "short": "Date of the historical data",
          "type": "`$STRING`"
        },
        {
          "name": "humidity",
          "short": "Humidity percentage",
          "type": "`$INTEGER`"
        },
        {
          "name": "precipitation",
          "short": "Precipitation amount",
          "type": "`$NUMBER`"
        },
        {
          "name": "pressure",
          "short": "Atmospheric pressure",
          "type": "`$NUMBER`"
        },
        {
          "name": "temperature",
          "type": "`$OBJECT`"
        },
        {
          "name": "timestamp",
          "short": "Unix timestamp",
          "type": "`$INTEGER`"
        },
        {
          "name": "weather",
          "type": "`$OBJECT`"
        },
        {
          "name": "wind_direction",
          "short": "Wind direction in degrees",
          "type": "`$NUMBER`"
        },
        {
          "name": "wind_speed",
          "short": "Wind speed",
          "type": "`$NUMBER`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/weather/historical",
              "segments": [
                {
                  "lit": "weather"
                },
                {
                  "lit": "historical"
                }
              ],
              "select": {
                "exist": [
                  "city",
                  "end_date",
                  "lang",
                  "lat",
                  "lon",
                  "start_date",
                  "unit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.historical`"
              },
              "parts": [
                "weather",
                "historical"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "weather_forecast": {
      "fields": [
        {
          "name": "clouds",
          "short": "Cloud coverage percentage",
          "type": "`$INTEGER`"
        },
        {
          "format": "date",
          "name": "date",
          "short": "Date of the forecast",
          "type": "`$STRING`"
        },
        {
          "name": "humidity",
          "short": "Humidity percentage",
          "type": "`$INTEGER`"
        },
        {
          "name": "precipitation",
          "short": "Precipitation amount",
          "type": "`$NUMBER`"
        },
        {
          "name": "pressure",
          "short": "Atmospheric pressure",
          "type": "`$NUMBER`"
        },
        {
          "name": "temperature",
          "type": "`$OBJECT`"
        },
        {
          "name": "timestamp",
          "short": "Unix timestamp",
          "type": "`$INTEGER`"
        },
        {
          "name": "weather",
          "type": "`$OBJECT`"
        },
        {
          "name": "wind_direction",
          "short": "Wind direction in degrees",
          "type": "`$NUMBER`"
        },
        {
          "name": "wind_speed",
          "short": "Wind speed",
          "type": "`$NUMBER`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 7,
                    "kind": "query",
                    "name": "day",
                    "orig": "day",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/weather/forecast",
              "segments": [
                {
                  "lit": "weather"
                },
                {
                  "lit": "forecast"
                }
              ],
              "select": {
                "exist": [
                  "city",
                  "day",
                  "lang",
                  "lat",
                  "lon",
                  "unit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "weather",
                "forecast"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

