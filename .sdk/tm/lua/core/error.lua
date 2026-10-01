-- MeteoprogWeather SDK error

local json = require("dkjson")

local MeteoprogWeatherError = {}
MeteoprogWeatherError.__index = MeteoprogWeatherError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function MeteoprogWeatherError.new(code, msg, ctx)
  local self = setmetatable({}, MeteoprogWeatherError)
  self.is_sdk_error = true
  self.sdk = "MeteoprogWeather"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function MeteoprogWeatherError:context()
  return CONTEXT[self]
end


function MeteoprogWeatherError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function MeteoprogWeatherError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function MeteoprogWeatherError:to_json()
  return json.encode(self:to_table())
end


function MeteoprogWeatherError:__tostring()
  return self.msg
end


function MeteoprogWeatherError.__tojson(self)
  return self:to_json()
end


return MeteoprogWeatherError
