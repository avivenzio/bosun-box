# Tauri Backend
Rust code for NMEA data delivery & other hardware controls.

## Development
Running Tauri in dev mode is too much for Rpi4 2GB. Increasing swap & decreasing parallel cargo jobs will help here.

Running the tauri app in dev mode on MacOS with the rppal crate results in dependencies that cannot be found. This is likely some kind of libc issue.

Rust analyzer settings:
```
{
    "rust-analyzer.linkedProjects": [
        "/home/alex/code/bosun-box/client/src-tauri/Cargo.toml",
    ]
}
```
Rust analyzer is too resource intensice to run on 2GB RPi. It will lock up.

## Hardware connections & Raspberry Pi settings
### PWM
Brightness is controlled through PWM
  - For PWM must add `dtoverlay=pwm` to `/boot/config.txt` to enable
### Build dependencies
`libgtk-3-dev` may need to be install due to following build error 
```
 The system library `glib-2.0` required by crate `glib-sys` was not found.
```
`sudo apt-get install libgtk-3-dev`
### Serial
NMEA data is read through UART
- For UART must add `enable_uart=1` to `/boot/config.txt` to enable.
- Remove `console=serial0,115200` from `/boot/cmdline.txt`.
- baud rate 4800
- blue wire from garmin is the data stream

#### USB Converter
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

### Dev Settings
#### Wifi
Turning wifi power management off helped with dropped ssh connections while developing.

Add following modification:
```
sudo nano /etc/rc.local 
sudo iwconfig wlan0 power off
```
#### RPi RAM constraints
Increasing swap from default to 1GB allows tauri to be run in dev mode.
```
sudo dphys-swapfile swapoff
sudo nano /etc/dphys-swapfile
sudo dphys-swapfile setup
sudo dphys-swapfile swapon
```
