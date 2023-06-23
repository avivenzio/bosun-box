# Scripts

Any scripts to start/stop/build all services will live here.

### Potential uses
- Config to automatically start on power up

### Assumptions
- globally installed npm packages:
  - signalk-server
  - serve
- python 3
- nvm
  - node 16

### Notes
- chromium kiosk mode
  - `chromium-browser --kiosk --app=localhost:8080`
