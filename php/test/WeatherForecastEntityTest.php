<?php
declare(strict_types=1);

// WeatherForecast entity test

require_once __DIR__ . '/../meteoprogweather_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class WeatherForecastEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MeteoprogWeatherSDK::test(null, null);
        $ent = $testsdk->WeatherForecast(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = weather_forecast_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "weather_forecast." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set METEOPROGWEATHER_TEST_WEATHER_FORECAST_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $weather_forecast_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.weather_forecast")));
        $weather_forecast_ref01_data = null;
        if (count($weather_forecast_ref01_data_raw) > 0) {
            $weather_forecast_ref01_data = Helpers::to_map($weather_forecast_ref01_data_raw[0][1]);
        }

        // LIST
        $weather_forecast_ref01_ent = $client->WeatherForecast(null);
        $weather_forecast_ref01_match = [];

        [$weather_forecast_ref01_list_result, $err] = $weather_forecast_ref01_ent->list($weather_forecast_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($weather_forecast_ref01_list_result);

    }
}

function weather_forecast_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/weather_forecast/WeatherForecastTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MeteoprogWeatherSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["weather_forecast01", "weather_forecast02", "weather_forecast03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("METEOPROGWEATHER_TEST_WEATHER_FORECAST_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "METEOPROGWEATHER_TEST_WEATHER_FORECAST_ENTID" => $idmap,
        "METEOPROGWEATHER_TEST_LIVE" => "FALSE",
        "METEOPROGWEATHER_TEST_EXPLAIN" => "FALSE",
        "METEOPROGWEATHER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["METEOPROGWEATHER_TEST_WEATHER_FORECAST_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["METEOPROGWEATHER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["METEOPROGWEATHER_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new MeteoprogWeatherSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["METEOPROGWEATHER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["METEOPROGWEATHER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
