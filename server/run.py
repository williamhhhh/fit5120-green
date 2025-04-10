from app import create_app
from flask_cors import CORS
app = create_app()
CORS(app, resources={r"/*": {"origins": "https://fit5120-green.pages.dev"}}, supports_credentials=True)  # Enable CORS for all routes

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
