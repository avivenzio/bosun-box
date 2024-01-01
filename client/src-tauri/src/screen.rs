use rppal::pwm::{Channel, Pwm};

// create pwm pin reference
// enable pin
// set initial duty cycle
// return a reference to pwm pin
pub fn init() -> Pwm {
    // should be pin 18
    let pwm = Pwm::new(Channel::Pwm0)?;
    pwm.enable();
    pwm.set_duty_cycle(1.0);
    return pwm;
}

pub fn set_brightness(pwm: Pwm, value: f64) {
    pwm.set_duty_cycle(value);
}

pub fn get_brightness(pwm: Pwm) -> f64 {
    return pwm.duty_cycle();
}
