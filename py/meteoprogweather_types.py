# Typed models for the MeteoprogWeather SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Current(TypedDict, total=False):
    current: dict
    location: dict


class CurrentLoadMatch(TypedDict, total=False):
    current: dict
    location: dict


class Historical(TypedDict, total=False):
    cloud: int
    date: str
    humidity: int
    precipitation: float
    pressure: float
    temperature: dict
    timestamp: int
    weather: dict
    wind_direction: float
    wind_speed: float


class HistoricalListMatch(TypedDict, total=False):
    cloud: int
    date: str
    humidity: int
    precipitation: float
    pressure: float
    temperature: dict
    timestamp: int
    weather: dict
    wind_direction: float
    wind_speed: float


class WeatherForecast(TypedDict, total=False):
    cloud: int
    date: str
    humidity: int
    precipitation: float
    pressure: float
    temperature: dict
    timestamp: int
    weather: dict
    wind_direction: float
    wind_speed: float


class WeatherForecastListMatch(TypedDict, total=False):
    cloud: int
    date: str
    humidity: int
    precipitation: float
    pressure: float
    temperature: dict
    timestamp: int
    weather: dict
    wind_direction: float
    wind_speed: float
