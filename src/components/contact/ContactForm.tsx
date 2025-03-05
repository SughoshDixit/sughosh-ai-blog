
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

interface ContactFormProps {
  onSubmit: (e: React.FormEvent) => void;
  formState: ContactFormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
}

export function ContactForm({ onSubmit, formState, handleChange, isSubmitting }: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            value={formState.name}
            onChange={handleChange}
            className="purple-form-input"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            value={formState.email}
            onChange={handleChange}
            className="purple-form-input"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="Project inquiry"
          required
          value={formState.subject}
          onChange={handleChange}
          className="purple-form-input"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message here..."
          rows={6}
          required
          value={formState.message}
          onChange={handleChange}
          className="purple-form-textarea"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full sm:w-auto" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Send Message
            <Send className="h-4 w-4" />
          </span>
        )}
      </Button>
      
      {isSubmitting && (
        <div className="mt-4">
          <Progress value={75} className="h-2" />
        </div>
      )}
    </form>
  );
}
