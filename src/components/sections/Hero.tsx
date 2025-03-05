
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
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all hover-lift subtle-shadow">
            <Music className="h-7 w-7 text-accent mb-2" />
            <h3 className="gold-accent text-lg mb-1">Footballer & Musician</h3>
            <p className="gold-gradient text-sm">by passion ✨</p>
          </div>
          
          <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all hover-lift subtle-shadow">
            <Briefcase className="h-7 w-7 text-accent mb-2" />
            <h3 className="gold-accent text-lg mb-1">Data Science</h3>
            <p className="gold-gradient text-sm">by profession 💼</p>
          </div>
          
          <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all hover-lift subtle-shadow">
            <Globe className="h-7 w-7 text-accent mb-2" />
            <h3 className="gold-accent text-lg mb-1">Civilizationalist</h3>
            <p className="gold-gradient text-sm">by ideology 🌍</p>
          </div>
        </div>
        
        <Button onClick={scrollToAbout} size="lg" className="gap-2 hover-scale">
          Discover More
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
