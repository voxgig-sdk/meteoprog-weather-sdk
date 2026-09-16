

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MeteoprogWeatherSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CurrentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when METEOPROG_WEATHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('METEOPROG_WEATHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MeteoprogWeatherSDK.test()
    const ent = testsdk.Current()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.METEOPROG_WEATHER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'current.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"current","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"location","req":false,"type":"`$OBJECT`","index$":1}],"name":"current","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"city","orig":"city","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"en","kind":"query","name":"lang","orig":"lang","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"lat","orig":"lat","reqd":false,"type":"`$NUMBER`","index$":2},{"active":true,"kind":"query","name":"lon","orig":"lon","reqd":false,"type":"`$NUMBER`","index$":3},{"active":true,"example":"metric","kind":"query","name":"unit","orig":"unit","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /weather/current","json":"{\"operationId\":\"getCurrentWeather\",\"parameters\":[{\"description\":\"Latitude of the location\",\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"format\":\"float\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Longitude of the location\",\"in\":\"query\",\"name\":\"lon\",\"required\":false,\"schema\":{\"format\":\"float\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},{\"description\":\"City name\",\"in\":\"query\",\"name\":\"city\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Language code for the response\",\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"ru\",\"uk\",\"de\",\"es\",\"fr\"],\"type\":\"string\"}},{\"description\":\"Units of measurement\",\"in\":\"query\",\"name\":\"units\",\"required\":false,\"schema\":{\"default\":\"metric\",\"enum\":[\"metric\",\"imperial\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"current\":{\"properties\":{\"clouds\":{\"description\":\"Cloud coverage percentage\",\"type\":\"integer\"},\"feels_like\":{\"description\":\"Perceived temperature\",\"type\":\"number\"},\"humidity\":{\"description\":\"Humidity percentage\",\"type\":\"integer\"},\"pressure\":{\"description\":\"Atmospheric pressure\",\"type\":\"number\"},\"temperature\":{\"description\":\"Current temperature\",\"type\":\"number\"},\"timestamp\":{\"description\":\"Unix timestamp of the observation\",\"type\":\"integer\"},\"visibility\":{\"description\":\"Visibility distance\",\"type\":\"number\"},\"weather\":{\"properties\":{\"description\":{\"description\":\"Detailed weather description\",\"type\":\"string\"},\"icon\":{\"description\":\"Weather icon code\",\"type\":\"string\"},\"id\":{\"description\":\"Weather condition ID\",\"type\":\"integer\"},\"main\":{\"description\":\"Main weather condition\",\"type\":\"string\"}},\"type\":\"object\"},\"wind_direction\":{\"description\":\"Wind direction in degrees\",\"type\":\"number\"},\"wind_speed\":{\"description\":\"Wind speed\",\"type\":\"number\"}},\"type\":\"object\"},\"location\":{\"properties\":{\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"lat\":{\"description\":\"Latitude\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude\",\"type\":\"number\"},\"name\":{\"description\":\"Location name\",\"type\":\"string\"},\"region\":{\"description\":\"Region or state\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with current weather data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Location not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://billing.meteoprog.com\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/weather/current","segments":[{"lit":"weather"},{"lit":"current"}],"select":{"exist":["city","lang","lat","lon","unit"]},"transform":{"req":"`reqdata`","res":"`body.current`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"current","name__orig":"current","Name":"Current","name_":"current","name-":"current","NAME":"CURRENT","index$":0}, {"active":true,"entity":"current","key$":"BasicCurrentFlow","kind":"basic","name":"BasicCurrentFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"current_ref01","srcdatavar":"current_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-current_ref01"}}],"index$":0}]}, 'Current')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let current_ref01_data = Object.values(setup.data.existing.current)[0] as any

    // LOAD
    const current_ref01_ent = client.Current()
    const current_ref01_match_dt0: any = {}
    const current_ref01_data_dt0 = (await current_ref01_ent.load(current_ref01_match_dt0)).data()
    assert(null != current_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/current/CurrentTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MeteoprogWeatherSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['current01','current02','current03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'METEOPROG_WEATHER_TEST_CURRENT_ENTID': idmap,
    'METEOPROG_WEATHER_TEST_LIVE': 'FALSE',
    'METEOPROG_WEATHER_TEST_EXPLAIN': 'FALSE',
    'METEOPROG_WEATHER_APIKEY': '',
  })

  idmap = env['METEOPROG_WEATHER_TEST_CURRENT_ENTID']

  const live = 'TRUE' === env.METEOPROG_WEATHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['METEOPROG_WEATHER_TEST_CURRENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MeteoprogWeatherSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
