
// Define your personal information for the chatbot to reference
/**
 * CUSTOMIZATION GUIDE
 * -------------------
 * Update the personalInfo object below with your own information.
 * This will be used by the AI chatbot to answer questions about you.
 */
const personalInfo = {
  name: "Sughosh Dixit",
  occupation: "Data Scientist at Oracle",
  skills: [
    "Data Science", 
    "Web Development", 
    "Product Development", 
    "Competitive Programming",
    "Python",
    "JavaScript",
    "React"
  ],
  interests: [
    "Football", 
    "Astronomy", 
    "Bharat's History", 
    "Music"
  ],
  achievements: [
    "Rakathon 2.0 (2019): Selected in top 15 most promising ideas.",
    "Garage48 Covid19 Hackathon (2020): Built an app called QuarantineForSure.",
    "PANIIT Hackathon IISC (2021): Selected in top 20 promising ideas, worked on Early Age Education and Talents prediction application (Project Alphers).",
    "Karnataka State Police Hackathon (2023): Finalists, built a Flask-based Face recognition application for Criminals using Image Data Augmentation and GAN.",
    "FFI Scale91 Fintech Hackathon (2024): Working on a Fintech solution for Algorithmic trading using Zerodha's KiteConnect API."
  ],
  education: "Data Science professional with background in technology and innovation",
  location: "India",
  philosophy: "Civilizationalist by ideology, believing in understanding our collective past to shape a better future."
};

// Function to find the most relevant information about a query
const findInformation = (query: string): string => {
  query = query.toLowerCase();
  
  // Check if asking about name
  if (query.includes("name") || query.includes("who are you") || query.includes("who is")) {
    return `My name is ${personalInfo.name}, and I'm a ${personalInfo.occupation}.`;
  }
  
  // Check if asking about job
  if (query.includes("job") || query.includes("work") || query.includes("occupation") || query.includes("profession")) {
    return `I work as a ${personalInfo.occupation}.`;
  }
  
  // Check if asking about skills or what I can do
  if (query.includes("skill") || query.includes("can you") || query.includes("good at") || query.includes("expertise")) {
    return `I have skills in ${personalInfo.skills.join(", ")}.`;
  }
  
  // Check if asking about interests or hobbies
  if (query.includes("interest") || query.includes("hobby") || query.includes("like to") || query.includes("enjoy")) {
    return `I'm interested in ${personalInfo.interests.join(", ")}.`;
  }
  
  // Check if asking about achievements or accomplishments
  if (query.includes("achievement") || query.includes("accomplish") || query.includes("award") || query.includes("hackathon") || query.includes("project")) {
    return `Some of my notable achievements include: \n- ${personalInfo.achievements.join("\n- ")}`;
  }
  
  // Check if asking about education
  if (query.includes("education") || query.includes("study") || query.includes("school") || query.includes("college") || query.includes("university")) {
    return `I'm a ${personalInfo.education}.`;
  }
  
  // Check if asking about location
  if (query.includes("location") || query.includes("where") || query.includes("country") || query.includes("city") || query.includes("live")) {
    return `I'm based in ${personalInfo.location}.`;
  }
  
  // Check if asking about philosophy or ideology
  if (query.includes("philosophy") || query.includes("believe") || query.includes("ideology") || query.includes("values")) {
    return personalInfo.philosophy;
  }
  
  // Generic greeting response
  if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
    return `Hello! I'm ${personalInfo.name}, a ${personalInfo.occupation}. How can I help you today?`;
  }
  
  // Generic response for unrecognized queries
  return `I'm ${personalInfo.name}, a ${personalInfo.occupation} with interests in ${personalInfo.interests.join(", ")}. Is there something specific about me you'd like to know?`;
};

export const getChatbotResponse = async (userMessage: string): Promise<string> => {
  try {
    // Simple NLP processing - lowercase and remove punctuation to standardize input
    const cleanedInput = userMessage.toLowerCase().replace(/[^\w\s]/g, "");
    
    // Use our basic NLP function to find relevant information
    return findInformation(cleanedInput);
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return "I'm having trouble processing that question. Could you try asking something else about me?";
  }
};
