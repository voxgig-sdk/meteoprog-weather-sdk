import { Context } from './Context';
declare class MeteoprogWeatherError extends Error {
    isMeteoprogWeatherError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MeteoprogWeatherError };
