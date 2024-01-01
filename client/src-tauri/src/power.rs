use std::process::{Command, Output};
use log::{info, trace, warn};

use crate::utils;

fn run_cmd() {
    
}

pub fn shutdown() -> Output {
    let is_mock_mode = utils::is_mock_mode();
    info!("Shutdown cmd - mock: {}", is_mock_mode);
    if is_mock_mode {
        return Command::new("sh")
        .arg("-c")
        .arg("echo shutdown cmd")
        .output()
        .expect("failed to execute process");
    }
    return Command::new("sh")
        .arg("-c")
        .arg("sudo shutdown -h now")
        .output()
        .expect("failed to execute process");
}