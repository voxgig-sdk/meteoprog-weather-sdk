# MeteoprogWeather Python SDK Reference

Complete API reference for the MeteoprogWeather Python SDK.


## MeteoprogWeatherSDK

### Constructor

```python
from meteoprog-weather_sdk import MeteoprogWeatherSDK

client = MeteoprogWeatherSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MeteoprogWeatherSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = MeteoprogWeatherSDK.test()
```


### Instance Methods

#### `Current(data=None)`

Create a new `CurrentEntity` instance. Pass `None` for no initial data.

#### `Historical(data=None)`

Create a new `HistoricalEntity` instance. Pass `None` for no initial data.

#### `WeatherForecast(data=None)`

Create a new `WeatherForecastEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CurrentEntity

```python
current = client.Current()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | ``$OBJECT`` | No |  |
| `location` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Current().load({"id": "current_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HistoricalEntity

```python
historical = client.Historical()
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Historical().list({})
for historical in results:
    print(historical)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HistoricalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WeatherForecastEntity

```python
weather_forecast = client.WeatherForecast()
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.WeatherForecast().list({})
for weather_forecast in results:
    print(weather_forecast)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WeatherForecastEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = MeteoprogWeatherSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

