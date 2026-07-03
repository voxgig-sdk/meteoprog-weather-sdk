# Historical entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from meteoprogweather_sdk import MeteoprogWeatherSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestHistoricalEntity:

    def test_should_create_instance(self):
        testsdk = MeteoprogWeatherSDK.test(None, None)
        ent = testsdk.Historical(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _historical_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "historical." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set METEOPROGWEATHER_TEST_HISTORICAL_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        historical_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.historical")))
        historical_ref01_data = None
        if len(historical_ref01_data_raw) > 0:
            historical_ref01_data = helpers.to_map(historical_ref01_data_raw[0][1])

        # LIST
        historical_ref01_ent = client.Historical(None)
        historical_ref01_match = {}

        historical_ref01_list_result, err = historical_ref01_ent.list(historical_ref01_match, None)
        assert err is None
        assert isinstance(historical_ref01_list_result, list)



def _historical_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/historical/HistoricalTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MeteoprogWeatherSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["historical01", "historical02", "historical03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "METEOPROGWEATHER_TEST_HISTORICAL_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "METEOPROGWEATHER_TEST_HISTORICAL_ENTID": idmap,
        "METEOPROGWEATHER_TEST_LIVE": "FALSE",
        "METEOPROGWEATHER_TEST_EXPLAIN": "FALSE",
        "METEOPROGWEATHER_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("METEOPROGWEATHER_TEST_HISTORICAL_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("METEOPROGWEATHER_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("METEOPROGWEATHER_APIKEY"),
            },
            extra or {},
        ])
        client = MeteoprogWeatherSDK(helpers.to_map(merged_opts))

    _live = env.get("METEOPROGWEATHER_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("METEOPROGWEATHER_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
