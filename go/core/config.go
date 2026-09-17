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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.meteoprog.com/v1",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "api_key",
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
								"segments": []any{
									map[string]any{
										"lit": "weather",
									},
									map[string]any{
										"lit": "current",
									},
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
								"parts": []any{
									"weather",
									"current",
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
						"format": "date",
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
								"segments": []any{
									map[string]any{
										"lit": "weather",
									},
									map[string]any{
										"lit": "historical",
									},
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
								"parts": []any{
									"weather",
									"historical",
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
						"format": "date",
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
								"segments": []any{
									map[string]any{
										"lit": "weather",
									},
									map[string]any{
										"lit": "forecast",
									},
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
								"parts": []any{
									"weather",
									"forecast",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
