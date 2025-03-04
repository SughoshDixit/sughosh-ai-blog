
import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-lg font-bold mb-1">Sughosh Dixit</h3>
            <p className="text-sm text-muted-foreground">AI Enthusiast & Digital Innovator</p>
          </div>
          
          <div className="my-4 md:my-0 flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
              <Sparkles className="h-3 w-3" />
              <span>100% AI-Designed Application</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {currentYear} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
