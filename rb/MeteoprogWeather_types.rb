# frozen_string_literal: true

# Typed models for the MeteoprogWeather SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Current entity data model.
#
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
Current = Struct.new(
  :current,
  :location,
  keyword_init: true
)

# Request payload for Current#load.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
CurrentLoadMatch = Struct.new(
  :city,
  :lang,
  :lat,
  :lon,
  :unit,
  keyword_init: true
)

# Historical entity data model.
#
# @!attribute [rw] clouds
#   @return [Integer, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] humidity
#   @return [Integer, nil]
#
# @!attribute [rw] precipitation
#   @return [Float, nil]
#
# @!attribute [rw] pressure
#   @return [Float, nil]
#
# @!attribute [rw] temperature
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] weather
#   @return [Hash, nil]
#
# @!attribute [rw] wind_direction
#   @return [Float, nil]
#
# @!attribute [rw] wind_speed
#   @return [Float, nil]
Historical = Struct.new(
  :clouds,
  :date,
  :humidity,
  :precipitation,
  :pressure,
  :temperature,
  :timestamp,
  :weather,
  :wind_direction,
  :wind_speed,
  keyword_init: true
)

# Request payload for Historical#list.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] end_date
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] start_date
#   @return [String]
#
# @!attribute [rw] unit
#   @return [String, nil]
HistoricalListMatch = Struct.new(
  :city,
  :end_date,
  :lang,
  :lat,
  :lon,
  :start_date,
  :unit,
  keyword_init: true
)

# WeatherForecast entity data model.
#
# @!attribute [rw] clouds
#   @return [Integer, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] humidity
#   @return [Integer, nil]
#
# @!attribute [rw] precipitation
#   @return [Float, nil]
#
# @!attribute [rw] pressure
#   @return [Float, nil]
#
# @!attribute [rw] temperature
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] weather
#   @return [Hash, nil]
#
# @!attribute [rw] wind_direction
#   @return [Float, nil]
#
# @!attribute [rw] wind_speed
#   @return [Float, nil]
WeatherForecast = Struct.new(
  :clouds,
  :date,
  :humidity,
  :precipitation,
  :pressure,
  :temperature,
  :timestamp,
  :weather,
  :wind_direction,
  :wind_speed,
  keyword_init: true
)

# Request payload for WeatherForecast#list.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] day
#   @return [Integer, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
WeatherForecastListMatch = Struct.new(
  :city,
  :day,
  :lang,
  :lat,
  :lon,
  :unit,
  keyword_init: true
)

