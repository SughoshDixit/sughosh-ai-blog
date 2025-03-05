from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
import numpy as np
from datetime import datetime
from io import BytesIO
from PIL import Image
import base64
import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import tensorflow as tf
import torch

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define your personal information for the chatbot to reference
personal_info = {
  "name": "Sughosh Dixit",
  "occupation": "Data Scientist",
  "skills": [
    "Data Science", 
    "Web Development", 
    "Product Development", 
    "Competitive Programming",
    "Python",
    "JavaScript",
    "React"
  ],
  "interests": [
    "Football", 
    "Astronomy", 
    "Bharat's History", 
    "Music"
  ],
  "achievements": [
    "Rakathon 2.0 (2019): Selected in top 15 most promising ideas.",
    "Garage48 Covid19 Hackathon (2020): Built an app called QuarantineForSure.",
    "PANIIT Hackathon IISC (2021): Selected in top 20 promising ideas, worked on Early Age Education and Talents prediction application (Project Alphers).",
    "Karnataka State Police Hackathon (2023): Finalists, built a Flask-based Face recognition application for Criminals using Image Data Augmentation and GAN.",
    "FFI Scale91 Fintech Hackathon (2024): Working on a Fintech solution for Algorithmic trading using Zerodha's KiteConnect API."
  ],
  "education": "Data Science professional with background in technology and innovation",
  "location": "India",
  "philosophy": "Civilizationalist by ideology, believing in understanding our collective past to shape a better future."
}

# Database Setup
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///sughosh_portfolio.db')
engine = db.create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)

# Database Models
class BlogPost(Base):
    __tablename__ = 'blog_posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    slug = db.Column(db.String(255), unique=True)
    excerpt = db.Column(db.Text)
    content = db.Column(db.Text)
    cover_image = db.Column(db.String(255))
    category = db.Column(db.String(100))
    published_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    likes = db.Column(db.Integer, default=0)
    author_name = db.Column(db.String(100))
    author_avatar = db.Column(db.String(255))

class GalleryItem(Base):
    __tablename__ = 'gallery_items'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(255))
    type = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String(100), nullable=True)

# Create tables if they don't exist
Base.metadata.create_all(engine)

