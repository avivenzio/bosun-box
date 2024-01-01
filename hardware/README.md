# Hardware

Running Tauri in dev mode is too much for rpi4 2GB. The purpose of this directory is to write the GPIO & serial code that can be developed, tested, and run on rpi.

Running the tauri app in dev mode on MacOS with the rppal crate results in dependencies that cannot be found. This is likely some kind of libc issue.


### Notes
Rust analyzer settings
```
{
    "rust-analyzer.linkedProjects": [
        "/home/alex/code/bosun-box/client/src-tauri/Cargo.toml",
        "/home/alex/code/bosun-box/hardware/Cargo.toml"
    ]
}
```

For PWM must add `dtoverlay=pwm` to `/boot/config.txt` to enable.
For UART must add `enable_uart=1` to `/boot/config.txt` to enable.