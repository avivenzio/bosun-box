import logging
import sys
from flask import Flask
from screen import screen 
from power import power
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# log config
handler = logging.StreamHandler(sys.stdout)
app.logger.addHandler(handler)
app.logger.setLevel(logging.DEBUG)

# CORS
cors = CORS(app)

app.register_blueprint(screen.screen_bp)
app.register_blueprint(power.power_bp)

@app.route("/")
def health():
    return {
        "status": "OK"
    }