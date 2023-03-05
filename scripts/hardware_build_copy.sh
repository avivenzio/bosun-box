#!/bin/bash
echo "Copy Hardware"
scp -r ./hardware_service pi@192.168.50.216:/home/pi/boat-stuff-dist/hardware_service
echo "Copy Complete"

