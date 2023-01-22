from flask import Blueprint, request, current_app
from screen.screen_io import ScreenIO
from utils import is_mock_mode

SCREEN_IO = ScreenIO(is_mock_mode());

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
