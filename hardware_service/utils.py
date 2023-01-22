import os

def is_mock_mode():
    mock_mode_env = os.environ.get("MOCK_MODE")
    return True if mock_mode_env in ('true', '1') else False
