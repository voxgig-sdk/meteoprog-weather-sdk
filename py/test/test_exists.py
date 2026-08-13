# MeteoprogWeather SDK exists test

import pytest
from meteoprogweather_sdk import MeteoprogWeatherSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MeteoprogWeatherSDK.test(None, None)
        assert testsdk is not None
