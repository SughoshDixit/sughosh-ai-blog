
import React from 'react';
import { ArrowDown, Sparkles, Music, Briefcase, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl"></div>
      
      <div className="container px-4 mx-auto text-center z-10">
        {/* Name with enhanced visibility */}
        <div className="mb-8 relative">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-primary relative z-10 drop-shadow-sm">
            Sughosh Dixit
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 md:w-48 h-1 bg-accent rounded-full"></div>
        </div>
        
        <h2 className="text-2xl md:text-4xl text-muted-foreground font-medium mb-12">
          Digital Innovator
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-5 rounded-lg bg-primary/5 border border-primary/10 hover:border-accent/30 transition-all hover-lift subtle-shadow">
            <Music className="h-8 w-8 text-accent mb-3" />
            <h3 className="gold-accent text-lg mb-1.5">Footballer & Musician</h3>
            <p className="gold-gradient text-sm">by passion ✨</p>
          </div>
          
          <div className="flex flex-col items-center p-5 rounded-lg bg-primary/5 border border-primary/10 hover:border-accent/30 transition-all hover-lift subtle-shadow">
            <Briefcase className="h-8 w-8 text-accent mb-3" />
            <h3 className="gold-accent text-lg mb-1.5">Data Science</h3>
            <p className="gold-gradient text-sm">by profession 💼</p>
          </div>
          
          <div className="flex flex-col items-center p-5 rounded-lg bg-primary/5 border border-primary/10 hover:border-accent/30 transition-all hover-lift subtle-shadow">
            <Globe className="h-8 w-8 text-accent mb-3" />
            <h3 className="gold-accent text-lg mb-1.5">Civilizationalist</h3>
            <p className="gold-gradient text-sm">by ideology 🌍</p>
          </div>
        </div>
        
        <Button onClick={scrollToAbout} size="lg" className="gap-2 hover-scale px-6 py-6 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md">
          Discover More
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
