
# Python Backend for Portfolio Website

This is the Python backend for the portfolio website. It provides API endpoints for various features including a chatbot, blog, gallery, and AI/ML image analysis.

## Features

- **Chatbot API**: Natural language processing to answer questions about the portfolio owner
- **Blog API**: Retrieve blog posts and comments
- **Gallery API**: Image upload and management
- **ML Analysis**: Image analysis using TensorFlow and PyTorch

## Tech Stack

- **Framework**: Flask
- **Database**: SQLAlchemy ORM (SQLite for development, can use PostgreSQL/MySQL in production)
- **ML Libraries**: TensorFlow, PyTorch
- **Cross-origin support**: Flask-CORS

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Git

### Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

   Note: If you encounter issues with TensorFlow or PyTorch installation, consult their official documentation for platform-specific instructions:
   - [TensorFlow Installation Guide](https://www.tensorflow.org/install)
   - [PyTorch Installation Guide](https://pytorch.org/get-started/locally/)

4. Run the development server:
   ```bash
   python app.py
   ```

The server will start at `http://localhost:5000`

## Configuration (Optional)

By default, the application uses SQLite as the database, which doesn't require additional setup. For production use, you might want to configure a more robust database:

1. Create a `.env` file in the backend directory with the following variables:
   ```
   DATABASE_URL=your_database_connection_string
   FLASK_ENV=development  # Change to 'production' for production
   ```

2. For PostgreSQL, the connection string format is:
   ```
   DATABASE_URL=postgresql://username:password@localhost/database_name
   ```

3. For MySQL, the connection string format is:
   ```
   DATABASE_URL=mysql+pymysql://username:password@localhost/database_name
   ```

## API Endpoints

### Chatbot

- `POST /api/chatbot` - Send a message to the chatbot and get a response

### Blog

- `GET /api/blog/posts` - Get all blog posts
- `GET /api/blog/posts/:slug` - Get a single blog post by slug
- `GET /api/blog/comments/:postId` - Get comments for a blog post

### Gallery

- `GET /api/gallery/items` - Get gallery items (supports pagination)
- `POST /api/gallery/upload` - Upload a new gallery item

### ML Analysis

- `POST /api/ml/analyze-image` - Analyze an image using TensorFlow

### System

- `GET /api/health` - Health check endpoint

## Customizing Personal Information

The chatbot responds based on the personal information defined in the `app.py` file. To customize this information, modify the `personal_info` dictionary in `app.py`:

```python
personal_info = {
  "name": "Your Name",
  "occupation": "Your Occupation",
  "skills": [
    "Skill 1", 
    "Skill 2",
    # Add more skills
  ],
  "interests": [
    "Interest 1", 
    "Interest 2",
    # Add more interests
  ],
  # Add more personal information
}
```

## Database Models

The application uses SQLAlchemy ORM with the following main models:

- `BlogPost` - Represents a blog post
- `GalleryItem` - Represents an item in the gallery

## Development

To add more functionality:

1. Define new SQLAlchemy models in `app.py` or in separate modules
2. Create new API routes in `app.py` or organize them into blueprints
3. Implement the required business logic

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Integration with React Frontend

The backend is designed to work with the React frontend. The frontend makes API calls to this backend for:

1. Chatbot responses
2. Fetching blog posts and comments
3. Uploading and retrieving gallery items
4. Image analysis using TensorFlow

To enable the frontend to use this backend:

1. Ensure the backend is running at `http://localhost:5000`
2. The frontend is pre-configured to make API requests to this address

For CORS configuration in production, modify the CORS settings in `app.py` to allow only your frontend domain.
