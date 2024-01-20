use log::{error, info};
use nmea_parser::*;
use serde::Serialize;
use std::clone::Clone;
use std::io::BufRead;
use std::io::BufReader;
use std::time::Duration;
use std::error;

fn open_port() -> Result<Box<dyn SerialPort>> {
    return serialport::new("/dev/ttyS0", 4_800)
        .timeout(Duration::from_millis(1000))
        .open();
}

pub fn begin_reading(handle_data: impl Fn(NMEAUpdate)) -> Result<(), error::Error> {
    let port_result = open_port();
    let port = match port_result {
        Ok(port_value) => port_value,
        Err(error) => {
            error!("error creating serial connection from serial connection - {}", error);
            return Err(e);
        }
    };

    let mut reader = BufReader::new(port);
    let mut line_str = String::new();
    let mut parser = NmeaParser::new();
    let mut results_list = Vec::new();
    loop {
        let read_line_result = reader.read_line(&mut line_str);
        let read_line_size = match read_line_result {
            Ok(val) => val,
            Err(error) => {
                error!("error reading line from serial connection - {}", error);
                // if we can't read a line, keep going and assume we will be able to read the next one
                line_str.clear();
                results_list.clear();
                continue;
            }
        };

        let parse_result = parser.parse_sentence(&line_str);
        let parsed_value = match parse_result {
            Ok(val) => val,
            Err(error) => {
                error!("error parsing line as NMEA connection - {}", error);
                line_str.clear();
                results_list.clear();
                continue;
            }
        };
        match parsed_value {
            // RMC—Recommended Minimum Specific GNSS Data
            ParsedMessage::Rmc(rmc) => {
                results_list.push(NmeaData {
                    key: String::from("latitude"),
                    value: rmc.latitude.unwrap(),
                });
                results_list.push(NmeaData {
                    key: String::from("longitude"),
                    value: rmc.longitude.unwrap(),
                });
                results_list.push(NmeaData {
                    key: String::from("sog_knots"),
                    value: rmc.sog_knots.unwrap(),
                });
                results_list.push(NmeaData {
                    key: String::from("bearing"),
                    value: rmc.bearing.unwrap(),
                });
            }
            // VTG—Course Over Ground and Ground Speed
            ParsedMessage::Vtg(vtg) => {
                results_list.push(NmeaData {
                    key: String::from("cog_true"),
                    value: vtg.cog_true.unwrap(),
                });
                results_list.push(NmeaData {
                    key: String::from("cog_magnetic"),
                    value: vtg.cog_magnetic.unwrap(),
                });
                results_list.push(NmeaData {
                    key: String::from("sog_knots"),
                    value: vtg.sog_knots.unwrap(),
                });
            }
            // DPT - Depth of Water
            ParsedMessage::Dpt(dpt) => {
                results_list.push(NmeaData {
                    key: String::from("depth_relative_transducer"),
                    value: dpt.depth_relative_to_transducer.unwrap(),
                });
            }
            _ => {
                // skip data we don't care about
                line_str.clear();
                results_list.clear();
                continue;
            }
        }
        let update = NMEAUpdate {
            data: results_list.clone(),
        };
        handle_data(update);
        line_str.clear();
        results_list.clear();
    }
    Ok(());
}

#[derive(Serialize, Clone)]
pub struct NMEAUpdate {
    data: Vec<NmeaData>,
}

#[derive(Serialize, Clone)]
struct NmeaData {
    key: String,
    value: f64,
}
