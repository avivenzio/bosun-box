use rppal::pwm::{Channel, Pwm};

// create pwm pin reference
// enable pin
// set initial duty cycle
// return a reference to pwm pin
pub fn init() -> Pwm {
    // should be GPIO 18 - physical pin 12
    info!("Initializing screen");
    let pwm = Pwm::new(Channel::Pwm0).unwrap();
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
