# MeteoprogWeather SDK feature factory

from meteoprogweather_sdk.feature.base_feature import MeteoprogWeatherBaseFeature
from meteoprogweather_sdk.feature.ratelimit_feature import MeteoprogWeatherRatelimitFeature
from meteoprogweather_sdk.feature.retry_feature import MeteoprogWeatherRetryFeature
from meteoprogweather_sdk.feature.test_feature import MeteoprogWeatherTestFeature
from meteoprogweather_sdk.feature.timeout_feature import MeteoprogWeatherTimeoutFeature


_FEATURES = {
    "base": lambda: MeteoprogWeatherBaseFeature(),
    "ratelimit": lambda: MeteoprogWeatherRatelimitFeature(),
    "retry": lambda: MeteoprogWeatherRetryFeature(),
    "test": lambda: MeteoprogWeatherTestFeature(),
    "timeout": lambda: MeteoprogWeatherTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
