
import { useState } from "react";
import { MessageSquareText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Lottie from "lottie-react";
import chatAnimation from "@/assets/animations/chat-animation.json";

export const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="p-6 mb-4 w-72 glass-card animate-scale-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Chat with Sughosh's AI</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mb-4 h-32">
            <Lottie animationData={chatAnimation} loop={true} />
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Have questions about my work or experience? Chat with my AI assistant to learn more!
          </p>
          
          <Button asChild className="w-full">
            <Link to="/chatbot">Start Chatting</Link>
          </Button>
        </Card>
      )}
      
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon" 
        className="h-14 w-14 rounded-full shadow-lg"
      >
        <MessageSquareText className="h-6 w-6" />
      </Button>
    </div>
  );
};
