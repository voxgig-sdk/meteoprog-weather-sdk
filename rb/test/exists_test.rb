# MeteoprogWeather SDK exists test

require "minitest/autorun"
require_relative "../MeteoprogWeather_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MeteoprogWeatherSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
