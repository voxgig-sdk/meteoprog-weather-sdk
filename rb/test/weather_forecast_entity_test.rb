# WeatherForecast entity test

require "minitest/autorun"
require "json"
require_relative "../MeteoprogWeather_sdk"
require_relative "runner"

class WeatherForecastEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = MeteoprogWeatherSDK.test(nil, nil)
    ent = testsdk.WeatherForecast(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "weather_forecast" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = MeteoprogWeatherSDK.test(seed, nil).WeatherForecast(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "weather_forecast" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = MeteoprogWeatherSDK.test(seed, nil)
    seen = base.WeatherForecast(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = MeteoprogWeatherConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = MeteoprogWeatherSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.WeatherForecast(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < MeteoprogWeatherBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "weather_forecast hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      MeteoprogWeatherSDK.test(offline, nil).WeatherForecast(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    MeteoprogWeatherSDK.test(offline, nil).WeatherForecast(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = MeteoprogWeatherConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = MeteoprogWeatherSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.WeatherForecast(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    MeteoprogWeatherSDK.test(nil, nil).WeatherForecast(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = MeteoprogWeatherSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.WeatherForecast(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.WeatherForecast(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = MeteoprogWeatherConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = MeteoprogWeatherSDK.test({ "entity" => { "weather_forecast" => { "v1" => {  } } } }, opts).WeatherForecast(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
    err = assert_raises(StandardError) do
      MeteoprogWeatherSDK.test({ "entity" => { "weather_forecast" => { "v1" => { "clouds" => "x" } } } }, opts).WeatherForecast(nil).list(nil, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_validate
    cfg = MeteoprogWeatherConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = MeteoprogWeatherSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.WeatherForecast(nil).list({ "city" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = weather_forecast_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "weather_forecast." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    weather_forecast_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.weather_forecast")))
    weather_forecast_ref01_data = nil
    if weather_forecast_ref01_data_raw.length > 0
      weather_forecast_ref01_data = Helpers.to_map(weather_forecast_ref01_data_raw[0][1])
    end

    # LIST
    weather_forecast_ref01_ent = client.WeatherForecast(nil)
    weather_forecast_ref01_match = {}

    weather_forecast_ref01_list_result = weather_forecast_ref01_ent.list(weather_forecast_ref01_match, nil)
    assert weather_forecast_ref01_list_result.is_a?(Array)

  end
end

def weather_forecast_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "weather_forecast", "WeatherForecastTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MeteoprogWeatherSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["weather_forecast01", "weather_forecast02", "weather_forecast03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["METEOPROG_WEATHER_TEST_WEATHER_FORECAST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "METEOPROG_WEATHER_TEST_WEATHER_FORECAST_ENTID" => idmap,
    "METEOPROG_WEATHER_TEST_LIVE" => "FALSE",
    "METEOPROG_WEATHER_TEST_EXPLAIN" => "FALSE",
    "METEOPROG_WEATHER_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["METEOPROG_WEATHER_TEST_WEATHER_FORECAST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["METEOPROG_WEATHER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["METEOPROG_WEATHER_APIKEY"],
      },
      extra || {},
    ])
    client = MeteoprogWeatherSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["METEOPROG_WEATHER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["METEOPROG_WEATHER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
