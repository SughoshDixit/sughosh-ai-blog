
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define your personal information for the chatbot to reference
personal_info = {
  "name": "Sughosh Dixit",
  "occupation": "AI Enthusiast & Digital Innovator",
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

# Function to find the most relevant information about a query
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
