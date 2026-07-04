// Typed models for the MeteoprogWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Current {
  current?: Record<string, any>
  location?: Record<string, any>
}

export type CurrentLoadMatch = Partial<Current>

export interface Historical {
  cloud?: number
  date?: string
  humidity?: number
  precipitation?: number
  pressure?: number
  temperature?: Record<string, any>
  timestamp?: number
  weather?: Record<string, any>
  wind_direction?: number
  wind_speed?: number
}

export type HistoricalListMatch = Partial<Historical>

export interface WeatherForecast {
  cloud?: number
  date?: string
  humidity?: number
  precipitation?: number
  pressure?: number
  temperature?: Record<string, any>
  timestamp?: number
  weather?: Record<string, any>
  wind_direction?: number
  wind_speed?: number
}

export type WeatherForecastListMatch = Partial<WeatherForecast>

