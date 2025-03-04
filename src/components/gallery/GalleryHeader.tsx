
import React from 'react';
import { Sparkles } from 'lucide-react';

export const GalleryHeader: React.FC = () => {
  return (
    <div className="mb-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <Sparkles className="h-4 w-4" />
        <span>AI-Designed Gallery</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">AI-Generated Gallery</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        This entire portfolio application, including this gallery, was designed and generated using AI technology. 
        Explore AI-generated images showcasing a blend of music, football, and creative visualization.
      </p>
      <div className="mt-4 p-3 bg-muted/50 border border-muted/80 rounded-md text-sm text-muted-foreground">
        <p><strong>Note:</strong> All images in this gallery were created with AI tools and do not represent real photographs. 
        The entire user interface, codebase, and content of this portfolio were AI-generated.</p>
      </div>
    </div>
  );
};
