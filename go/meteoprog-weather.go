package voxgigmeteoprogweathersdk

import (
	"github.com/voxgig-sdk/meteoprog-weather-sdk/go/core"
	"github.com/voxgig-sdk/meteoprog-weather-sdk/go/entity"
	"github.com/voxgig-sdk/meteoprog-weather-sdk/go/feature"
	_ "github.com/voxgig-sdk/meteoprog-weather-sdk/go/utility"
)

// Type aliases preserve external API.
type MeteoprogWeatherSDK = core.MeteoprogWeatherSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MeteoprogWeatherEntity = core.MeteoprogWeatherEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MeteoprogWeatherError = core.MeteoprogWeatherError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCurrentEntityFunc = func(client *core.MeteoprogWeatherSDK, entopts map[string]any) core.MeteoprogWeatherEntity {
		return entity.NewCurrentEntity(client, entopts)
	}
	core.NewHistoricalEntityFunc = func(client *core.MeteoprogWeatherSDK, entopts map[string]any) core.MeteoprogWeatherEntity {
		return entity.NewHistoricalEntity(client, entopts)
	}
	core.NewWeatherForecastEntityFunc = func(client *core.MeteoprogWeatherSDK, entopts map[string]any) core.MeteoprogWeatherEntity {
		return entity.NewWeatherForecastEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMeteoprogWeatherSDK = core.NewMeteoprogWeatherSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
