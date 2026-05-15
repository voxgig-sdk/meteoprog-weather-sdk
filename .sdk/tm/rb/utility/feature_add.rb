# MeteoprogWeather SDK utility: feature_add
module MeteoprogWeatherUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
