from flask import Flask
from screen import screen 

app = Flask(__name__)

app.register_blueprint(screen.screen_bp)

@app.route("/")
def health():
    return {
        "status": "OK"
    }