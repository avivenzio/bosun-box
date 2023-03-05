#!/bin/bash
# create/activate venv
python3 -m venv venv
. venv/bin/activate
# install deps
pip install -r requirements.txt
# run on port and enable network connections
python -m flask run --port 5001 --host=0.0.0.0
