// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use rppal::pwm::Pwm;
use simple_logger::SimpleLogger;
use std::str;
use tauri::Window;

mod nmea;
mod power;
mod screen;
mod utils;

struct AppState {
    brightness_pin: Pwm,
}

fn init_state() -> AppState {
    return AppState {
        brightness_pin: screen::init(),
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

#[tauri::command]
fn init_nmea(window: Window) {
    let handle_data = move |data: nmea::NMEAUpdate| {
        let emit_result = window.emit("nmea_data", data);
        let pwm = match pwm_result {
            Ok(val) => val,
            Err(error) => {
                log::error!("Error emitting nmea_data message - {}", error);
            }
        };
    };
    // handle data will take the parsed result & make the tauri event
    std::thread::spawn(move || {
        let begin_reading_result = nmea::begin_reading(handle_data);
        let _ = match begin_reading_result {
            Ok(val) => {
                // this function never returns so I doubt we will ever hit this case....
                log::info!("nmea stream init successful");
                return val;
            },
            Err(error) => {
                log::error!("nmea stream failure - {}", error);
                window.emit("nema_init_failure", "{}").unwrap();
            }
        };
    });
}

fn main() {
    SimpleLogger::new().env().init().unwrap();
    log::info!("Firing up the box");
    log::info!("MOCK_MODE={}", utils::is_mock_mode());
    tauri::Builder::default()
        .manage(init_state())
        .invoke_handler(tauri::generate_handler![
            get_brightness,
            set_brightness,
            shutdown,
            init_nmea
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
