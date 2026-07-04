# Typed models for the MeteoprogWeather SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Current:
    current: Optional[dict] = None
    location: Optional[dict] = None


@dataclass
class CurrentLoadMatch:
    current: Optional[dict] = None
    location: Optional[dict] = None


@dataclass
class Historical:
    cloud: Optional[int] = None
    date: Optional[str] = None
    humidity: Optional[int] = None
    precipitation: Optional[float] = None
    pressure: Optional[float] = None
    temperature: Optional[dict] = None
    timestamp: Optional[int] = None
    weather: Optional[dict] = None
    wind_direction: Optional[float] = None
    wind_speed: Optional[float] = None


@dataclass
class HistoricalListMatch:
    cloud: Optional[int] = None
    date: Optional[str] = None
    humidity: Optional[int] = None
    precipitation: Optional[float] = None
    pressure: Optional[float] = None
    temperature: Optional[dict] = None
    timestamp: Optional[int] = None
    weather: Optional[dict] = None
    wind_direction: Optional[float] = None
    wind_speed: Optional[float] = None


@dataclass
class WeatherForecast:
    cloud: Optional[int] = None
    date: Optional[str] = None
    humidity: Optional[int] = None
    precipitation: Optional[float] = None
    pressure: Optional[float] = None
    temperature: Optional[dict] = None
    timestamp: Optional[int] = None
    weather: Optional[dict] = None
    wind_direction: Optional[float] = None
    wind_speed: Optional[float] = None


@dataclass
class WeatherForecastListMatch:
    cloud: Optional[int] = None
    date: Optional[str] = None
    humidity: Optional[int] = None
    precipitation: Optional[float] = None
    pressure: Optional[float] = None
    temperature: Optional[dict] = None
    timestamp: Optional[int] = None
    weather: Optional[dict] = None
    wind_direction: Optional[float] = None
    wind_speed: Optional[float] = None

