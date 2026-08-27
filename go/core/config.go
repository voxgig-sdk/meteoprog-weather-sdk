package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MeteoprogWeather",
			"slug": "meteoprog-weather",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.meteoprog.com/v1",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"current": map[string]any{},
				"historical": map[string]any{},
				"weather_forecast": map[string]any{},
			},
		},
		"entity": map[string]any{
			"current": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "current",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "location",
						"type": "`$OBJECT`",
					},
				},
				"name": "current",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/weather/current",
								"parts": []any{
									"weather",
									"current",
								},
								"select": map[string]any{
									"exist": []any{
										"city",
										"lang",
										"lat",
										"lon",
										"unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.current`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"historical": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clouds",
						"short": "Cloud coverage percentage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "date",
						"short": "Date of the historical data",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "humidity",
						"short": "Humidity percentage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "precipitation",
						"short": "Precipitation amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "pressure",
						"short": "Atmospheric pressure",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "temperature",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "Unix timestamp",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "weather",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "wind_direction",
						"short": "Wind direction in degrees",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "wind_speed",
						"short": "Wind speed",
						"type": "`$NUMBER`",
					},
				},
				"name": "historical",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/weather/historical",
								"parts": []any{
									"weather",
									"historical",
								},
								"select": map[string]any{
									"exist": []any{
										"city",
										"end_date",
										"lang",
										"lat",
										"lon",
										"start_date",
										"unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.historical`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"weather_forecast": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clouds",
						"short": "Cloud coverage percentage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "date",
						"short": "Date of the forecast",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "humidity",
						"short": "Humidity percentage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "precipitation",
						"short": "Precipitation amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "pressure",
						"short": "Atmospheric pressure",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "temperature",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "Unix timestamp",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "weather",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "wind_direction",
						"short": "Wind direction in degrees",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "wind_speed",
						"short": "Wind speed",
						"type": "`$NUMBER`",
					},
				},
				"name": "weather_forecast",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 7,
											"kind": "query",
											"name": "day",
											"orig": "day",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/weather/forecast",
								"parts": []any{
									"weather",
									"forecast",
								},
								"select": map[string]any{
									"exist": []any{
										"city",
										"day",
										"lang",
										"lat",
										"lon",
										"unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
