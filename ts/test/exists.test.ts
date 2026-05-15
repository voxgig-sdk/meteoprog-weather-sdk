
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MeteoprogWeatherSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MeteoprogWeatherSDK.test()
    equal(null !== testsdk, true)
  })

})
