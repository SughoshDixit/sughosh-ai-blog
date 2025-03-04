
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/components/chatbot/ChatMessage";
import { ChatInput } from "@/components/chatbot/ChatInput";
import { getChatbotResponse } from "@/services/chatbotService";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotPage = () => {
  const { isAuthenticated, signInWithGoogle } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hi there! I'm a chatbot that can tell you all about Sughosh Dixit. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (messageText: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Get response from chatbot service
      const response = await getChatbotResponse(messageText);
      
      // Add bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsProcessing(false);
      }, 500); // Slight delay for more natural feeling
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsProcessing(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white dark:bg-deep-blue/90">
      <Header />
      
      <main className="pt-24 pb-16 container">
        <h1 className="text-3xl font-bold mb-8 text-center text-deep-blue dark:text-soft-pink">Chat with Sughosh's AI Assistant</h1>
        
        {isAuthenticated ? (
          <Card className="mx-auto max-w-3xl h-[70vh] flex flex-col shadow-lg border border-soft-pink/30 dark:border-soft-pink/20 bg-white/90 dark:bg-deep-blue/30">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isProcessing={isProcessing} 
            />
          </Card>
        ) : (
          <div className="text-center py-16 max-w-md mx-auto">
            <MessageSquareText className="h-16 w-16 mx-auto mb-4 text-deep-blue dark:text-soft-pink" />
            <h2 className="text-2xl font-bold mb-2 text-deep-blue dark:text-soft-pink">Sign in to Chat</h2>
            <p className="text-deep-blue/70 dark:text-soft-pink/70 mb-6">
              Sign in with your Google account to start chatting with Sughosh's AI assistant.
            </p>
            <Button onClick={signInWithGoogle} size="lg" className="bg-deep-blue hover:bg-deep-blue/90 text-soft-pink dark:bg-soft-pink dark:hover:bg-soft-pink/90 dark:text-deep-blue">
              Sign in with Google
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatbotPage;
