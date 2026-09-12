import { MeteoprogWeatherEntityBase } from '../MeteoprogWeatherEntityBase';
import type { MeteoprogWeatherSDK } from '../MeteoprogWeatherSDK';
import type { Control } from '../types';
import type { WeatherForecast, WeatherForecastListMatch } from '../MeteoprogWeatherTypes';
declare class WeatherForecastEntity extends MeteoprogWeatherEntityBase<WeatherForecast> {
    constructor(client: MeteoprogWeatherSDK, entopts: any);
    make(this: WeatherForecastEntity): WeatherForecastEntity;
    list(this: any, reqmatch?: WeatherForecastListMatch, ctrl?: Control): Promise<WeatherForecastEntity[]>;
}
export { WeatherForecastEntity };