# Helper Functions
def initialize_database():
    """Initialize the database with some sample data if empty"""
    session = Session()
    
    # Check if blog posts table is empty
    if not session.query(BlogPost).first():
        # Add sample blog posts (from the existing mock data)
        sample_posts = [
            {
                "title": "Gratitude for Being Born in the Ancient Civilization of Bharatavarsha",
                "slug": "gratitude-for-being-born-in-the-ancient-civilization-of-bharatavarsha",
                "excerpt": "Reflecting on the privilege of being born in Bharatavarsha (India), a land of ancient wisdom, spirituality, and a continuous civilization spanning thousands of years.",
                "content": """<p>As I sit down to write this, I am overwhelmed with a deep sense of gratitude for being born in a land that has nurtured and preserved the most ancient civilization known to mankind. Bharatavarsha, as India was traditionally known, is not just a geographical entity but a living, breathing testament to human potential and spiritual exploration.</p>
                <h2>A Civilization Unlike Any Other</h2>
                <p>Most civilizations throughout history have risen, flourished for a while, and then perished, leaving behind only archaeological remnants. But India stands as an exception—a civilization that has continued unbroken for over 5,000 years, adapting and evolving while maintaining its core spiritual and philosophical foundations.</p>""",
                "cover_image": "https://images.unsplash.com/photo-1598091383060-24f83fdc7296",
                "category": "Culture & Heritage",
                "published_at": datetime(2023, 8, 15, 14, 20),
                "updated_at": datetime(2023, 9, 2, 10, 15),
                "likes": 127,
                "author_name": "Sughosh Dixit",
                "author_avatar": "/lovable-uploads/07f53509-f9a1-4c27-923a-c1cc0bac748b.png"
            },
            {
                "title": "Being a Liverpool Fan: An Emotional Rollercoaster",
                "slug": "being-ardent-liverpool-fan",
                "excerpt": "The highs and lows of being a devoted Liverpool Football Club supporter through the years - a personal reflection.",
                "content": """<p>Being an ardent Liverpool fan, I can tell that one of the most electrifying experiences is seeing your team play at Anfield, the historic home of Liverpool Football Club. The atmosphere is absolutely incredible, with 54,000 passionate fans singing "You'll Never Walk Alone" in unison, creating a wall of sound that can intimidate even the most formidable opponents.</p>
                <h2>The Glory and the Heartbreak</h2>
                <p>Liverpool's rich history is filled with tremendous highs and devastating lows. From winning the Champions League in miraculous fashion in Istanbul in 2005 to the heartbreaking slip in 2014 that cost us the Premier League title, being a Liverpool fan means experiencing the full spectrum of emotions.</p>""",
                "cover_image": "https://images.unsplash.com/photo-1623607915902-d28d86ade6ee",
                "category": "Sports",
                "published_at": datetime(2022, 6, 20, 9, 30),
                "updated_at": datetime(2022, 7, 15, 14, 45),
                "likes": 89,
                "author_name": "Sughosh Dixit",
                "author_avatar": "/lovable-uploads/07f53509-f9a1-4c27-923a-c1cc0bac748b.png"
            }
        ]
        
        for post_data in sample_posts:
            post = BlogPost(**post_data)
            session.add(post)
        
        # Add sample gallery items
        sample_gallery = [
            {
                "title": "Adventures in Aviation",
                "description": "Exploring new heights and destinations through helicopter travel",
                "image_url": "/lovable-uploads/b007e0ae-455f-476f-939e-8b0f83230810.png",
                "type": "image",
                "created_by": "admin"
            },
            {
                "title": "Liverpool Victory Celebration",
                "description": "The moment when Liverpool won the Premier League",
                "image_url": "https://images.unsplash.com/photo-1623607915902-d28d86ade6ee", 
                "type": "image",
                "created_by": "admin"
            }
        ]
        
        for gallery_data in sample_gallery:
            gallery_item = GalleryItem(**gallery_data)
            session.add(gallery_item)
        
        session.commit()
    
    session.close()

# Initialize database with sample data
initialize_database()

# TensorFlow model setup
def load_tensorflow_model():
    """Load a simple TensorFlow model for image classification"""
    try:
        # MobileNetV2 is a lightweight model good for demos
        model = tf.keras.applications.MobileNetV2(weights='imagenet', include_top=True)
        return model
    except Exception as e:
        app.logger.error(f"Error loading TensorFlow model: {e}")
        return None

# PyTorch model setup
def load_pytorch_model():
    """Load a simple PyTorch model for image classification"""
    try:
        # Use a pretrained resnet model
        model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet18', pretrained=True)
        model.eval()
        return model
    except Exception as e:
        app.logger.error(f"Error loading PyTorch model: {e}")
        return None

# Lazy load models when needed
tf_model = None
torch_model = None

# Chatbot functions
def find_information(query):
    query = query.lower()
    
    # Check if asking about name
    if "name" in query or "who are you" in query or "who is" in query:
        return f"My name is {personal_info['name']}, and I'm a {personal_info['occupation']}."
    
    # Check if asking about job
    if any(word in query for word in ["job", "work", "occupation", "profession"]):
        return f"I work as a {personal_info['occupation']}."
    
    # Check if asking about skills or what I can do
    if any(word in query for word in ["skill", "can you", "good at", "expertise"]):
        return f"I have skills in {', '.join(personal_info['skills'])}."
    
    # Check if asking about interests or hobbies
    if any(word in query for word in ["interest", "hobby", "like to", "enjoy"]):
        return f"I'm interested in {', '.join(personal_info['interests'])}."
    
    # Check if asking about achievements or accomplishments
    if any(word in query for word in ["achievement", "accomplish", "award", "hackathon", "project"]):
        return f"Some of my notable achievements include: \n- {chr(10).join(['- ' + a for a in personal_info['achievements']])}"
    
    # Check if asking about education
    if any(word in query for word in ["education", "study", "school", "college", "university"]):
        return f"I'm a {personal_info['education']}."
    
    # Check if asking about location
    if any(word in query for word in ["location", "where", "country", "city", "live"]):
        return f"I'm based in {personal_info['location']}."
    
    # Check if asking about philosophy or ideology
    if any(word in query for word in ["philosophy", "believe", "ideology", "values"]):
        return personal_info["philosophy"]
    
    # Generic greeting response
    if any(word in query for word in ["hello", "hi", "hey"]):
        return f"Hello! I'm {personal_info['name']}, a {personal_info['occupation']}. How can I help you today?"
    
    # Generic response for unrecognized queries
    return f"I'm {personal_info['name']}, a {personal_info['occupation']} with interests in {', '.join(personal_info['interests'])}. Is there something specific about me you'd like to know?"

