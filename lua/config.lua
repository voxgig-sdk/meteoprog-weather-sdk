-- MeteoprogWeather SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MeteoprogWeather",
      slug = "meteoprog-weather",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.meteoprog.com/v1",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["current"] = {},
        ["historical"] = {},
        ["weather_forecast"] = {},
      },
    },
    entity = {
      ["current"] = {
        ["fields"] = {
          {
            ["name"] = "current",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "location",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "current",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "metric",
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/weather/current",
                ["parts"] = {
                  "weather",
                  "current",
                },
                ["select"] = {
                  ["exist"] = {
                    "city",
                    "lang",
                    "lat",
                    "lon",
                    "unit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.current`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["historical"] = {
        ["fields"] = {
          {
            ["name"] = "clouds",
            ["short"] = "Cloud coverage percentage",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "date",
            ["short"] = "Date of the historical data",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "humidity",
            ["short"] = "Humidity percentage",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "precipitation",
            ["short"] = "Precipitation amount",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "pressure",
            ["short"] = "Atmospheric pressure",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "temperature",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "timestamp",
            ["short"] = "Unix timestamp",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "weather",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "wind_direction",
            ["short"] = "Wind direction in degrees",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "wind_speed",
            ["short"] = "Wind speed",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "historical",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "end_date",
                      ["orig"] = "end_date",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "start_date",
                      ["orig"] = "start_date",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "metric",
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/weather/historical",
                ["parts"] = {
                  "weather",
                  "historical",
                },
                ["select"] = {
                  ["exist"] = {
                    "city",
                    "end_date",
                    "lang",
                    "lat",
                    "lon",
                    "start_date",
                    "unit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.historical`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["weather_forecast"] = {
        ["fields"] = {
          {
            ["name"] = "clouds",
            ["short"] = "Cloud coverage percentage",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "date",
            ["short"] = "Date of the forecast",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "humidity",
            ["short"] = "Humidity percentage",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "precipitation",
            ["short"] = "Precipitation amount",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "pressure",
            ["short"] = "Atmospheric pressure",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "temperature",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "timestamp",
            ["short"] = "Unix timestamp",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "weather",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "wind_direction",
            ["short"] = "Wind direction in degrees",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "wind_speed",
            ["short"] = "Wind speed",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "weather_forecast",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 7,
                      ["kind"] = "query",
                      ["name"] = "day",
                      ["orig"] = "day",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "metric",
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/weather/forecast",
                ["parts"] = {
                  "weather",
                  "forecast",
                },
                ["select"] = {
                  ["exist"] = {
                    "city",
                    "day",
                    "lang",
                    "lat",
                    "lon",
                    "unit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
