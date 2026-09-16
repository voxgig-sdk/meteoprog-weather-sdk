# MeteoprogWeather SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MeteoprogWeatherFeatures
  def self.make_feature(name)
    case name
    when "base"
      MeteoprogWeatherBaseFeature.new
    when "ratelimit"
      MeteoprogWeatherRatelimitFeature.new
    when "retry"
      MeteoprogWeatherRetryFeature.new
    when "test"
      MeteoprogWeatherTestFeature.new
    when "timeout"
      MeteoprogWeatherTimeoutFeature.new
    else
      MeteoprogWeatherBaseFeature.new
    end
  end
end
