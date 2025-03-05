
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

export const ChatInput = ({ onSendMessage, isProcessing }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 p-4 border-t"
    >
      <Input
        placeholder="Ask me anything about Sughosh..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 purple-form-input"
        disabled={isProcessing}
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || isProcessing}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
