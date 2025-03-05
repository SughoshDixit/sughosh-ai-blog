
import React from 'react';
import { ArrowDown, Sparkles, Music, Briefcase, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 md:pt-40 pb-20 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container px-4 mx-auto text-center z-10">
        <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary/10 text-primary font-medium">
          <Sparkles className="h-4 w-4" />
          <span>Digital Portfolio</span>
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-primary">
          Sughosh Dixit
        </h1>
        
        <h2 className="text-2xl md:text-4xl text-muted-foreground font-medium mb-8">
          Digital Innovator
        </h2>
        
        <p className="text-xl max-w-2xl mx-auto mb-6 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Music className="h-5 w-5 text-accent animate-pulse" /> 
            <span className="gold-accent">Footballer and musician</span>
          </span> by <span className="gold-gradient">passion</span>, 
          <span className="inline-flex items-center gap-2 mx-1">
            <Briefcase className="h-5 w-5 text-accent" /> 
            <span className="gold-accent">data science</span>
          </span> by <span className="gold-gradient">profession</span> 💼, 
          <span className="inline-flex items-center gap-2 mx-1">
            <Globe className="h-5 w-5 text-accent animate-pulse" /> 
            <span className="gold-accent">civilizationalist</span>
          </span> by <span className="gold-gradient">ideology</span>
        </p>
        
        <Button onClick={scrollToAbout} size="lg" className="gap-2 hover-scale">
          Discover More
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
