use rppal::uart::Uart;

pub fn init() -> Uart {
    let mut uart =
    Uart::with_path("/dev/ttyS0", 4800, Parity::None, 8, 1).expect("COULD SET UART");
    return uart;
}