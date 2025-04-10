from flask import Blueprint, request, jsonify
from app.services import green_score_service

green_score_bp = Blueprint('green_score', __name__)

@green_score_bp.route('/green_score', methods=['POST'])
def green_score():
    data = request.get_json()
    lng = data.get('lng')
    lat = data.get('lat')
    if lng is None or lat is None:
        return jsonify({'error': 'Invalid input'}), 400
    score = green_score_service.calculate_green_score(lng, lat)
    response = jsonify({'green_score': score})
    return response
