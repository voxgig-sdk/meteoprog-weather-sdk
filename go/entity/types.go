// Typed models for the MeteoprogWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/meteoprog-weather-sdk/go/core"
)

// Current is the typed data model for the current entity.
type Current struct {
	Current *map[string]any `json:"current,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
}

// CurrentLoadMatch is the typed request payload for Current.LoadTyped.
type CurrentLoadMatch struct {
	City *string `json:"city,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Unit *string `json:"unit,omitempty"`
}

// Historical is the typed data model for the historical entity.
type Historical struct {
	Clouds *int `json:"clouds,omitempty"`
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
	City *string `json:"city,omitempty"`
	EndDate string `json:"end_date"`
	Lang *string `json:"lang,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	StartDate string `json:"start_date"`
	Unit *string `json:"unit,omitempty"`
}

// WeatherForecast is the typed data model for the weather_forecast entity.
type WeatherForecast struct {
	Clouds *int `json:"clouds,omitempty"`
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
	City *string `json:"city,omitempty"`
	Day *int `json:"day,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Unit *string `json:"unit,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
