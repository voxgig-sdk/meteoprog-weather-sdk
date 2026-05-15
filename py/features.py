# MeteoprogWeather SDK feature factory

from feature.base_feature import MeteoprogWeatherBaseFeature
from feature.test_feature import MeteoprogWeatherTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MeteoprogWeatherBaseFeature(),
        "test": lambda: MeteoprogWeatherTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
