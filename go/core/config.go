package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MeteoprogWeather",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"active": true,
						"name": "current",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "location",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
				},
				"name": "current",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "city",
											"orig": "city",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"historical": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "cloud",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "date",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "humidity",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "precipitation",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "pressure",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "temperature",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "timestamp",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "weather",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "wind_direction",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "wind_speed",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 9,
					},
				},
				"name": "historical",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "city",
											"orig": "city",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"weather_forecast": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "cloud",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "date",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "humidity",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "precipitation",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "pressure",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "temperature",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "timestamp",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "weather",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "wind_direction",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "wind_speed",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 9,
					},
				},
				"name": "weather_forecast",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "city",
											"orig": "city",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 7,
											"kind": "query",
											"name": "day",
											"orig": "day",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
