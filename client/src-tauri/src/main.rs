// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use simple_logger::SimpleLogger;
mod screen;
mod power;
mod utils;
mod nmea;
use std::str;

fn main() {
  SimpleLogger::new().env().init().unwrap();
  log::warn!("This is an example message.");
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// tester
// fn main() {
//   power::shutdown()
// }