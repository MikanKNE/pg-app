from config import Config
from flask import Flask
from flask.wrappers import Response as ResponseBase
from flask_cors import CORS

# Flaskアプリケーション初期化
app = Flask(__name__, static_folder="static", static_url_path="")
CORS(
    app,
    resources={r"/api/*": {"origins": ["http://localhost:8080", "http://localhost:3000"]}},
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers="*",
    supports_credentials=True
)

# デフォルトページ
@app.route("/")
def serve_index() -> ResponseBase:
    return app.send_static_file("index.html")
    
# アプリケーションの実行
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.SERVER_PORT, debug=True)