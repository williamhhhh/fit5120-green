from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, 
         resources={
             r"/*": {"origins": "https://fit5120-green.pages.dev"}
         }, 
         supports_credentials=True)
    from .routes.green_score import green_score_bp, chat_bp
    app.register_blueprint(green_score_bp)
    app.register_blueprint(chat_bp)

    return app