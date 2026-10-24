

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MeteoprogWeatherSDK, BaseFeature, config, stdutil } from '../../..'

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('HistoricalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when METEOPROG_WEATHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('METEOPROG_WEATHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MeteoprogWeatherSDK.test()
    const ent = testsdk.Historical()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('historical hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of MeteoprogWeatherSDK.test(offline).Historical().stream('list')) { }
    }, /offline/)

    for await (const _item of MeteoprogWeatherSDK.test(offline).Historical()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = MeteoprogWeatherSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Historical().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of MeteoprogWeatherSDK.test().Historical().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new MeteoprogWeatherSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Historical().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Historical().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = MeteoprogWeatherSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Historical().list({"city":1,"end_date":"x","start_date":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.METEOPROG_WEATHER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'historical.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clouds":{"a":true,"h":"Clouds","n":"clouds","r":false,"sh":"Cloud coverage percentage","t":"`$INTEGER`","key$":"clouds","index$":0},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"sh":"Date of the historical data","t":"`$STRING`","key$":"date","index$":1},"humidity":{"a":true,"h":"Humidity","n":"humidity","r":false,"sh":"Humidity percentage","t":"`$INTEGER`","key$":"humidity","index$":2},"precipitation":{"a":true,"h":"Precipitation","n":"precipitation","r":false,"sh":"Precipitation amount","t":"`$NUMBER`","key$":"precipitation","index$":3},"pressure":{"a":true,"h":"Pressure","n":"pressure","r":false,"sh":"Atmospheric pressure","t":"`$NUMBER`","key$":"pressure","index$":4},"temperature":{"a":true,"h":"Temperature","n":"temperature","r":false,"t":"`$OBJECT`","key$":"temperature","index$":5},"timestamp":{"a":true,"h":"Timestamp","n":"timestamp","r":false,"sh":"Unix timestamp","t":"`$INTEGER`","key$":"timestamp","index$":6},"weather":{"a":true,"h":"Weather","n":"weather","r":false,"t":"`$OBJECT`","key$":"weather","index$":7},"wind_direction":{"a":true,"h":"Wind Direction","n":"wind_direction","r":false,"sh":"Wind direction in degrees","t":"`$NUMBER`","key$":"wind_direction","index$":8},"wind_speed":{"a":true,"h":"Wind Speed","n":"wind_speed","r":false,"sh":"Wind speed","t":"`$NUMBER`","key$":"wind_speed","index$":9}},"name":"historical","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /weather/historical","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"city","or":"city","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"end_date","or":"end_date","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"lon","or":"lon","r":false,"t":"`$NUMBER`","index$":4},{"a":true,"k":"query","n":"start_date","or":"start_date","r":true,"t":"`$STRING`","index$":5},{"a":true,"ex":"metric","k":"query","n":"unit","or":"units","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/weather/historical","q":{"exist":["end_date","start_date"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"weather"},{"lit":"historical"}],"t":{"req":"`reqdata`","res":"`body.historical`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"historical","name__orig":"historical","Name":"Historical","name_":"historical","name-":"historical","NAME":"HISTORICAL","index$":1}, {"active":true,"entity":"historical","key$":"BasicHistoricalFlow","kind":"basic","name":"BasicHistoricalFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"historical_ref01"}}],"index$":0}]}, 'Historical', {"GET /weather/historical":{"protocol":"http","parameters":[{"name":"lat","in":"query","description":"Latitude of the location","required":false,"schema":{"type":"number","format":"float","minimum":-90,"maximum":90},"index$":0},{"name":"lon","in":"query","description":"Longitude of the location","required":false,"schema":{"type":"number","format":"float","minimum":-180,"maximum":180},"index$":1},{"name":"city","in":"query","description":"City name","required":false,"schema":{"type":"string"},"index$":2},{"name":"start_date","in":"query","description":"Start date for historical data (YYYY-MM-DD)","required":true,"schema":{"type":"string","format":"date"},"index$":3},{"name":"end_date","in":"query","description":"End date for historical data (YYYY-MM-DD)","required":true,"schema":{"type":"string","format":"date"},"index$":4},{"name":"lang","in":"query","description":"Language code for the response","required":false,"schema":{"type":"string","default":"en","enum":["en","ru","uk","de","es","fr"]},"index$":5},{"name":"units","in":"query","description":"Units of measurement","required":false,"schema":{"type":"string","default":"metric","enum":["metric","imperial"]},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let historical_ref01_data = Object.values(setup.data.existing.historical)[0] as any

    // LIST
    const historical_ref01_ent = client.Historical()
    const historical_ref01_match: any = {}

    const historical_ref01_list = (await historical_ref01_ent.list(historical_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/historical/HistoricalTestData.json')

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
    ['historical01','historical02','historical03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'METEOPROG_WEATHER_TEST_HISTORICAL_ENTID': idmap,
    'METEOPROG_WEATHER_TEST_LIVE': 'FALSE',
    'METEOPROG_WEATHER_TEST_EXPLAIN': 'FALSE',
    'METEOPROG_WEATHER_APIKEY': '',
  })

  idmap = env['METEOPROG_WEATHER_TEST_HISTORICAL_ENTID']

  const live = 'TRUE' === env.METEOPROG_WEATHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['METEOPROG_WEATHER_TEST_HISTORICAL_ENTID']
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
  
