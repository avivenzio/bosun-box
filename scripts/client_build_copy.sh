#!/bin/bash

echo "Build & Copy client"
cd ../client
echo "Running npm install..."
npm install
echo "Building..."
npm run build
cd ..
echo "Copying to /home/pi/bosun-box-client"
scp -r ./client/dist pi:/home/pi/bosun-box-dist/client
scp -r ./client/package.json pi:/home/pi/bosun-box-dist/client
echo "Run npm start:prod"
