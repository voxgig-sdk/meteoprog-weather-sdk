

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('WeatherForecastEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when METEOPROG_WEATHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('METEOPROG_WEATHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MeteoprogWeatherSDK.test()
    const ent = testsdk.WeatherForecast()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.METEOPROG_WEATHER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'weather_forecast.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clouds":{"a":true,"h":"Clouds","n":"clouds","r":false,"sh":"Cloud coverage percentage","t":"`$INTEGER`","key$":"clouds","index$":0},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"sh":"Date of the forecast","t":"`$STRING`","key$":"date","index$":1},"humidity":{"a":true,"h":"Humidity","n":"humidity","r":false,"sh":"Humidity percentage","t":"`$INTEGER`","key$":"humidity","index$":2},"precipitation":{"a":true,"h":"Precipitation","n":"precipitation","r":false,"sh":"Precipitation amount","t":"`$NUMBER`","key$":"precipitation","index$":3},"pressure":{"a":true,"h":"Pressure","n":"pressure","r":false,"sh":"Atmospheric pressure","t":"`$NUMBER`","key$":"pressure","index$":4},"temperature":{"a":true,"h":"Temperature","n":"temperature","r":false,"t":"`$OBJECT`","key$":"temperature","index$":5},"timestamp":{"a":true,"h":"Timestamp","n":"timestamp","r":false,"sh":"Unix timestamp","t":"`$INTEGER`","key$":"timestamp","index$":6},"weather":{"a":true,"h":"Weather","n":"weather","r":false,"t":"`$OBJECT`","key$":"weather","index$":7},"wind_direction":{"a":true,"h":"Wind Direction","n":"wind_direction","r":false,"sh":"Wind direction in degrees","t":"`$NUMBER`","key$":"wind_direction","index$":8},"wind_speed":{"a":true,"h":"Wind Speed","n":"wind_speed","r":false,"sh":"Wind speed","t":"`$NUMBER`","key$":"wind_speed","index$":9}},"name":"weather_forecast","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /weather/forecast","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"city","or":"city","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":7,"k":"query","n":"day","or":"day","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"lon","or":"lon","r":false,"t":"`$NUMBER`","index$":4},{"a":true,"ex":"metric","k":"query","n":"unit","or":"unit","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/weather/forecast","q":{"exist":["city","day","lang","lat","lon","unit"]},"r":{},"s":[{"lit":"weather"},{"lit":"forecast"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"weather_forecast","name__orig":"weather_forecast","Name":"WeatherForecast","name_":"weather_forecast","name-":"weather-forecast","NAME":"WEATHER_FORECAST","index$":2}, {"active":true,"entity":"weather_forecast","key$":"BasicWeatherForecastFlow","kind":"basic","name":"BasicWeatherForecastFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"weather_forecast_ref01"}}],"index$":0}]}, 'WeatherForecast', {"GET /weather/forecast":{"protocol":"http","operationId":"getWeatherForecast","responses":{"200":{"description":"Successful response with weather forecast data","content":{"application/json":{"schema":{"type":"object","properties":{"location":{"key$":"location","properties":{"country":{"description":"Country code","type":"string"},"lat":{"description":"Latitude","type":"number"},"lon":{"description":"Longitude","type":"number"},"name":{"description":"Location name","type":"string"},"region":{"description":"Region or state","type":"string"},"timezone":{"description":"Timezone identifier","type":"string"}},"type":"object","x-ref":"#/components/schemas/Location"},"forecast":{"items":{"properties":{"clouds":{"description":"Cloud coverage percentage","type":"integer","key$":"clouds"},"date":{"description":"Date of the forecast","format":"date","type":"string","key$":"date"},"humidity":{"description":"Humidity percentage","type":"integer","key$":"humidity"},"precipitation":{"description":"Precipitation amount","type":"number","key$":"precipitation"},"pressure":{"description":"Atmospheric pressure","type":"number","key$":"pressure"},"temperature":{"properties":{"day":{"description":"Day temperature","type":"number"},"evening":{"description":"Evening temperature","type":"number"},"max":{"description":"Maximum temperature","type":"number"},"min":{"description":"Minimum temperature","type":"number"},"morning":{"description":"Morning temperature","type":"number"},"night":{"description":"Night temperature","type":"number"}},"type":"object","key$":"temperature"},"timestamp":{"description":"Unix timestamp","type":"integer","key$":"timestamp"},"weather":{"properties":{"description":{"description":"Detailed weather description","type":"string"},"icon":{"description":"Weather icon code","type":"string"},"id":{"description":"Weather condition ID","type":"integer"},"main":{"description":"Main weather condition","type":"string"}},"type":"object","key$":"weather"},"wind_direction":{"description":"Wind direction in degrees","type":"number","key$":"wind_direction"},"wind_speed":{"description":"Wind speed","type":"number","key$":"wind_speed"}},"type":"object","index$":0},"key$":"forecast","type":"array"}},"x-ref":"#/components/schemas/WeatherForecast"}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"integer","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}}},"401":{"description":"Unauthorized - invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"integer","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Location not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"integer","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"integer","description":"Error code"},"message":{"type":"string","description":"Error message"}}}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"lat","in":"query","description":"Latitude of the location","required":false,"schema":{"type":"number","format":"float","minimum":-90,"maximum":90},"index$":0},{"name":"lon","in":"query","description":"Longitude of the location","required":false,"schema":{"type":"number","format":"float","minimum":-180,"maximum":180},"index$":1},{"name":"city","in":"query","description":"City name","required":false,"schema":{"type":"string"},"index$":2},{"name":"days","in":"query","description":"Number of days for the forecast","required":false,"schema":{"type":"integer","default":7,"minimum":1,"maximum":14},"index$":3},{"name":"lang","in":"query","description":"Language code for the response","required":false,"schema":{"type":"string","default":"en","enum":["en","ru","uk","de","es","fr"]},"index$":4},{"name":"units","in":"query","description":"Units of measurement","required":false,"schema":{"type":"string","default":"metric","enum":["metric","imperial"]},"index$":5}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"api_key","description":"API key for authentication. Obtain from https://billing.meteoprog.com"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let weather_forecast_ref01_data = Object.values(setup.data.existing.weather_forecast)[0] as any

    // LIST
    const weather_forecast_ref01_ent = client.WeatherForecast()
    const weather_forecast_ref01_match: any = {}

    const weather_forecast_ref01_list = (await weather_forecast_ref01_ent.list(weather_forecast_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/weather_forecast/WeatherForecastTestData.json')

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
    ['weather_forecast01','weather_forecast02','weather_forecast03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'METEOPROG_WEATHER_TEST_WEATHER_FORECAST_ENTID': idmap,
    'METEOPROG_WEATHER_TEST_LIVE': 'FALSE',
    'METEOPROG_WEATHER_TEST_EXPLAIN': 'FALSE',
    'METEOPROG_WEATHER_APIKEY': '',
  })

  idmap = env['METEOPROG_WEATHER_TEST_WEATHER_FORECAST_ENTID']

  const live = 'TRUE' === env.METEOPROG_WEATHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['METEOPROG_WEATHER_TEST_WEATHER_FORECAST_ENTID']
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
  
