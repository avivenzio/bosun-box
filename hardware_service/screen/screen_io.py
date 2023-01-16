from gpiozero import PWMLED
from time import sleep

BRIGHTNESS_PIN = PWMLED(18)

def set_brightness(value: float):
    BRIGHTNESS_PIN.value = value

def get_brightness():
    return BRIGHTNESS_PIN.value
