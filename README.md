# Lauta Landing Page

A beautiful, conversion-optimized landing page for Lauta - AI-powered legal document automation.

## Tech Stack

- **Flask** - Python web framework
- **Gunicorn** - Production WSGI server
- **Vanilla CSS** - Custom design system
- **Vanilla JS** - Animations and interactions

## Local Development

### Prerequisites
- Python 3.11+

### Setup

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\Activate.ps1

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py
```

Visit `http://localhost:5001`

## Deployment

This app is configured for **Digital Ocean App Platform**.

### Deploy to Digital Ocean

1. Push this repo to GitHub
2. Go to [Digital Ocean App Platform](https://cloud.digitalocean.com/apps)
3. Click "Create App" → Connect GitHub → Select this repo
4. Digital Ocean will auto-detect the Python app
5. Set environment variable `SECRET_KEY` (generate a random string)
6. Deploy!

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SECRET_KEY` | Flask secret key for sessions | Yes |
| `PORT` | Server port (auto-set by DO) | No |

## Project Structure

```
landing/
├── app.py              # Flask application
├── requirements.txt    # Python dependencies
├── Procfile           # Process file for deployment
├── runtime.txt        # Python version
├── .do/
│   └── app.yaml       # Digital Ocean App Spec
├── static/
│   ├── css/
│   │   └── landing.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── *.png
└── templates/
    └── index.html
```

## Customization

### Adding Storylane Demos

Edit `static/js/main.js` and update the `demoConfig` object with your Storylane URLs:

```javascript
const demoConfig = {
    'affirmation-opposition': {
        name: 'Affirmation In Opposition',
        url: 'https://app.storylane.io/share/YOUR_ID',
        embedUrl: 'https://app.storylane.io/demo/YOUR_EMBED_ID',
        duration: '~2 min demo'
    },
    // ... other demos
};
```

## License

Proprietary - Lauta © 2026

