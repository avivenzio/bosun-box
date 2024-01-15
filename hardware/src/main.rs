use std::time::Duration;
use std::io::BufReader;
use std::io::BufRead;
use nmea_parser::*;

fn main() {
    let port = serialport::new("/dev/ttyS0", 4_800)
        .timeout(Duration::from_millis(1000))
        .open()
        .expect("Failed to open serial port");
    
        let mut reader = BufReader::new(port);
        let mut my_str = String::new();
        let mut parser = NmeaParser::new();
        loop {
            reader.read_line(&mut my_str).unwrap();
            let parse_result = parser.parse_sentence(&my_str);
            let parsed_value = match parse_result {
                Ok(val) => val,
                Err(error) => {
                    my_str.clear();
                    continue;
                },
            };

            match parsed_value {
                // GGA —Global Positioning System Fixed Data
                // might be easier to just use RMC
                // ParsedMessage::Gga(gga) => {
                //     println!("Source:    {}",     gga.source);
                //     println!("Latitude:  {:.3}°", gga.latitude.unwrap());
                //     println!("Longitude: {:.3}°", gga.longitude.unwrap());
                //     println!("");
                // },
                // RMC—Recommended Minimum Specific GNSS Data
                ParsedMessage::Rmc(rmc) => {
                    println!("Source:  {}",        rmc.source);
                    println!("Speed:   {:.1} kts", rmc.sog_knots.unwrap());
                    println!("Bearing: {}°",       rmc.bearing.unwrap());
                    println!("Time:    {}",        rmc.timestamp.unwrap());
                    println!("Latitude:  {:.3}°", rmc.latitude.unwrap());
                    println!("Longitude: {:.3}°", rmc.longitude.unwrap());
                    println!("");
                },
                // VTG—Course Over Ground and Ground Speed
                ParsedMessage::Vtg(vtg) => {
                    println!("Source:  {}",        vtg.source);
                    println!("cog true: {}", vtg.cog_true.unwrap());
                    println!("cog magnetic: {}", vtg.cog_magnetic.unwrap());
                    println!("sog_knots:  {}",        vtg.sog_knots.unwrap());
                    println!("");
                },
                // DPT - Depth of Water
                ParsedMessage::Dpt(dpt) => {
                    println!("depth: {}", dpt.depth_relative_to_transducer.unwrap());
                    println!("");
                },
                _ => {
                }
            }
            my_str.clear();
        }
}


// let mut serial_port = serialport::new("/dev/serial0", 9600)
//         .timeout(Duration::from_millis(1000))
//         .open()
//         .expect("Failed to open serial port");

//     let output = "This is a test.\n".as_bytes();
//     serial_port.write(output).expect("Write failed!");
//     serial_port.flush().unwrap();

//     let mut reader = BufReader::new(serial_port);
//     let mut my_str = String::new();
//     reader.read_line(&mut my_str).unwrap();

//     println!("{}", my_str);


//use std::error::Error;
// use std::thread;
// use std::time::Duration;
// use std::str;
// use std::time::Duration;

// mod screen;
// mod nmea;

// fn main() {
//     println!("Hello, world!");
//     let pin = screen::init();
//     thread::sleep(Duration::from_millis(1000));
//     let mut val = screen::get_brightness(&pin);
//     println!("{}",val);
// thread::sleep(Duration::from_millis(1000));
//     screen::set_brightness(&pin, 0.5);
//     val = screen::get_brightness(&pin);
//     println!("{}",val);
//     thread::sleep(Duration::from_millis(1000));
// }


// use rppal::gpio::Gpio;
// use rppal::system::DeviceInfo;
// use rppal::pwm::{Channel, Pwm};
//use rppal::uart::{Uart, Parity};

// Gpio uses BCM pin numbering. BCM GPIO 23 is tied to physical pin 16.
//const GPIO_LED: u8 = 18;

// fn main() {
//     let ports = serialport::available_ports().expect("No ports found!");
//     for p in ports {
//         println!("{}", p.port_name);
//     }

//     let mut port = serialport::new("/dev/ttyS0", 4_800)
//         .timeout(Duration::from_millis(10))
//         .open().expect("Failed to open port");

//     let mut serial_buf: Vec<u8> = vec![0; 32];
//     port.read(serial_buf.as_mut_slice()).expect("Found no data!");

// }

// fn main() {
//     let mut f = Uart::with_path("/dev/ttyS0", 4800, Parity::None, 8, 1).expect("COULD SET UART");
//     f.set_read_mode(255, Duration::from_secs(0));

//     println!()
    
//     let mut buff: &mut [u8] = &mut [];
//     let mut read_count = 0;
//     while read_count < 25 {
//         thread::sleep(Duration::from_millis(100));
//         println!("start_read");
//         println!("bytes_q {}", f.input_len().unwrap());
//         let bytes_read = f.read(buff).unwrap();
//         println!("bytcount {}", bytes_read);
//         let res = str::from_utf8(buff).unwrap();
//         println!("to_string");
//         println!("{}", res);
//         println!("reset_buff");
//         buff = &mut [];
//         read_count += 1;
//     }

//     // println!("Blinking an LED on a {}.", DeviceInfo::new()?.model());

//     // // let mut pin = Gpio::new()?.get(GPIO_LED)?.into_output();
//     // let pwm = Pwm::new(Channel::Pwm0)?;
//     // pwm.set_frequency(100.0, 1.0);
//     // println!("freq - {}", pwm.frequency()?);
//     // pwm.disable();
//     // // println!("period - {}", pwm.period()?);
//     // println!("enabled - {}", pwm.is_enabled()?);
//     // println!("freq - {}", pwm.frequency()?);

//     // let mut per = 1.0;
//     // // Blink the LED by setting the pin's logic level high for 500 ms.
//     // loop {
//     //     pwm.set_duty_cycle(per);
//     //     println!("DS - {}", pwm.duty_cycle().unwrap());
//     //     if per <= 0.0 {
//     //         per = 1.0;
//     //     } else {
//     //         per = per - 0.05;
//     //     }
//     //     println!("next DS - {}", per);
//     //     println!();
//     //     thread::sleep(Duration::from_millis(200));

//     // }

//     // Ok(())
// }