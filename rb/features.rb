# MeteoprogWeather SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MeteoprogWeatherFeatures
  def self.make_feature(name)
    case name
    when "base"
      MeteoprogWeatherBaseFeature.new
    when "test"
      MeteoprogWeatherTestFeature.new
    else
      MeteoprogWeatherBaseFeature.new
    end
  end
end
