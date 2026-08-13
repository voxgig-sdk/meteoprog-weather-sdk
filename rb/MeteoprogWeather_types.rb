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
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
CurrentLoadMatch = Struct.new(
  :current,
  :location,
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
HistoricalListMatch = Struct.new(
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
WeatherForecastListMatch = Struct.new(
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

