"""
Lauta Landing Page - Flask Application
A beautiful, conversion-optimized landing page for legal document automation.
"""

import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'lauta-landing-dev-key')


@app.route('/')
def index():
    """Serve the main landing page."""
    return render_template('index.html')


@app.route('/images/<path:filename>')
def serve_images(filename):
    """Serve static images."""
    return send_from_directory('static/images', filename)


@app.route('/health')
def health():
    """Health check endpoint for deployment."""
    return {'status': 'healthy'}, 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

