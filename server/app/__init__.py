from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    from .routes.green_score import green_score_bp, chat_bp, temp_min_bp, temp_max_bp, green_gas_bp
    app.register_blueprint(green_score_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(temp_min_bp)
    app.register_blueprint(temp_max_bp)
    app.register_blueprint(green_gas_bp)

    return app