// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use rppal::pwm::Pwm;
use simple_logger::SimpleLogger;
use tauri::Window;

mod nmea;
mod power;
mod screen;
mod utils;

struct AppState {
    brightness_pin: Option<Pwm>,
}

fn init_state() -> AppState {
    return AppState {
        brightness_pin: screen::init(),
    };
}

#[tauri::command]
fn get_brightness(state: tauri::State<AppState>) -> String {
    match &state.brightness_pin {
        None => {
            // 100% brightness is the screen's default if pwm is not enabled
            return String::from("1");
        }
        Some(pin) => {
            return screen::get_brightness(pin).to_string();
        }
    }
}

#[tauri::command]
fn set_brightness(
    brightness: f64,
    state: tauri::State<AppState>,
) -> Result<(), utils::ErrorResponse> {
    match &state.brightness_pin {
        None => {
            log::error!("no brightness pin found");
            return Err(utils::ErrorResponse {
                error_type: String::from("SET_PIN_FAILED"),
                message: String::from("Failed to set brightness."),
            });
        }
        Some(pin) => {
            screen::set_brightness(pin, brightness);
            return Ok(());
        }
    }
}

#[tauri::command]
fn shutdown() {
    power::shutdown();
}

#[tauri::command]
fn init_nmea(window: Window) -> Result<(), utils::ErrorResponse> {
    // closure passed to raed function
    // will send tauri events when data is read & parsed
    let handle_data = move |data: nmea::NMEAUpdate| {
        let emit_result = window.emit("nmea_data", data);
        match emit_result {
            Ok(val) => val,
            Err(error) => {
                log::error!("Error emitting nmea_data message - {}", error);
            }
        };
    };

    // send error if port cannot be opened
    let port_result = nmea::open_port();
    let port = match port_result {
        Ok(port_value) => port_value,
        Err(e) => {
            log::error!(
                "error creating serial connection from serial connection - {}",
                e
            );
            return Err(utils::ErrorResponse {
                error_type: String::from("NMEA_STREAM_FAILED"),
                message: String::from("Failed to initialize the NMEA connection."),
            });
        }
    };

    // spawn thread to read nmea data and respond with events
    // TODO - is channel a better approach for this?
    std::thread::spawn(move || {
        let begin_reading_result = nmea::begin_reading(port, handle_data);
        let _ = match begin_reading_result {
            Ok(_) => {
                // this function has infinite loop so this will never return in Ok state
                log::info!("nmea stream init successful");
            }
            Err(error) => {
                log::error!("nmea stream failure - {}", error);
            }
        };
    });
    return Ok(());
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
