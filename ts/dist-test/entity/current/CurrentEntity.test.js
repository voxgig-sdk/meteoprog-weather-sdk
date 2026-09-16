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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CurrentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when METEOPROG_WEATHER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('METEOPROG_WEATHER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MeteoprogWeatherSDK.test();
        const ent = testsdk.Current();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.METEOPROG_WEATHER_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'current.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "current", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "location", "req": false, "type": "`$OBJECT`", "index$": 1 }], "name": "current", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "city", "orig": "city", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "en", "kind": "query", "name": "lang", "orig": "lang", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "lat", "orig": "lat", "reqd": false, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "kind": "query", "name": "lon", "orig": "lon", "reqd": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "example": "metric", "kind": "query", "name": "unit", "orig": "unit", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /weather/current", "json": "{\"operationId\":\"getCurrentWeather\",\"parameters\":[{\"description\":\"Latitude of the location\",\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"format\":\"float\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Longitude of the location\",\"in\":\"query\",\"name\":\"lon\",\"required\":false,\"schema\":{\"format\":\"float\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},{\"description\":\"City name\",\"in\":\"query\",\"name\":\"city\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Language code for the response\",\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"ru\",\"uk\",\"de\",\"es\",\"fr\"],\"type\":\"string\"}},{\"description\":\"Units of measurement\",\"in\":\"query\",\"name\":\"units\",\"required\":false,\"schema\":{\"default\":\"metric\",\"enum\":[\"metric\",\"imperial\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"current\":{\"properties\":{\"clouds\":{\"description\":\"Cloud coverage percentage\",\"type\":\"integer\"},\"feels_like\":{\"description\":\"Perceived temperature\",\"type\":\"number\"},\"humidity\":{\"description\":\"Humidity percentage\",\"type\":\"integer\"},\"pressure\":{\"description\":\"Atmospheric pressure\",\"type\":\"number\"},\"temperature\":{\"description\":\"Current temperature\",\"type\":\"number\"},\"timestamp\":{\"description\":\"Unix timestamp of the observation\",\"type\":\"integer\"},\"visibility\":{\"description\":\"Visibility distance\",\"type\":\"number\"},\"weather\":{\"properties\":{\"description\":{\"description\":\"Detailed weather description\",\"type\":\"string\"},\"icon\":{\"description\":\"Weather icon code\",\"type\":\"string\"},\"id\":{\"description\":\"Weather condition ID\",\"type\":\"integer\"},\"main\":{\"description\":\"Main weather condition\",\"type\":\"string\"}},\"type\":\"object\"},\"wind_direction\":{\"description\":\"Wind direction in degrees\",\"type\":\"number\"},\"wind_speed\":{\"description\":\"Wind speed\",\"type\":\"number\"}},\"type\":\"object\"},\"location\":{\"properties\":{\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"lat\":{\"description\":\"Latitude\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude\",\"type\":\"number\"},\"name\":{\"description\":\"Location name\",\"type\":\"string\"},\"region\":{\"description\":\"Region or state\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with current weather data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Location not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://billing.meteoprog.com\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/weather/current", "segments": [{ "lit": "weather" }, { "lit": "current" }], "select": { "exist": ["city", "lang", "lat", "lon", "unit"] }, "transform": { "req": "`reqdata`", "res": "`body.current`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "current", "name__orig": "current", "Name": "Current", "name_": "current", "name-": "current", "NAME": "CURRENT", "index$": 0 }, { "active": true, "entity": "current", "key$": "BasicCurrentFlow", "kind": "basic", "name": "BasicCurrentFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "current_ref01", "srcdatavar": "current_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-current_ref01" } }], "index$": 0 }] }, 'Current');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let current_ref01_data = Object.values(setup.data.existing.current)[0];
        // LOAD
        const current_ref01_ent = client.Current();
        const current_ref01_match_dt0 = {};
        const current_ref01_data_dt0 = (await current_ref01_ent.load(current_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != current_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/current/CurrentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MeteoprogWeatherSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['current01', 'current02', 'current03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'METEOPROG_WEATHER_TEST_CURRENT_ENTID': idmap,
        'METEOPROG_WEATHER_TEST_LIVE': 'FALSE',
        'METEOPROG_WEATHER_TEST_EXPLAIN': 'FALSE',
        'METEOPROG_WEATHER_APIKEY': '',
    });
    idmap = env['METEOPROG_WEATHER_TEST_CURRENT_ENTID'];
    const live = 'TRUE' === env.METEOPROG_WEATHER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['METEOPROG_WEATHER_TEST_CURRENT_ENTID'];
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
//# sourceMappingURL=CurrentEntity.test.js.map