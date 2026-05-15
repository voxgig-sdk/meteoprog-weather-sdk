package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCurrentEntityFunc func(client *MeteoprogWeatherSDK, entopts map[string]any) MeteoprogWeatherEntity

var NewHistoricalEntityFunc func(client *MeteoprogWeatherSDK, entopts map[string]any) MeteoprogWeatherEntity

var NewWeatherForecastEntityFunc func(client *MeteoprogWeatherSDK, entopts map[string]any) MeteoprogWeatherEntity

