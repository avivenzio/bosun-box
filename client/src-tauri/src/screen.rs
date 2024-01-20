use log::{error, info};
use rppal::pwm::{Channel, Pwm};

pub fn init() -> Pwm {
    // should be GPIO 18 - physical pin 12
    info!("Initializing screen");
    let pwm_result = Pwm::new(Channel::Pwm0);
    let pwm = match pwm_result {
        Ok(val) => val,
        Err(error) => {
            error!("Failed to initialize brightness control pin - {}", error);
        }
    };
    pwm.set_frequency(100.0, 1.0);
    pwm.enable();
    return pwm;
}

pub fn set_brightness(pwm: &Pwm, value: f64) {
    info!("setting screen brightness - {}", value);
    pwm.set_duty_cycle(value);
}

pub fn get_brightness(pwm: &Pwm) -> f64 {
    let res = pwm.duty_cycle().unwrap();
    info!("getting current screen brightness - {}", res);
    return res;
}
