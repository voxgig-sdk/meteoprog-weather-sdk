-- Typed models for the MeteoprogWeather SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Current
---@field current? table
---@field location? table

---@class CurrentLoadMatch
---@field city? string
---@field lang? string
---@field lat? number
---@field lon? number
---@field unit? string

---@class Historical
---@field clouds? number
---@field date? string
---@field humidity? number
---@field precipitation? number
---@field pressure? number
---@field temperature? table
---@field timestamp? number
---@field weather? table
---@field wind_direction? number
---@field wind_speed? number

---@class HistoricalListMatch
---@field city? string
---@field end_date string
---@field lang? string
---@field lat? number
---@field lon? number
---@field start_date string
---@field unit? string

---@class WeatherForecast
---@field clouds? number
---@field date? string
---@field humidity? number
---@field precipitation? number
---@field pressure? number
---@field temperature? table
---@field timestamp? number
---@field weather? table
---@field wind_direction? number
---@field wind_speed? number

---@class WeatherForecastListMatch
---@field city? string
---@field day? number
---@field lang? string
---@field lat? number
---@field lon? number
---@field unit? string

local M = {}

return M
