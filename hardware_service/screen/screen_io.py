import logging
from gpiozero import PWMLED
from time import sleep

BRIGHTNESS_PIN = PWMLED(18)

def set_brightness(value: float):
    logging.info(f"set screen brightness value - {value}")
    BRIGHTNESS_PIN.value = value

def get_brightness():
    logging.info(f"get screen brightness value - {BRIGHTNESS_PIN.value}")
    return BRIGHTNESS_PIN.value
