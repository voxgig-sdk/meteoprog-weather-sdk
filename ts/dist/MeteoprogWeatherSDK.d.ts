import { CurrentEntity } from './entity/CurrentEntity';
import { HistoricalEntity } from './entity/HistoricalEntity';
import { WeatherForecastEntity } from './entity/WeatherForecastEntity';
export type * from './MeteoprogWeatherTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MeteoprogWeatherEntityBase } from './MeteoprogWeatherEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MeteoprogWeatherSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Current(entopts?: Record<string, any>): CurrentEntity;
    Historical(entopts?: Record<string, any>): HistoricalEntity;
    WeatherForecast(entopts?: Record<string, any>): WeatherForecastEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MeteoprogWeatherSDK;
    tester(testopts?: any, sdkopts?: any): MeteoprogWeatherSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MeteoprogWeatherSDK;
export { stdutil, config, BaseFeature, MeteoprogWeatherEntityBase, MeteoprogWeatherSDK, SDK, };
