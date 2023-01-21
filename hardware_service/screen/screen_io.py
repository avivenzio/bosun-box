from gpiozero import PWMLED
from time import sleep

class MockPWMLED:
    def __init__(self, pin_num = None, value = 0):
        self.value = value
        self.pin_num = pin_num

class ScreenIO:
    def __init__(self, mock = False):
        if mock:
            self.brightness_pin = MockPWMLED(18)
        else:
            self.brightness_pin = PWMLED(18)

    def set_brightness(self, value: float):
        self.brightness_pin.value = value

    def get_brightness(self):
        return self.brightness_pin.value
