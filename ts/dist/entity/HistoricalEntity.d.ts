import { MeteoprogWeatherEntityBase } from '../MeteoprogWeatherEntityBase';
import type { MeteoprogWeatherSDK } from '../MeteoprogWeatherSDK';
import type { Control } from '../types';
import type { Historical, HistoricalListMatch } from '../MeteoprogWeatherTypes';
declare class HistoricalEntity extends MeteoprogWeatherEntityBase<Historical> {
    constructor(client: MeteoprogWeatherSDK, entopts: any);
    make(this: HistoricalEntity): HistoricalEntity;
    list(this: any, reqmatch?: HistoricalListMatch, ctrl?: Control): Promise<HistoricalEntity[]>;
}
export { HistoricalEntity };
