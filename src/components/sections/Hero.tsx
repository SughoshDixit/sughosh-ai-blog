
import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container px-4 mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-medium">
          <Sparkles className="h-4 w-4" />
          <span>100% AI-Designed Portfolio</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Sughosh Dixit
        </h1>
        
        <h2 className="text-2xl md:text-4xl text-muted-foreground font-medium mb-8">
          AI Enthusiast & Digital Innovator
        </h2>
        
        <p className="text-xl max-w-2xl mx-auto mb-10 text-muted-foreground">
          Civilizationalist by ideology, with expertise in AI, data science, and web development. 
          This entire portfolio application is completely designed and generated using AI tools.
        </p>
        
        <Button onClick={scrollToAbout} size="lg" className="gap-2">
          Discover More
          <ArrowDown className="h-4 w-4" />
        </Button>
        
        <div className="mt-8 p-3 bg-muted/50 border border-muted/80 rounded-md max-w-xl mx-auto text-sm">
          <p className="text-muted-foreground">
            <strong>Note:</strong> This portfolio website, including all content, images, and functionality, 
            was entirely designed and generated by artificial intelligence.
          </p>
        </div>
      </div>
    </section>
  );
};
