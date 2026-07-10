
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.meteoprog.com/v1',

    auth: {
      prefix: '',
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
          "active": true,
          "name": "current",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "location",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        }
      ],
      "name": "current",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "city",
                    "orig": "city",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "en",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/weather/current",
              "parts": [
                "weather",
                "current"
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
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "historical": {
      "fields": [
        {
          "active": true,
          "name": "cloud",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "humidity",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "precipitation",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "pressure",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "temperature",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 5
        },
        {
          "active": true,
          "name": "timestamp",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "weather",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 7
        },
        {
          "active": true,
          "name": "wind_direction",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 8
        },
        {
          "active": true,
          "name": "wind_speed",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 9
        }
      ],
      "name": "historical",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "city",
                    "orig": "city",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "en",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/weather/historical",
              "parts": [
                "weather",
                "historical"
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
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "weather_forecast": {
      "fields": [
        {
          "active": true,
          "name": "cloud",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "humidity",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "precipitation",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "pressure",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "temperature",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 5
        },
        {
          "active": true,
          "name": "timestamp",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "weather",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 7
        },
        {
          "active": true,
          "name": "wind_direction",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 8
        },
        {
          "active": true,
          "name": "wind_speed",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 9
        }
      ],
      "name": "weather_forecast",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "city",
                    "orig": "city",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 7,
                    "kind": "query",
                    "name": "day",
                    "orig": "day",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": "en",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/weather/forecast",
              "parts": [
                "weather",
                "forecast"
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
              "index$": 0
            }
          ],
          "key$": "list"
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
  config
}

