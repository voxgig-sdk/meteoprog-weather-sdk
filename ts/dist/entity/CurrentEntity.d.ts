import { MeteoprogWeatherEntityBase } from '../MeteoprogWeatherEntityBase';
import type { MeteoprogWeatherSDK } from '../MeteoprogWeatherSDK';
import type { Control } from '../types';
import type { Current, CurrentLoadMatch } from '../MeteoprogWeatherTypes';
declare class CurrentEntity extends MeteoprogWeatherEntityBase<Current> {
    constructor(client: MeteoprogWeatherSDK, entopts: any);
    make(this: CurrentEntity): CurrentEntity;
    load(this: any, reqmatch?: CurrentLoadMatch, ctrl?: Control): Promise<CurrentEntity>;
}
export { CurrentEntity };
