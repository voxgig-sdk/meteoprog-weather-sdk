<?php
declare(strict_types=1);

// MeteoprogWeather SDK base feature

class MeteoprogWeatherBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MeteoprogWeatherContext $ctx, array $options): void {}
    public function PostConstruct(MeteoprogWeatherContext $ctx): void {}
    public function PostConstructEntity(MeteoprogWeatherContext $ctx): void {}
    public function SetData(MeteoprogWeatherContext $ctx): void {}
    public function GetData(MeteoprogWeatherContext $ctx): void {}
    public function GetMatch(MeteoprogWeatherContext $ctx): void {}
    public function SetMatch(MeteoprogWeatherContext $ctx): void {}
    public function PrePoint(MeteoprogWeatherContext $ctx): void {}
    public function PreSpec(MeteoprogWeatherContext $ctx): void {}
    public function PreRequest(MeteoprogWeatherContext $ctx): void {}
    public function PreResponse(MeteoprogWeatherContext $ctx): void {}
    public function PreResult(MeteoprogWeatherContext $ctx): void {}
    public function PreDone(MeteoprogWeatherContext $ctx): void {}
    public function PreUnexpected(MeteoprogWeatherContext $ctx): void {}
}