# API Routes

@app.route('/api/chatbot', methods=['POST'])
def get_chatbot_response():
    try:
        data = request.json
        user_message = data.get('message', '')
        # Simple NLP processing - lowercase and remove punctuation to standardize input
        cleaned_input = ''.join(c for c in user_message.lower() if c.isalnum() or c.isspace())
        
        # Use our basic NLP function to find relevant information
        response = find_information(cleaned_input)
        return jsonify({"response": response})
    except Exception as e:
        app.logger.error(f"Error generating chatbot response: {e}")
        return jsonify({
            "response": "I'm having trouble processing that question. Could you try asking something else about me?"
        }), 500

@app.route('/api/blog/posts', methods=['GET'])
def get_blog_posts():
    try:
        session = Session()
        posts = session.query(BlogPost).order_by(BlogPost.published_at.desc()).all()
        
        result = []
        for post in posts:
            result.append({
                "id": str(post.id),
                "title": post.title,
                "slug": post.slug,
                "excerpt": post.excerpt,
                "coverImage": post.cover_image,
                "category": post.category,
                "publishedAt": post.published_at.isoformat() + "Z",
                "updatedAt": post.updated_at.isoformat() + "Z",
                "likes": post.likes,
                "author": {
                    "name": post.author_name,
                    "avatar": post.author_avatar
                }
            })
        
        session.close()
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Error getting blog posts: {e}")
        return jsonify({"error": "Failed to retrieve blog posts"}), 500

@app.route('/api/blog/posts/<slug>', methods=['GET'])
def get_blog_post_by_slug(slug):
    try:
        session = Session()
        post = session.query(BlogPost).filter_by(slug=slug).first()
        
        if not post:
            session.close()
            return jsonify({"error": "Post not found"}), 404
        
        result = {
            "id": str(post.id),
            "title": post.title,
            "slug": post.slug,
            "excerpt": post.excerpt,
            "content": post.content,
            "coverImage": post.cover_image,
            "category": post.category,
            "publishedAt": post.published_at.isoformat() + "Z",
            "updatedAt": post.updated_at.isoformat() + "Z",
            "likes": post.likes,
            "author": {
                "name": post.author_name,
                "avatar": post.author_avatar
            }
        }
        
        session.close()
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Error getting blog post by slug: {e}")
        return jsonify({"error": "Failed to retrieve blog post"}), 500

@app.route('/api/blog/comments/<post_id>', methods=['GET'])
def get_post_comments(post_id):
    try:
        # This is a mock implementation - you can later implement real database storage
        comments = [
            {
                "id": "comment-1",
                "postId": post_id,
                "userId": "user-2",
                "userName": "Jane Smith",
                "userAvatar": "https://randomuser.me/api/portraits/women/65.jpg",
                "content": "Great article! I really enjoyed reading your perspective on this topic.",
                "createdAt": "2023-05-16T14:23:00Z",
            },
            {
                "id": "comment-2",
                "postId": post_id,
                "userId": "user-3",
                "userName": "Mark Wilson",
                "userAvatar": "https://randomuser.me/api/portraits/men/41.jpg",
                "content": "This was very insightful. Looking forward to more posts like this in the future.",
                "createdAt": "2023-05-17T09:45:00Z",
            }
        ]
        
        return jsonify(comments)
    except Exception as e:
        app.logger.error(f"Error getting post comments: {e}")
        return jsonify({"error": "Failed to retrieve comments"}), 500

