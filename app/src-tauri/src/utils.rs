use serde::Serialize;
use std::clone::Clone;
use std::env;

pub fn is_mock_mode() -> bool {
    return env::var("MOCK_MODE").is_ok();
}

#[derive(Serialize, Clone)]
pub struct ErrorResponse {
    pub error_type: String,
    pub message: String,
}