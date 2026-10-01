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
            "lang": "v1",
            "lat": "v1",
            "lon": "v1",
            "unit": "v1"
        },
        "headers": [],
        "query": [
            "lat",
            "lon",
            "city",
            "lang",
            "units"
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
                "country": "x",
                "lat": 1,
                "lon": 1,
                "name": "x",
                "region": "x",
                "timezone": "x"
            },
            "current": {
                "clouds": 1,
                "feels_like": 1,
                "humidity": 1,
                "pressure": 1,
                "temperature": 1,
                "timestamp": 1,
                "visibility": 1,
                "weather": {
                    "description": "x",
                    "icon": "x",
                    "id": 1,
                    "main": "x"
                },
                "wind_direction": 1,
                "wind_speed": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "historical",
        "accessor": "Historical",
        "op": "list",
        "method": "GET",
        "path": "/weather/historical",
        "args": [],
        "select": {
            "city": "v1",
            "end_date": "v1",
            "lang": "v1",
            "lat": "v1",
            "lon": "v1",
            "start_date": "v1",
            "unit": "v1"
        },
        "headers": [],
        "query": [
            "lat",
            "lon",
            "city",
            "start_date",
            "end_date",
            "lang",
            "units"
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
                "country": "x",
                "lat": 1,
                "lon": 1,
                "name": "x",
                "region": "x",
                "timezone": "x"
            },
            "historical": [
                {
                    "clouds": 1,
                    "date": "2026-01-01",
                    "humidity": 1,
                    "precipitation": 1,
                    "pressure": 1,
                    "temperature": {
                        "avg": 1,
                        "max": 1,
                        "min": 1
                    },
                    "timestamp": 1,
                    "weather": {
                        "description": "x",
                        "id": 1,
                        "main": "x"
                    },
                    "wind_direction": 1,
                    "wind_speed": 1
                }
            ]
        },
        "idField": "id"
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
            "day": "v1",
            "lang": "v1",
            "lat": "v1",
            "lon": "v1",
            "unit": "v1"
        },
        "headers": [],
        "query": [
            "lat",
            "lon",
            "city",
            "days",
            "lang",
            "units"
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
                "country": "x",
                "lat": 1,
                "lon": 1,
                "name": "x",
                "region": "x",
                "timezone": "x"
            },
            "forecast": [
                {
                    "clouds": 1,
                    "date": "2026-01-01",
                    "humidity": 1,
                    "precipitation": 1,
                    "pressure": 1,
                    "temperature": {
                        "day": 1,
                        "evening": 1,
                        "max": 1,
                        "min": 1,
                        "morning": 1,
                        "night": 1
                    },
                    "timestamp": 1,
                    "weather": {
                        "description": "x",
                        "icon": "x",
                        "id": 1,
                        "main": "x"
                    },
                    "wind_direction": 1,
                    "wind_speed": 1
                }
            ]
        },
        "idField": "id"
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