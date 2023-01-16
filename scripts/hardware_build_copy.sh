#!/bin/bash

echo "Build & Copy Hardware"
cd ../hardware
echo "Running npm install..."
npm install
echo "Building..."
npm run build
npm run postbuild
cd ..
echo "Copying to /home/pi/boat-stuff-client"
scp -r ./hardware/dist pi@192.168.50.216:/home/pi/boat-stuff-dist/hardware
echo "Copy Complete"
