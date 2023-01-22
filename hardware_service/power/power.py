from flask import Blueprint
from power.power_service import PowerService
from utils import is_mock_mode

POWER_SERVICE = PowerService(is_mock_mode());

power_bp = Blueprint('power', __name__)

@power_bp.route("/power/shutdown", methods=['POST'])
def shutdown():
    headers = {"Content-Type": "application/json"}
    POWER_SERVICE.shutdown()
    return '', 204
