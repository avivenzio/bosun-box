#!/bin/bash
# create/activate venv
python3 -m venv venv
. venv/bin/activate
# install deps
pip install -r requirements.txt
waitress-serve --host 127.0.0.1 hello:app
