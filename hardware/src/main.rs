use std::io::{self, Write};
use std::time::Duration;
use serialport::{DataBits, StopBits, Parity};

fn main() {
    let port = serialport::new("/dev/ttyS0", 4_800)
        .timeout(Duration::from_millis(10))
        .open();
    let mut beef = 0;
    match port {
        Ok(mut port) => {
            let mut serial_buf: Vec<u8> = vec![0; 1000];
            println!("Receiving data");
            while beef < 15000 {
                beef+=1;
                match port.read(serial_buf.as_mut_slice()) {
                    Ok(t) => io::stdout().write_all(&serial_buf[..t]).unwrap(),
                    Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
                    Err(e) => eprintln!("{:?}", e),
                }
                //println!("resetting the BUF");
                serial_buf = vec![0; 1000];
            }
        }
        Err(e) => {
            eprintln!("Failed to open \"{}\". Error: {}", "bah", e);
            ::std::process::exit(1);
        }
    }
}


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