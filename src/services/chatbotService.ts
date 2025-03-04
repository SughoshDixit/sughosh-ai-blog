
// This service now makes API calls to our Python backend

export const getChatbotResponse = async (userMessage: string): Promise<string> => {
  try {
    // Make a request to our Python backend API
    const response = await fetch('http://localhost:5000/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return "I'm having trouble processing that question. Could you try asking something else about me?";
  }
};
