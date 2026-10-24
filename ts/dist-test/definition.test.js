"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "current",
        "accessor": "Current",
        "op": "load",
        "method": "GET",
        "path": "/weather/current",
        "args": [],
        "select": {
            "city": "v1",
            "lang": "en",
            "lat": "v1",
            "lon": "v1",
            "unit": "metric"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lat",
            "lon",
            "city",
            "lang",
            "units"
        ],
        "queryArgs": [
            {
                "name": "city",
                "wire": "city"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "lon",
                "wire": "lon"
            },
            {
                "name": "unit",
                "wire": "units"
            }
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "api_key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "location": {
                "name": "x",
                "country": "x",
                "region": "x",
                "lat": 1,
                "lon": 1,
                "timezone": "x"
            },
            "current": {
                "timestamp": 1,
                "temperature": 1,
                "feels_like": 1,
                "pressure": 1,
                "humidity": 1,
                "wind_speed": 1,
                "wind_direction": 1,
                "clouds": 1,
                "visibility": 1,
                "weather": {
                    "id": 1,
                    "main": "x",
                    "description": "x",
                    "icon": "x"
                }
            }
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "historical",
        "accessor": "Historical",
        "op": "list",
        "method": "GET",
        "path": "/weather/historical",
        "args": [],
        "select": {
            "end_date": "v1",
            "start_date": "v1",
            "city": "v1",
            "lang": "en",
            "lat": "v1",
            "lon": "v1",
            "unit": "metric"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lat",
            "lon",
            "city",
            "start_date",
            "end_date",
            "lang",
            "units"
        ],
        "queryArgs": [
            {
                "name": "city",
                "wire": "city"
            },
            {
                "name": "end_date",
                "wire": "end_date"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "lon",
                "wire": "lon"
            },
            {
                "name": "start_date",
                "wire": "start_date"
            },
            {
                "name": "unit",
                "wire": "units"
            }
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "api_key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "location": {
                "name": "x",
                "country": "x",
                "region": "x",
                "lat": 1,
                "lon": 1,
                "timezone": "x"
            },
            "historical": [
                {
                    "date": "2026-01-01",
                    "timestamp": 1,
                    "temperature": {
                        "min": 1,
                        "max": 1,
                        "avg": 1
                    },
                    "pressure": 1,
                    "humidity": 1,
                    "wind_speed": 1,
                    "wind_direction": 1,
                    "clouds": 1,
                    "precipitation": 1,
                    "weather": {
                        "id": 1,
                        "main": "x",
                        "description": "x"
                    }
                }
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "weather_forecast",
        "accessor": "WeatherForecast",
        "op": "list",
        "method": "GET",
        "path": "/weather/forecast",
        "args": [],
        "select": {
            "city": "v1",
            "day": 7,
            "lang": "en",
            "lat": "v1",
            "lon": "v1",
            "unit": "metric"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lat",
            "lon",
            "city",
            "days",
            "lang",
            "units"
        ],
        "queryArgs": [
            {
                "name": "city",
                "wire": "city"
            },
            {
                "name": "day",
                "wire": "days"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "lon",
                "wire": "lon"
            },
            {
                "name": "unit",
                "wire": "units"
            }
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "api_key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "location": {
                "name": "x",
                "country": "x",
                "region": "x",
                "lat": 1,
                "lon": 1,
                "timezone": "x"
            },
            "forecast": [
                {
                    "date": "2026-01-01",
                    "timestamp": 1,
                    "temperature": {
                        "min": 1,
                        "max": 1,
                        "morning": 1,
                        "day": 1,
                        "evening": 1,
                        "night": 1
                    },
                    "pressure": 1,
                    "humidity": 1,
                    "wind_speed": 1,
                    "wind_direction": 1,
                    "clouds": 1,
                    "precipitation": 1,
                    "weather": {
                        "id": 1,
                        "main": "x",
                        "description": "x",
                        "icon": "x"
                    }
                }
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map