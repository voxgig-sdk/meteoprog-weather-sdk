# MeteoprogWeather SDK utility: make_context

from projectname_sdk.core.context import MeteoprogWeatherContext


def make_context_util(ctxmap, basectx):
    return MeteoprogWeatherContext(ctxmap, basectx)
