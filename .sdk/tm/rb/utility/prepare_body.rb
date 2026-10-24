# MeteoprogWeather SDK utility: prepare_body
require_relative 'media'
module MeteoprogWeatherUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MeteoprogWeatherUtilities.raw_body(ctx.reqdata) if MeteoprogWeatherUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
