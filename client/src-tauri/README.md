### Manual steps
- needed to install due to build error 
```
 The system library `glib-2.0` required by crate `glib-sys` was not found.
```
`sudo apt-get install libgtk-3-dev`

- cross
`cross run --target=armv7-unknown-linux-gnueabihf`
