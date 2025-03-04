
# Python Backend for Sughosh Dixit's Portfolio

This is the Python backend for Sughosh Dixit's portfolio website. It provides API endpoints for various features including a chatbot, blog, gallery, and AI/ML image analysis.

## Features

- **Chatbot API**: Natural language processing to answer questions about Sughosh
- **Blog API**: CRUD operations for blog posts and comments
- **Gallery API**: Image/video upload and management
- **ML Analysis**: Image analysis using TensorFlow

## Tech Stack

- **Framework**: Flask
- **Database**: SQLAlchemy ORM (SQLite for development, can use PostgreSQL/MySQL in production)
- **ML Libraries**: TensorFlow, PyTorch
- **Authentication**: JWT (to be implemented)

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   ```bash
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   python app.py
   ```

The server will start at `http://localhost:5000`

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

## Development

### Database Models

The application uses SQLAlchemy ORM with the following models:

- `BlogPost` - Represents a blog post
- `GalleryItem` - Represents an item in the gallery

### ML Models

The application loads TensorFlow and PyTorch models for image analysis:

- TensorFlow: MobileNetV2 pre-trained on ImageNet
- PyTorch: ResNet18 pre-trained on ImageNet

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
