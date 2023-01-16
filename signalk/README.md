# Signal K

Signal K server will be installed globally and run separately. This directory will mostly contain any notes/docs/configuration related to signalk.

## Usage
- NMEA-0183 data only
- npm global install and run per instructions below
- this is the configuration I have had the most success with, so going with it.

## Reference
- https://github.com/SignalK/signalk-server
- https://github.com/SignalK/signalk-server/blob/master/raspberry_pi_installation.md
- https://signalk.org/specification/1.7.0/doc/index.html


### Serial COMs
- baud rate 4800
- blue wire from garmin is the data stream

#### USB
- `/dev/ttyUSB0` 
- yellow wire from usb -> blue from garmin
- black to same ground as garmin

#### Serial Converter
- `/dev/ttyS0` 
- pi 5v -> chip vcc
- pi gnd -> chip gnd
- pi RX -> chip TDX
- `enable_uart=1` must be in `/boot/config.txt`
- chip RX -> garmin blue
- chip gnd -> same negative as garmin
