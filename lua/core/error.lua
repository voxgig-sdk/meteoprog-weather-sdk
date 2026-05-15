-- MeteoprogWeather SDK error

local MeteoprogWeatherError = {}
MeteoprogWeatherError.__index = MeteoprogWeatherError


function MeteoprogWeatherError.new(code, msg, ctx)
  local self = setmetatable({}, MeteoprogWeatherError)
  self.is_sdk_error = true
  self.sdk = "MeteoprogWeather"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MeteoprogWeatherError:error()
  return self.msg
end


function MeteoprogWeatherError:__tostring()
  return self.msg
end


return MeteoprogWeatherError
