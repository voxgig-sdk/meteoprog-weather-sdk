export interface Current {
    current?: Record<string, any>;
    location?: Record<string, any>;
}
export interface CurrentLoadMatch {
    city?: string;
    lang?: string;
    lat?: number;
    lon?: number;
    unit?: string;
}
export interface Historical {
    clouds?: number;
    date?: string;
    humidity?: number;
    precipitation?: number;
    pressure?: number;
    temperature?: Record<string, any>;
    timestamp?: number;
    weather?: Record<string, any>;
    wind_direction?: number;
    wind_speed?: number;
}
export interface HistoricalListMatch {
    city?: string;
    end_date: string;
    lang?: string;
    lat?: number;
    lon?: number;
    start_date: string;
    unit?: string;
}
export interface WeatherForecast {
    clouds?: number;
    date?: string;
    humidity?: number;
    precipitation?: number;
    pressure?: number;
    temperature?: Record<string, any>;
    timestamp?: number;
    weather?: Record<string, any>;
    wind_direction?: number;
    wind_speed?: number;
}
export interface WeatherForecastListMatch {
    city?: string;
    day?: number;
    lang?: string;
    lat?: number;
    lon?: number;
    unit?: string;
}
