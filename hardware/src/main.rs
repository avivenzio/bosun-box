use std::error::Error;
use std::thread;
use std::time::Duration;

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


use rppal::gpio::Gpio;
use rppal::system::DeviceInfo;
use rppal::pwm::{Channel, Pwm};
use rppal::uart::{Uart, Parity};

// Gpio uses BCM pin numbering. BCM GPIO 23 is tied to physical pin 16.
const GPIO_LED: u8 = 18;

fn main() {
    Uart::with_path("/dev/ttyS0", 4800, Parity::None, 8, 1).expect("COULD SET UART");
    // println!("Blinking an LED on a {}.", DeviceInfo::new()?.model());

    // // let mut pin = Gpio::new()?.get(GPIO_LED)?.into_output();
    // let pwm = Pwm::new(Channel::Pwm0)?;
    // pwm.set_frequency(100.0, 1.0);
    // println!("freq - {}", pwm.frequency()?);
    // pwm.disable();
    // // println!("period - {}", pwm.period()?);
    // println!("enabled - {}", pwm.is_enabled()?);
    // println!("freq - {}", pwm.frequency()?);

    // let mut per = 1.0;
    // // Blink the LED by setting the pin's logic level high for 500 ms.
    // loop {
    //     pwm.set_duty_cycle(per);
    //     println!("DS - {}", pwm.duty_cycle().unwrap());
    //     if per <= 0.0 {
    //         per = 1.0;
    //     } else {
    //         per = per - 0.05;
    //     }
    //     println!("next DS - {}", per);
    //     println!();
    //     thread::sleep(Duration::from_millis(200));

    // }

    // Ok(())
}