use std::io::{self, Write};
use std::time::Duration;
use serialport::{DataBits, StopBits, Parity};

pub fn serial() {
    let port = serialport::new("/dev/ttyS0", 4_800)
        .timeout(Duration::from_millis(10))
        .open();
    match port {
        Ok(mut port) => {
            let mut serial_buf: Vec<u8> = vec![0; 1000];
            loop {
                match port.read(serial_buf.as_mut_slice()) {
                    Ok(t) => io::stdout().write_all(&serial_buf[..t]).unwrap(),
                    Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
                    Err(e) => eprintln!("{:?}", e),
                }
                serial_buf = vec![0; 1000];
            }
        }
        Err(e) => {
            eprintln!("Failed to open \"{}\". Error: {}", "bah", e);
            ::std::process::exit(1);
        }
    }
}