use std::time::Duration;
use serde::{Serialize};
use std::io::BufReader;
use std::io::BufRead;
use std::clone::Clone;
use nmea_parser::*;

pub fn begin_reading(handle_data: impl Fn(NMEAUpdate)) {
    let port = serialport::new("/dev/ttyS0", 4_800)
    .timeout(Duration::from_millis(1000))
    .open()
    .expect("Failed to open serial port");

    let mut reader = BufReader::new(port);
    let mut line_str = String::new();
    let mut parser = NmeaParser::new();
    let mut results_list = Vec::new();
    loop {
        reader.read_line(&mut line_str).unwrap();
        let parse_result = parser.parse_sentence(&line_str);
        let parsed_value = match parse_result {
            Ok(val) => val,
            Err(error) => {
                line_str.clear();
                results_list.clear();
                continue;
            },
        };
        match parsed_value {
            // RMC—Recommended Minimum Specific GNSS Data
            ParsedMessage::Rmc(rmc) => {
                println!("Source:  {}",        rmc.source);
                println!("Speed:   {:.1} kts", rmc.sog_knots.unwrap());
                println!("Bearing: {}°",       rmc.bearing.unwrap());
                println!("Time:    {}",        rmc.timestamp.unwrap());
                println!("Latitude:  {:.3}°", rmc.latitude.unwrap());
                println!("Longitude: {:.3}°", rmc.longitude.unwrap());
                println!("");
                results_list.push(NmeaData {
                    key: String::from("latitude"),
                    value: rmc.latitude.unwrap()
                });
                results_list.push(NmeaData {
                    key: String::from("longitude"),
                    value: rmc.longitude.unwrap()
                });
                results_list.push(NmeaData {
                    key: String::from("sog_knots"),
                    value: rmc.sog_knots.unwrap()
                });
                results_list.push(NmeaData {
                    key: String::from("bearing"),
                    value: rmc.bearing.unwrap()
                });                
            },
            // VTG—Course Over Ground and Ground Speed
            ParsedMessage::Vtg(vtg) => {
                println!("Source:  {}",        vtg.source);
                println!("cog true: {}", vtg.cog_true.unwrap());
                println!("cog magnetic: {}", vtg.cog_magnetic.unwrap());
                println!("sog_knots:  {}",        vtg.sog_knots.unwrap());
                println!("");
                results_list.push(NmeaData {
                    key: String::from("cog_true"),
                    value: vtg.cog_true.unwrap()
                });
                results_list.push(NmeaData {
                    key: String::from("cog_magnetic"),
                    value: vtg.cog_magnetic.unwrap()
                });
                results_list.push(NmeaData {
                    key: String::from("sog_knots"),
                    value: vtg.sog_knots.unwrap()
                });
            },
            // DPT - Depth of Water
            ParsedMessage::Dpt(dpt) => {
                println!("depth: {}", dpt.depth_relative_to_transducer.unwrap());
                println!("");
                results_list.push(NmeaData {
                    key: String::from("depth_relative_transducer"),
                    value: dpt.depth_relative_to_transducer.unwrap()
                });
            },
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
