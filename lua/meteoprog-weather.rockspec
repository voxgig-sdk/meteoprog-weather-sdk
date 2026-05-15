package = "voxgig-sdk-meteoprog-weather"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/meteoprog-weather-sdk.git"
}
description = {
  summary = "MeteoprogWeather SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["meteoprog-weather_sdk"] = "meteoprog-weather_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
