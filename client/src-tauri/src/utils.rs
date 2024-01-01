use std::env;

pub fn is_mock_mode() -> bool {
    return env::var("MOCK_MODE").is_ok();
}
