// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use simple_logger::SimpleLogger;
mod screen;
mod power;
mod utils;
//mod nmea;
use std::str;

fn main() {
  SimpleLogger::new().env().init().unwrap();
  let mm = utils::is_mock_mode();
  log::warn!("This is an example message. {}", mm);
  
  let op = power::shutdown();
  println!("-------");
  println!("{}",op.status);
  println!("{}", str::from_utf8(&op.stdout).unwrap());
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// tester
// fn main() {
//   power::shutdown()
// }