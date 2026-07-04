# MeteoprogWeather Lua SDK Reference

Complete API reference for the MeteoprogWeather Lua SDK.


## MeteoprogWeatherSDK

### Constructor

```lua
local sdk = require("meteoprog-weather_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Current(data)`

Create a new `Current` entity instance. Pass `nil` for no initial data.

#### `Historical(data)`

Create a new `Historical` entity instance. Pass `nil` for no initial data.

#### `WeatherForecast(data)`

Create a new `WeatherForecast` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CurrentEntity

```lua
local current = client:current(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | ``$OBJECT`` | No |  |
| `location` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:current():load({ id = "current_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HistoricalEntity

```lua
local historical = client:historical(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cloud` | ``$INTEGER`` | No |  |
| `date` | ``$STRING`` | No |  |
| `humidity` | ``$INTEGER`` | No |  |
| `precipitation` | ``$NUMBER`` | No |  |
| `pressure` | ``$NUMBER`` | No |  |
| `temperature` | ``$OBJECT`` | No |  |
| `timestamp` | ``$INTEGER`` | No |  |
| `weather` | ``$OBJECT`` | No |  |
| `wind_direction` | ``$NUMBER`` | No |  |
| `wind_speed` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:historical():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HistoricalEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WeatherForecastEntity

```lua
local weather_forecast = client:weather_forecast(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cloud` | ``$INTEGER`` | No |  |
| `date` | ``$STRING`` | No |  |
| `humidity` | ``$INTEGER`` | No |  |
| `precipitation` | ``$NUMBER`` | No |  |
| `pressure` | ``$NUMBER`` | No |  |
| `temperature` | ``$OBJECT`` | No |  |
| `timestamp` | ``$INTEGER`` | No |  |
| `weather` | ``$OBJECT`` | No |  |
| `wind_direction` | ``$NUMBER`` | No |  |
| `wind_speed` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:weather_forecast():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WeatherForecastEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

