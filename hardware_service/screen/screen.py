from flask import Blueprint

screen_bp = Blueprint('screen', __name__)

@screen.route("/screen")
def hello():
    return {
        "status": "SCREEN"
    }