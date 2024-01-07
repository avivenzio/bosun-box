// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use simple_logger::SimpleLogger;
use rppal::pwm::{Pwm};
mod screen;
mod power;
mod utils;
mod nmea;
use std::str;

struct AppState {
  brightness_pin: Pwm,
}

fn init_state() -> AppState {
  return AppState {
    brightness_pin: screen::init()
  };
}

#[tauri::command]
fn get_brightness(state: tauri::State<AppState>) -> String {
  return screen::get_brightness(&state.brightness_pin).to_string();
}

#[tauri::command]
fn set_brightness(brightness: f64, state: tauri::State<AppState>) {
  screen::set_brightness(&state.brightness_pin, brightness);
}

#[tauri::command]
fn shutdown() {
  power::shutdown();
}

fn main() {
  SimpleLogger::new().env().init().unwrap();
  log::info!("Firing up the box");
  log::info!("MOCK_MODE={}", utils::is_mock_mode());
  tauri::Builder::default()
    .manage(init_state())
    .invoke_handler(tauri::generate_handler![get_brightness, set_brightness, shutdown])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
