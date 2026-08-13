# MeteoprogWeather SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MeteoprogWeatherUtility.registrar = ->(u) {
  u.clean = MeteoprogWeatherUtilities::Clean
  u.done = MeteoprogWeatherUtilities::Done
  u.make_error = MeteoprogWeatherUtilities::MakeError
  u.feature_add = MeteoprogWeatherUtilities::FeatureAdd
  u.feature_hook = MeteoprogWeatherUtilities::FeatureHook
  u.feature_init = MeteoprogWeatherUtilities::FeatureInit
  u.fetcher = MeteoprogWeatherUtilities::Fetcher
  u.make_fetch_def = MeteoprogWeatherUtilities::MakeFetchDef
  u.make_context = MeteoprogWeatherUtilities::MakeContext
  u.make_options = MeteoprogWeatherUtilities::MakeOptions
  u.make_request = MeteoprogWeatherUtilities::MakeRequest
  u.make_response = MeteoprogWeatherUtilities::MakeResponse
  u.make_result = MeteoprogWeatherUtilities::MakeResult
  u.make_point = MeteoprogWeatherUtilities::MakePoint
  u.make_spec = MeteoprogWeatherUtilities::MakeSpec
  u.make_url = MeteoprogWeatherUtilities::MakeUrl
  u.param = MeteoprogWeatherUtilities::Param
  u.prepare_auth = MeteoprogWeatherUtilities::PrepareAuth
  u.prepare_body = MeteoprogWeatherUtilities::PrepareBody
  u.prepare_headers = MeteoprogWeatherUtilities::PrepareHeaders
  u.prepare_method = MeteoprogWeatherUtilities::PrepareMethod
  u.prepare_params = MeteoprogWeatherUtilities::PrepareParams
  u.prepare_path = MeteoprogWeatherUtilities::PreparePath
  u.prepare_query = MeteoprogWeatherUtilities::PrepareQuery
  u.graphql_body = MeteoprogWeatherUtilities::GraphqlBody
  u.graphql_errors = MeteoprogWeatherUtilities::GraphqlErrors
  u.result_basic = MeteoprogWeatherUtilities::ResultBasic
  u.result_body = MeteoprogWeatherUtilities::ResultBody
  u.result_headers = MeteoprogWeatherUtilities::ResultHeaders
  u.transform_request = MeteoprogWeatherUtilities::TransformRequest
  u.transform_response = MeteoprogWeatherUtilities::TransformResponse
}
