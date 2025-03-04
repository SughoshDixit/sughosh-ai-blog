
# Python Backend Deployment Guide

This document provides instructions for deploying the Python Flask backend for Sughosh Dixit's personal website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Production Deployment Options](#production-deployment-options)
   - [Option 1: Deploying on a VPS (DigitalOcean, AWS EC2, etc.)](#option-1-deploying-on-a-vps)
   - [Option 2: Deploying on Heroku](#option-2-deploying-on-heroku)
   - [Option 3: Deploying on Google Cloud Run](#option-3-deploying-on-google-cloud-run)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [CORS Configuration](#cors-configuration)
7. [Scaling Considerations](#scaling-considerations)
8. [Monitoring](#monitoring)

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- A virtual environment tool (venv, virtualenv, or conda)
- Git

## Local Development

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**

   Create a `.env` file in the backend directory with the following variables:

   ```
   DATABASE_URL=sqlite:///sughosh_portfolio.db
   FLASK_ENV=development
   ```

5. **Run the development server:**

   ```bash
   python app.py
   ```

   The server will start at `http://localhost:5000`

## Production Deployment Options

### Option 1: Deploying on a VPS

1. **Set up your VPS:**
   - Create a VPS instance (DigitalOcean Droplet, AWS EC2, etc.)
   - Install Python, pip, and other dependencies
   - Set up a firewall to only allow necessary traffic

2. **Deploy the application:**

   ```bash
   # On your VPS
   git clone <repository-url>
   cd <repository-directory>/backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Set up Gunicorn and Nginx:**

   Install Gunicorn:
   ```bash
   pip install gunicorn
   ```

   Create a systemd service file `/etc/systemd/system/sughosh-backend.service`:
   ```
   [Unit]
   Description=Gunicorn instance to serve Sughosh's backend
   After=network.target

   [Service]
   User=<your-user>
   Group=www-data
   WorkingDirectory=/path/to/backend
   Environment="PATH=/path/to/backend/venv/bin"
   EnvironmentFile=/path/to/backend/.env
   ExecStart=/path/to/backend/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:5000 app:app

   [Install]
   WantedBy=multi-user.target
   ```

   Enable and start the service:
   ```bash
   sudo systemctl enable sughosh-backend
   sudo systemctl start sughosh-backend
   ```

   Install and configure Nginx as a reverse proxy:
   ```bash
   sudo apt install nginx
   ```

   Create Nginx config at `/etc/nginx/sites-available/sughosh-backend`:
   ```
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/sughosh-backend /etc/nginx/sites-enabled
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. **Set up SSL with Certbot:**

   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.yourdomain.com
   ```

### Option 2: Deploying on Heroku

1. **Install the Heroku CLI:**
   
   Follow instructions at https://devcenter.heroku.com/articles/heroku-cli

2. **Create a Procfile:**
   
   Create a file named `Procfile` (no extension) in the backend directory:
   ```
   web: gunicorn app:app
   ```

3. **Add a runtime.txt file:**
   
   Create a file named `runtime.txt` specifying the Python version:
   ```
   python-3.9.16
   ```

4. **Create a Heroku app and deploy:**

   ```bash
   heroku login
   heroku create sughosh-portfolio-api
   git init
   git add .
   git commit -m "Initial commit for Heroku"
   heroku git:remote -a sughosh-portfolio-api
   git push heroku main
   ```

5. **Configure environment variables:**

   ```bash
   heroku config:set DATABASE_URL=<your-database-url>
   ```

6. **Add a database add-on:**

   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

### Option 3: Deploying on Google Cloud Run

1. **Install Google Cloud SDK and initialize:**

   Follow the instructions at https://cloud.google.com/sdk/docs/install

2. **Create a Dockerfile:**

   Create a `Dockerfile` in the backend directory:
   ```Dockerfile
   FROM python:3.9-slim

   WORKDIR /app

   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   ENV PORT=8080

   CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app
   ```

3. **Build and deploy to Cloud Run:**

   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/sughosh-portfolio-api
   
   gcloud run deploy sughosh-portfolio-api \
     --image gcr.io/YOUR_PROJECT_ID/sughosh-portfolio-api \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars="DATABASE_URL=YOUR_DATABASE_URL"
   ```

## Database Setup

1. **SQLite (Development):**
   
   The default configuration uses SQLite. No additional setup is required.

2. **PostgreSQL (Production):**

   Install PostgreSQL and create a database:
   ```bash
   sudo apt install postgresql postgresql-contrib
   sudo -u postgres psql
   
   CREATE DATABASE sughosh_portfolio;
   CREATE USER sughosh_admin WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE sughosh_portfolio TO sughosh_admin;
   \q
   ```

   Update your `.env` file:
   ```
   DATABASE_URL=postgresql://sughosh_admin:secure_password@localhost/sughosh_portfolio
   ```

3. **MySQL (Alternative):**

   Install MySQL and create a database:
   ```bash
   sudo apt install mysql-server
   sudo mysql
   
   CREATE DATABASE sughosh_portfolio;
   CREATE USER 'sughosh_admin'@'localhost' IDENTIFIED BY 'secure_password';
   GRANT ALL PRIVILEGES ON sughosh_portfolio.* TO 'sughosh_admin'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

   Update your `.env` file:
   ```
   DATABASE_URL=mysql+pymysql://sughosh_admin:secure_password@localhost/sughosh_portfolio
   ```

## Environment Variables

Create a `.env` file with the following variables:

```
# Database configuration
DATABASE_URL=postgresql://username:password@localhost/sughosh_portfolio

# Flask configuration
FLASK_ENV=production
SECRET_KEY=your_secure_secret_key

# Third-party service credentials (if needed)
# AWS_ACCESS_KEY_ID=your_aws_access_key
# AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## CORS Configuration

The application uses Flask-CORS to handle cross-origin requests. By default, it allows requests from all origins. For production, you may want to restrict this to your frontend domain:

```python
# In app.py
CORS(app, resources={r"/api/*": {"origins": "https://yourdomain.com"}})
```

## Scaling Considerations

1. **Horizontal Scaling:**
   
   - When using a VPS: Set up a load balancer with multiple application instances
   - On Heroku: Use the `heroku ps:scale web=3` command to run multiple dynos
   - On Google Cloud Run: It automatically scales based on traffic

2. **Caching:**

   Consider implementing Redis for caching:
   ```python
   from flask_caching import Cache
   
   cache = Cache(app, config={'CACHE_TYPE': 'redis', 'CACHE_REDIS_URL': 'redis://localhost:6379/0'})
   
   @app.route('/api/blog/posts')
   @cache.cached(timeout=300)  # Cache for 5 minutes
   def get_blog_posts():
       # Your code here
   ```

3. **Database Optimization:**

   - Add indexes to commonly queried fields
   - Use connection pooling
   - Consider read replicas for high-traffic applications

## Monitoring

1. **Basic Monitoring with Health Check:**

   The application has a `/api/health` endpoint that returns the current status.

2. **Setting up Application Monitoring:**

   Consider implementing Prometheus and Grafana:
   ```python
   from prometheus_flask_exporter import PrometheusMetrics
   
   metrics = PrometheusMetrics(app)
   ```

3. **Error Tracking:**

   Integrate Sentry for error tracking:
   ```python
   import sentry_sdk
   from sentry_sdk.integrations.flask import FlaskIntegration
   
   sentry_sdk.init(
       dsn="your-sentry-dsn",
       integrations=[FlaskIntegration()]
   )
   ```

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [TensorFlow Documentation](https://www.tensorflow.org/api_docs)
- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html)