@app.route('/api/gallery/items', methods=['GET'])
def get_gallery_items():
    try:
        session = Session()
        # Support pagination
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        
        offset = (page - 1) * limit
        
        items = session.query(GalleryItem).order_by(
            GalleryItem.created_at.desc()
        ).offset(offset).limit(limit).all()
        
        # Get total count for pagination
        total = session.query(GalleryItem).count()
        
        result = []
        for item in items:
            result.append({
                "id": str(item.id),
                "title": item.title,
                "description": item.description,
                "imageUrl": item.image_url,
                "type": item.type,
                "createdAt": item.created_at.isoformat() + "Z",
                "createdBy": item.created_by
            })
        
        session.close()
        return jsonify({
            "items": result,
            "pagination": {
                "total": total,
                "page": page,
                "limit": limit,
                "pages": (total + limit - 1) // limit
            }
        })
    except Exception as e:
        app.logger.error(f"Error getting gallery items: {e}")
        return jsonify({"error": "Failed to retrieve gallery items"}), 500

@app.route('/api/gallery/upload', methods=['POST'])
def upload_gallery_item():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
            
        file = request.files['file']
        title = request.form.get('title', '')
        description = request.form.get('description', '')
        file_type = request.form.get('type', 'image')
        user_id = request.form.get('userId', '')
        
        if not title:
            return jsonify({"error": "Title is required"}), 400
            
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
            
        # In a real app, you would save the file to a storage service
        # For now, we'll pretend we saved it and return a URL
        filename = f"{datetime.now().timestamp()}-{file.filename}"
        file_url = f"/uploads/{filename}"
        
        # Save to database
        session = Session()
        new_item = GalleryItem(
            title=title,
            description=description,
            image_url=file_url,
            type=file_type,
            created_by=user_id
        )
        
        session.add(new_item)
        session.commit()
        
        result = {
            "id": str(new_item.id),
            "title": new_item.title,
            "description": new_item.description,
            "imageUrl": new_item.image_url,
            "type": new_item.type,
            "createdAt": new_item.created_at.isoformat() + "Z",
            "createdBy": new_item.created_by
        }
        
        session.close()
        return jsonify(result), 201
    except Exception as e:
        app.logger.error(f"Error uploading gallery item: {e}")
        return jsonify({"error": "Failed to upload gallery item"}), 500

@app.route('/api/ml/analyze-image', methods=['POST'])
def analyze_image():
    global tf_model
    
    try:
        # Check if image data was sent
        if 'image' not in request.files and 'image' not in request.json:
            return jsonify({"error": "No image provided"}), 400
            
        # Process image from file or base64
        if 'image' in request.files:
            image_file = request.files['image']
            img = Image.open(image_file)
        else:
            # Assuming base64 image in JSON
            base64_image = request.json.get('image', '')
            image_data = base64.b64decode(base64_image.split(',')[1])
            img = Image.open(BytesIO(image_data))
            
        # Resize and preprocess image for the model
        img = img.resize((224, 224))
        img_array = np.array(img)
        
        # Normalize pixel values
        preprocessed_img = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
        
        # Expand dimensions to create a batch of size 1
        preprocessed_img = np.expand_dims(preprocessed_img, axis=0)
        
        # Load model if not loaded yet
        if tf_model is None:
            tf_model = load_tensorflow_model()
            
        if tf_model is None:
            return jsonify({"error": "Failed to load ML model"}), 500
            
        # Make prediction
        predictions = tf_model.predict(preprocessed_img)
        
        # Decode predictions to class labels
        decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=5)[0]
        
        # Format results
        results = []
        for _, label, score in decoded_predictions:
            results.append({
                "label": label.replace('_', ' ').title(),
                "confidence": float(score)
            })
            
        return jsonify({
            "predictions": results,
            "modelType": "TensorFlow MobileNetV2"
        })
    except Exception as e:
        app.logger.error(f"Error analyzing image: {e}")
        return jsonify({"error": f"Failed to analyze image: {str(e)}"}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
