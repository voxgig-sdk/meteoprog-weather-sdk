
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MeteoprogWeatherSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MeteoprogWeatherSDK.test()
    equal(testsdk instanceof MeteoprogWeatherSDK, true,
      'MeteoprogWeatherSDK.test() must return a client synchronously')
  })

})
