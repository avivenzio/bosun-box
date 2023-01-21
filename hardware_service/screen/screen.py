from flask import Blueprint, request
from screen.screen_io import ScreenIO

SCREEN_IO = ScreenIO(True);

screen_bp = Blueprint('screen', __name__)

@screen_bp.route("/screen", methods=['GET', 'PATCH'])
def screen_resource():
    headers = {"Content-Type": "application/json"}
    if request.method == 'PATCH':
        req_body = request.json
        if req_body.get('brightness', None) is not None:
            SCREEN_IO.set_brightness(req_body["brightness"])
    return {
        "brightness": SCREEN_IO.get_brightness()
    }
