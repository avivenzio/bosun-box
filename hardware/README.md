# Hardware

This directory will house any code needed for rpi GPIO or arduino. As well as any server code to supplement signalk.

### Potential uses
- Map buttons to keyboard input for navigation
- Read input from outboard analog wiring harness
  - Outboard > Pi GPIO 
  - Outboard > arduino > Pi GPIO
- Server to expose data from outboard wiring harness
- Can we read the analog data from signalk and send as a part of the protocol


### GPIO
- going to use https://github.com/fivdi/pigpio 
  - needs a c library installed
  - has more features than some of the other node modules for GPIO, although may be more complicated

