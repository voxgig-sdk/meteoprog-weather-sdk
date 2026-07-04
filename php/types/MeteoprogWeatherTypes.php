<?php
declare(strict_types=1);

// Typed models for the MeteoprogWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Current entity data model. */
class Current
{
    public ?array $current = null;
    public ?array $location = null;
}

/** Match filter for Current#load (any subset of Current fields). */
class CurrentLoadMatch
{
    public ?array $current = null;
    public ?array $location = null;
}

/** Historical entity data model. */
class Historical
{
    public ?int $cloud = null;
    public ?string $date = null;
    public ?int $humidity = null;
    public ?float $precipitation = null;
    public ?float $pressure = null;
    public ?array $temperature = null;
    public ?int $timestamp = null;
    public ?array $weather = null;
    public ?float $wind_direction = null;
    public ?float $wind_speed = null;
}

/** Match filter for Historical#list (any subset of Historical fields). */
class HistoricalListMatch
{
    public ?int $cloud = null;
    public ?string $date = null;
    public ?int $humidity = null;
    public ?float $precipitation = null;
    public ?float $pressure = null;
    public ?array $temperature = null;
    public ?int $timestamp = null;
    public ?array $weather = null;
    public ?float $wind_direction = null;
    public ?float $wind_speed = null;
}

/** WeatherForecast entity data model. */
class WeatherForecast
{
    public ?int $cloud = null;
    public ?string $date = null;
    public ?int $humidity = null;
    public ?float $precipitation = null;
    public ?float $pressure = null;
    public ?array $temperature = null;
    public ?int $timestamp = null;
    public ?array $weather = null;
    public ?float $wind_direction = null;
    public ?float $wind_speed = null;
}

/** Match filter for WeatherForecast#list (any subset of WeatherForecast fields). */
class WeatherForecastListMatch
{
    public ?int $cloud = null;
    public ?string $date = null;
    public ?int $humidity = null;
    public ?float $precipitation = null;
    public ?float $pressure = null;
    public ?array $temperature = null;
    public ?int $timestamp = null;
    public ?array $weather = null;
    public ?float $wind_direction = null;
    public ?float $wind_speed = null;
}

