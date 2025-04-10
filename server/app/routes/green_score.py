from flask import Blueprint, request, jsonify
from app.services import green_score_service
from openai import OpenAI

client = OpenAI(api_key="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")

green_score_bp = Blueprint('green_score', __name__)
chat = Blueprint('chat', __name__)

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

@chat.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400
        response = client.responses.create(
            model="gpt-4o-mini", 
            input=prompt
        )
        output_text = response.output_text
        return jsonify({"message": output_text})
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return jsonify({"error": "Failed to fetch response from OpenAI"}), 500