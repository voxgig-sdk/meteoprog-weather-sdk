// Typed models for the MeteoprogWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Current is the typed data model for the current entity.
type Current struct {
	Current *map[string]any `json:"current,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
}

// CurrentLoadMatch is the typed request payload for Current.LoadTyped.
type CurrentLoadMatch struct {
	Current *map[string]any `json:"current,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
}

// Historical is the typed data model for the historical entity.
type Historical struct {
	Cloud *int `json:"cloud,omitempty"`
	Date *string `json:"date,omitempty"`
	Humidity *int `json:"humidity,omitempty"`
	Precipitation *float64 `json:"precipitation,omitempty"`
	Pressure *float64 `json:"pressure,omitempty"`
	Temperature *map[string]any `json:"temperature,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Weather *map[string]any `json:"weather,omitempty"`
	WindDirection *float64 `json:"wind_direction,omitempty"`
	WindSpeed *float64 `json:"wind_speed,omitempty"`
}

// HistoricalListMatch is the typed request payload for Historical.ListTyped.
type HistoricalListMatch struct {
	Cloud *int `json:"cloud,omitempty"`
	Date *string `json:"date,omitempty"`
	Humidity *int `json:"humidity,omitempty"`
	Precipitation *float64 `json:"precipitation,omitempty"`
	Pressure *float64 `json:"pressure,omitempty"`
	Temperature *map[string]any `json:"temperature,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Weather *map[string]any `json:"weather,omitempty"`
	WindDirection *float64 `json:"wind_direction,omitempty"`
	WindSpeed *float64 `json:"wind_speed,omitempty"`
}

// WeatherForecast is the typed data model for the weather_forecast entity.
type WeatherForecast struct {
	Cloud *int `json:"cloud,omitempty"`
	Date *string `json:"date,omitempty"`
	Humidity *int `json:"humidity,omitempty"`
	Precipitation *float64 `json:"precipitation,omitempty"`
	Pressure *float64 `json:"pressure,omitempty"`
	Temperature *map[string]any `json:"temperature,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Weather *map[string]any `json:"weather,omitempty"`
	WindDirection *float64 `json:"wind_direction,omitempty"`
	WindSpeed *float64 `json:"wind_speed,omitempty"`
}

// WeatherForecastListMatch is the typed request payload for WeatherForecast.ListTyped.
type WeatherForecastListMatch struct {
	Cloud *int `json:"cloud,omitempty"`
	Date *string `json:"date,omitempty"`
	Humidity *int `json:"humidity,omitempty"`
	Precipitation *float64 `json:"precipitation,omitempty"`
	Pressure *float64 `json:"pressure,omitempty"`
	Temperature *map[string]any `json:"temperature,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Weather *map[string]any `json:"weather,omitempty"`
	WindDirection *float64 `json:"wind_direction,omitempty"`
	WindSpeed *float64 `json:"wind_speed,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
