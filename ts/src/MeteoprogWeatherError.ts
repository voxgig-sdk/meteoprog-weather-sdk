
import { Context } from './Context'


class MeteoprogWeatherError extends Error {

  isMeteoprogWeatherError = true

  sdk = 'MeteoprogWeather'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MeteoprogWeatherError
}

