#!/bin/bash

echo "Build & Copy client"
cd ../client
echo "Running npm install..."
npm install
echo "Building..."
npm run build
cd ..
echo "Copying to /home/pi/boat-stuff-client"
scp -r ./client/dist pi@192.168.50.216:/home/pi/boat-stuff-dist/client
scp -r ./client/package.json pi@192.168.50.216:/home/pi/boat-stuff-dist/client
echo "Run npm start:prod"
