## Hardware Service
This directory will house any code needed for rpi GPIO or arduino. As well as any server code to supplement signalk.

#### Scripts

Dev script
```
# create/activate venv
python3 -m venv venv
. venv/bin/activate
# install deps
pip install -r requirements.txt
# run on port and enable network connections
python -m flask run --port 5001 --host=0.0.0.0
```

Mock mode - no shell commands/GPIO etc.
```
MOCK_MODE=true python -m flask run --port 5001 --host=0.0.0.0
```