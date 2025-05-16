import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Blueprint, request, jsonify
from app.services import green_score_service
from openai import OpenAI
from app import db
import os

# api_key = os.getenv("OPENAI_API_KEY")
# if not api_key:
#     raise RuntimeError("OPENAI_API_KEY environment variable is not set.")
# client = OpenAI(api_key)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

green_score_bp = Blueprint('green_score', __name__)
chat_bp = Blueprint('chat', __name__)
temp_min_bp = Blueprint('temp_min', __name__)
temp_max_bp = Blueprint('temp_max', __name__)
green_gas_bp = Blueprint('green_gas', __name__)

@green_score_bp.route('/green_score', methods=['POST','GET'])
def green_score():
    data = request.get_json()
    lng = data.get('lng')
    lat = data.get('lat')
    if lng is None or lat is None:
        return jsonify({'error': 'Invalid input'}), 400
    score = green_score_service.calculate_green_score(lng, lat)
    response = jsonify({'green_score': score})
    return response

@chat_bp.route("/chat", methods=["POST", "GET"])
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
    
@temp_min_bp.route('/temp_min', methods=['POST', "GET"])
def temp_min():
    try:
        conn = db.get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT year, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, annual FROM "green-city".temperatureMinMeanMelb WHERE year NOT IN (1943, 2025) ORDER BY year;')

        # Convert rows to dicts
        colnames = [desc[0] for desc in cur.description]
        rows = cur.fetchall()
        data = [dict(zip(colnames, row)) for row in rows]

        cur.close()
        conn.close()

        return jsonify(data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@temp_max_bp.route('/temp_max', methods=['POST', "GET"])
def temp_min():
    try:
        conn = db.get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT year, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, annual FROM "green-city".temperatureMaxMeanMelb WHERE year NOT IN (1943, 2025) ORDER BY year;')

        # Convert rows to dicts
        colnames = [desc[0] for desc in cur.description]
        rows = cur.fetchall()
        data = [dict(zip(colnames, row)) for row in rows]

        cur.close()
        conn.close()

        return jsonify(data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@green_gas_bp.route('/green_gas', methods=['POST', "GET"])
def green_gas():
    try:
        conn = db.get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        query = """
            SELECT year, ACT_Mt, ET_Mt, NSW_Mt, NT_Mt, QLD_Mt, SA_Mt, TAS_Mt, VIC_Mt, WA_Mt 
            FROM "green-city".greenGasState 
            ORDER BY year;
        """
        cur.execute(query)
        results = cur.fetchall()
        cur.close()
        conn.close()

        # Structure the data to be more suitable for plotting
        response_data = {
            "years": [row["year"] for row in results],
            "ACT": [row["act_mt"] for row in results],
            "ET": [row["et_mt"] for row in results],
            "NSW": [row["nsw_mt"] for row in results],
            "NT": [row["nt_mt"] for row in results],
            "QLD": [row["qld_mt"] for row in results],
            "SA": [row["sa_mt"] for row in results],
            "TAS": [row["tas_mt"] for row in results],
            "VIC": [row["vic_mt"] for row in results],
            "WA": [row["wa_mt"] for row in results]
        }

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500