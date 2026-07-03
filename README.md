# MeteoprogWeather SDK

Meteoprog Weather API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { MeteoprogWeatherSDK } from 'meteoprog-weather'

const client = new MeteoprogWeatherSDK({
  apikey: process.env.METEOPROG-WEATHER_APIKEY,
})

// Load current data
const current = await client.Current().load({})
console.log(current.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Current** |  | `/weather/current` |
| **Historical** |  | `/weather/historical` |
| **WeatherForecast** |  | `/weather/forecast` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from meteoprogweather_sdk import MeteoprogWeatherSDK

client = MeteoprogWeatherSDK({
    "apikey": os.environ.get("METEOPROG-WEATHER_APIKEY"),
})


# Load a specific current
current, err = client.Current().load({"id": "example_id"})
print(current)
```

### PHP

```php
<?php
require_once 'meteoprogweather_sdk.php';

$client = new MeteoprogWeatherSDK([
    "apikey" => getenv("METEOPROG-WEATHER_APIKEY"),
]);


// Load a specific current
[$current, $err] = $client->Current()->load(["id" => "example_id"]);
print_r($current);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/meteoprog-weather-sdk/go"

client := sdk.NewMeteoprogWeatherSDK(map[string]any{
    "apikey": os.Getenv("METEOPROG-WEATHER_APIKEY"),
})

// Load current data
current, err := client.Current(nil).Load(map[string]any{}, nil)
fmt.Println(current)
```

### Ruby

```ruby
require_relative "MeteoprogWeather_sdk"

client = MeteoprogWeatherSDK.new({
  "apikey" => ENV["METEOPROG-WEATHER_APIKEY"],
})


# Load a specific current
current, err = client.Current().load({ "id" => "example_id" })
puts current
```

### Lua

```lua
local sdk = require("meteoprog-weather_sdk")

local client = sdk.new({
  apikey = os.getenv("METEOPROG-WEATHER_APIKEY"),
})


-- Load a specific current
local current, err = client:Current():load({ id = "example_id" })
print(current)
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
client = MeteoprogWeatherSDK.test()
result, err = client.Current().load({"id": "test01"})
```

### PHP

```php
$client = MeteoprogWeatherSDK::test();
[$result, $err] = $client->Current()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Current(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MeteoprogWeatherSDK.test
result, err = client.Current().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Current():load({ id = "test01" })
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

---

Generated from the Meteoprog Weather API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
