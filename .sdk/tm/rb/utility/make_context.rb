# MeteoprogWeather SDK utility: make_context
require_relative '../core/context'
module MeteoprogWeatherUtilities
  MakeContext = ->(ctxmap, basectx) {
    MeteoprogWeatherContext.new(ctxmap, basectx)
  }
end
