"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('HistoricalEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when METEOPROG_WEATHER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('METEOPROG_WEATHER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MeteoprogWeatherSDK.test();
        const ent = testsdk.Historical();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.METEOPROG_WEATHER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'historical.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "clouds": { "a": true, "h": "Clouds", "n": "clouds", "r": false, "sh": "Cloud coverage percentage", "t": "`$INTEGER`", "key$": "clouds", "index$": 0 }, "date": { "a": true, "fo": "date", "h": "Date", "n": "date", "r": false, "sh": "Date of the historical data", "t": "`$STRING`", "key$": "date", "index$": 1 }, "humidity": { "a": true, "h": "Humidity", "n": "humidity", "r": false, "sh": "Humidity percentage", "t": "`$INTEGER`", "key$": "humidity", "index$": 2 }, "precipitation": { "a": true, "h": "Precipitation", "n": "precipitation", "r": false, "sh": "Precipitation amount", "t": "`$NUMBER`", "key$": "precipitation", "index$": 3 }, "pressure": { "a": true, "h": "Pressure", "n": "pressure", "r": false, "sh": "Atmospheric pressure", "t": "`$NUMBER`", "key$": "pressure", "index$": 4 }, "temperature": { "a": true, "h": "Temperature", "n": "temperature", "r": false, "t": "`$OBJECT`", "key$": "temperature", "index$": 5 }, "timestamp": { "a": true, "h": "Timestamp", "n": "timestamp", "r": false, "sh": "Unix timestamp", "t": "`$INTEGER`", "key$": "timestamp", "index$": 6 }, "weather": { "a": true, "h": "Weather", "n": "weather", "r": false, "t": "`$OBJECT`", "key$": "weather", "index$": 7 }, "wind_direction": { "a": true, "h": "Wind Direction", "n": "wind_direction", "r": false, "sh": "Wind direction in degrees", "t": "`$NUMBER`", "key$": "wind_direction", "index$": 8 }, "wind_speed": { "a": true, "h": "Wind Speed", "n": "wind_speed", "r": false, "sh": "Wind speed", "t": "`$NUMBER`", "key$": "wind_speed", "index$": 9 } }, "name": "historical", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /weather/historical", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "city", "or": "city", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "end_date", "or": "end_date", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "lat", "or": "lat", "r": false, "t": "`$NUMBER`", "index$": 3 }, { "a": true, "k": "query", "n": "lon", "or": "lon", "r": false, "t": "`$NUMBER`", "index$": 4 }, { "a": true, "k": "query", "n": "start_date", "or": "start_date", "r": true, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "metric", "k": "query", "n": "unit", "or": "unit", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/weather/historical", "q": { "exist": ["city", "end_date", "lang", "lat", "lon", "start_date", "unit"] }, "r": {}, "s": [{ "lit": "weather" }, { "lit": "historical" }], "t": { "req": "`reqdata`", "res": "`body.historical`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "historical", "name__orig": "historical", "Name": "Historical", "name_": "historical", "name-": "historical", "NAME": "HISTORICAL", "index$": 1 }, { "active": true, "entity": "historical", "key$": "BasicHistoricalFlow", "kind": "basic", "name": "BasicHistoricalFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "historical_ref01" } }], "index$": 0 }] }, 'Historical', { "GET /weather/historical": { "protocol": "http", "operationId": "getHistoricalWeather", "responses": { "200": { "description": "Successful response with historical weather data", "content": { "application/json": { "schema": { "type": "object", "properties": { "location": { "key$": "location", "properties": { "country": { "description": "Country code", "type": "string" }, "lat": { "description": "Latitude", "type": "number" }, "lon": { "description": "Longitude", "type": "number" }, "name": { "description": "Location name", "type": "string" }, "region": { "description": "Region or state", "type": "string" }, "timezone": { "description": "Timezone identifier", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Location" }, "historical": { "items": { "properties": { "clouds": { "description": "Cloud coverage percentage", "type": "integer", "key$": "clouds" }, "date": { "description": "Date of the historical data", "format": "date", "type": "string", "key$": "date" }, "humidity": { "description": "Humidity percentage", "type": "integer", "key$": "humidity" }, "precipitation": { "description": "Precipitation amount", "type": "number", "key$": "precipitation" }, "pressure": { "description": "Atmospheric pressure", "type": "number", "key$": "pressure" }, "temperature": { "properties": { "avg": { "description": "Average temperature", "type": "number" }, "max": { "description": "Maximum temperature", "type": "number" }, "min": { "description": "Minimum temperature", "type": "number" } }, "type": "object", "key$": "temperature" }, "timestamp": { "description": "Unix timestamp", "type": "integer", "key$": "timestamp" }, "weather": { "properties": { "description": { "description": "Detailed weather description", "type": "string" }, "id": { "description": "Weather condition ID", "type": "integer" }, "main": { "description": "Main weather condition", "type": "string" } }, "type": "object", "key$": "weather" }, "wind_direction": { "description": "Wind direction in degrees", "type": "number", "key$": "wind_direction" }, "wind_speed": { "description": "Wind speed", "type": "number", "key$": "wind_speed" } }, "type": "object", "index$": 0 }, "key$": "historical", "type": "array" } }, "x-ref": "#/components/schemas/HistoricalWeather" } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "integer", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } } }, "401": { "description": "Unauthorized - invalid or missing API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "integer", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } } }, "404": { "description": "Location not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "integer", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "integer", "description": "Error code" }, "message": { "type": "string", "description": "Error message" } } } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "lat", "in": "query", "description": "Latitude of the location", "required": false, "schema": { "type": "number", "format": "float", "minimum": -90, "maximum": 90 }, "index$": 0 }, { "name": "lon", "in": "query", "description": "Longitude of the location", "required": false, "schema": { "type": "number", "format": "float", "minimum": -180, "maximum": 180 }, "index$": 1 }, { "name": "city", "in": "query", "description": "City name", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "name": "start_date", "in": "query", "description": "Start date for historical data (YYYY-MM-DD)", "required": true, "schema": { "type": "string", "format": "date" }, "index$": 3 }, { "name": "end_date", "in": "query", "description": "End date for historical data (YYYY-MM-DD)", "required": true, "schema": { "type": "string", "format": "date" }, "index$": 4 }, { "name": "lang", "in": "query", "description": "Language code for the response", "required": false, "schema": { "type": "string", "default": "en", "enum": ["en", "ru", "uk", "de", "es", "fr"] }, "index$": 5 }, { "name": "units", "in": "query", "description": "Units of measurement", "required": false, "schema": { "type": "string", "default": "metric", "enum": ["metric", "imperial"] }, "index$": 6 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key for authentication. Obtain from https://billing.meteoprog.com" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let historical_ref01_data = Object.values(setup.data.existing.historical)[0];
        // LIST
        const historical_ref01_ent = client.Historical();
        const historical_ref01_match = {};
        const historical_ref01_list = (await historical_ref01_ent.list(historical_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/historical/HistoricalTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MeteoprogWeatherSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['historical01', 'historical02', 'historical03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'METEOPROG_WEATHER_TEST_HISTORICAL_ENTID': idmap,
        'METEOPROG_WEATHER_TEST_LIVE': 'FALSE',
        'METEOPROG_WEATHER_TEST_EXPLAIN': 'FALSE',
        'METEOPROG_WEATHER_APIKEY': '',
    });
    idmap = env['METEOPROG_WEATHER_TEST_HISTORICAL_ENTID'];
    const live = 'TRUE' === env.METEOPROG_WEATHER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['METEOPROG_WEATHER_TEST_HISTORICAL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MeteoprogWeatherSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.METEOPROG_WEATHER_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.METEOPROG_WEATHER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=HistoricalEntity.test.js.map