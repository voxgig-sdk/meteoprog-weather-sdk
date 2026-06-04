# MeteoprogWeather SDK

Global weather data covering current conditions, forecasts, and historical records from Meteoprog

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Meteoprog Weather API

The Meteoprog Weather API provides meteorological data including current conditions, forecasts, and historical records. It is operated by [Meteoprog](https://billing.meteoprog.com/), a weather data provider whose service is positioned for integrating weather information into applications and websites.

What the API exposes:

- Current weather conditions
- Weather forecasts
- Historical weather data

Operational notes:

- Base URL: `https://api.meteoprog.com/v1`
- Billing and documentation are hosted at [billing.meteoprog.com](https://billing.meteoprog.com/documentation)
- CORS is reportedly disabled, so browser-only clients may need a proxy
- Authentication, rate limits, and licensing terms are not documented in the sources surveyed here; consult the Meteoprog documentation or billing portal for current details

## Try it

**TypeScript**
```bash
npm install meteoprog-weather
```

**Python**
```bash
pip install meteoprog-weather-sdk
```

**PHP**
```bash
composer require voxgig/meteoprog-weather-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/meteoprog-weather-sdk/go
```

**Ruby**
```bash
gem install meteoprog-weather-sdk
```

**Lua**
```bash
luarocks install meteoprog-weather-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MeteoprogWeatherSDK } from 'meteoprog-weather'

const client = new MeteoprogWeatherSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o meteoprog-weather-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "meteoprog-weather": {
      "command": "/abs/path/to/meteoprog-weather-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Current** | Current weather conditions for a requested location. | `/weather/current` |
| **Historical** | Historical weather records for past dates and locations. | `/weather/historical` |
| **WeatherForecast** | Weather forecast data for upcoming periods at a given location. | `/weather/forecast` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from meteoprogweather_sdk import MeteoprogWeatherSDK

client = MeteoprogWeatherSDK({})


# Load a specific current
current, err = client.Current(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'meteoprogweather_sdk.php';

$client = new MeteoprogWeatherSDK([]);


// Load a specific current
[$current, $err] = $client->Current(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/meteoprog-weather-sdk/go"

client := sdk.NewMeteoprogWeatherSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "MeteoprogWeather_sdk"

client = MeteoprogWeatherSDK.new({})


# Load a specific current
current, err = client.Current(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("meteoprog-weather_sdk")

local client = sdk.new({})


-- Load a specific current
local current, err = client:Current(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MeteoprogWeatherSDK.test()
const result = await client.Current().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MeteoprogWeatherSDK.test(None, None)
result, err = client.Current(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MeteoprogWeatherSDK::test(null, null);
[$result, $err] = $client->Current(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Current(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MeteoprogWeatherSDK.test(nil, nil)
result, err = client.Current(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Current(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Meteoprog Weather API

- Upstream: [https://billing.meteoprog.com/](https://billing.meteoprog.com/)
- API docs: [https://billing.meteoprog.com/documentation](https://billing.meteoprog.com/documentation)

---

Generated from the Meteoprog Weather API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
