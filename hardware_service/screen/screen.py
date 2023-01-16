from flask import Blueprint, request
from screen.screen_io import set_brightness, get_brightness

screen_bp = Blueprint('screen', __name__)

@screen_bp.route("/screen", methods=['GET', 'PATCH'])
def screen_resource():
    headers = {"Content-Type": "application/json"}
    if request.method == 'PATCH':
        req_body = request.json
        if req_body.get('brightness', None) is not None:
            set_brightness(req_body["brightness"])
    return {
        "brightness": get_brightness()
    }
