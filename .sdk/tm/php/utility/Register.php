<?php
declare(strict_types=1);

// MeteoprogWeather SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MeteoprogWeatherUtility::setRegistrar(function (MeteoprogWeatherUtility $u): void {
    $u->clean = [MeteoprogWeatherClean::class, 'call'];
    $u->done = [MeteoprogWeatherDone::class, 'call'];
    $u->make_error = [MeteoprogWeatherMakeError::class, 'call'];
    $u->feature_add = [MeteoprogWeatherFeatureAdd::class, 'call'];
    $u->feature_hook = [MeteoprogWeatherFeatureHook::class, 'call'];
    $u->feature_init = [MeteoprogWeatherFeatureInit::class, 'call'];
    $u->fetcher = [MeteoprogWeatherFetcher::class, 'call'];
    $u->make_fetch_def = [MeteoprogWeatherMakeFetchDef::class, 'call'];
    $u->make_context = [MeteoprogWeatherMakeContext::class, 'call'];
    $u->make_options = [MeteoprogWeatherMakeOptions::class, 'call'];
    $u->make_request = [MeteoprogWeatherMakeRequest::class, 'call'];
    $u->make_response = [MeteoprogWeatherMakeResponse::class, 'call'];
    $u->make_result = [MeteoprogWeatherMakeResult::class, 'call'];
    $u->make_point = [MeteoprogWeatherMakePoint::class, 'call'];
    $u->make_spec = [MeteoprogWeatherMakeSpec::class, 'call'];
    $u->make_url = [MeteoprogWeatherMakeUrl::class, 'call'];
    $u->param = [MeteoprogWeatherParam::class, 'call'];
    $u->prepare_auth = [MeteoprogWeatherPrepareAuth::class, 'call'];
    $u->prepare_body = [MeteoprogWeatherPrepareBody::class, 'call'];
    $u->prepare_headers = [MeteoprogWeatherPrepareHeaders::class, 'call'];
    $u->prepare_method = [MeteoprogWeatherPrepareMethod::class, 'call'];
    $u->prepare_params = [MeteoprogWeatherPrepareParams::class, 'call'];
    $u->prepare_path = [MeteoprogWeatherPreparePath::class, 'call'];
    $u->prepare_query = [MeteoprogWeatherPrepareQuery::class, 'call'];
    $u->result_basic = [MeteoprogWeatherResultBasic::class, 'call'];
    $u->result_body = [MeteoprogWeatherResultBody::class, 'call'];
    $u->result_headers = [MeteoprogWeatherResultHeaders::class, 'call'];
    $u->transform_request = [MeteoprogWeatherTransformRequest::class, 'call'];
    $u->transform_response = [MeteoprogWeatherTransformResponse::class, 'call'];
});
