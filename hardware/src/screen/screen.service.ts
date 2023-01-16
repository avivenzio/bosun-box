import { Gpio } from 'pigpio';

const brightnessPin = new Gpio(18, {mode: Gpio.OUTPUT});
brightnessPin.pwmRange(1024);
brightnessPin.pwmWrite(0);

export function setScreenBrightness(percentage: number) {
    // 0 brightest
    // 1024 dimmest
   const dutyCycle = ((0 - 1024) * percentage) + 1024
   brightnessPin.pwmWrite(dutyCycle);
}
