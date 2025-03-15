
import React from 'react';
import { ArrowDown, BarChart2, Book, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 min-h-screen flex items-center justify-center">
      {/* Background patterns and decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container px-4 mx-auto text-center z-10">
        {/* Name with proper padding to prevent cropping */}
        <div className="mb-10 pt-4">
          <h1 className="text-5xl md:text-7xl font-bold text-primary inline-block px-2 py-2 relative z-10">
            Sughosh Dixit
          </h1>
          <p className="text-xl mt-4 text-muted-foreground">The Data Science Chronicle</p>
          <div className="w-48 md:w-64 h-1 bg-primary/30 mx-auto mt-3 rounded-full"></div>
        </div>
        
        {/* Unified identity card with three sections */}
        <div className="max-w-3xl mx-auto mb-12 bg-background/60 backdrop-blur-sm rounded-xl overflow-hidden border border-primary/10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-6 border-b md:border-b-0 md:border-r border-primary/10 flex flex-col items-center justify-center hover:bg-primary/5 transition-colors">
              <BarChart2 className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-primary mb-1.5">Data Scientist</h3>
              <p className="text-sm text-primary/70">Research & Analysis ✨</p>
            </div>
            
            <div className="p-6 border-b md:border-b-0 md:border-r border-primary/10 flex flex-col items-center justify-center hover:bg-primary/5 transition-colors">
              <Book className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-primary mb-1.5">Python Notebooks</h3>
              <p className="text-sm text-primary/70">Interactive Content 💼</p>
            </div>
            
            <div className="p-6 flex flex-col items-center justify-center hover:bg-primary/5 transition-colors">
              <Globe className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-primary mb-1.5">Civilizationalist</h3>
              <p className="text-sm text-primary/70">Global Perspective 🌍</p>
            </div>
          </div>
        </div>
        
        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="gap-2 px-6 py-6 text-base bg-primary hover:bg-primary/90 shadow-md transition-all duration-300 hover:-translate-y-1"
            asChild
          >
            <Link to="/about">
              Learn About Me
              <ArrowDown className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2 px-6 py-6 text-base border-primary text-primary hover:bg-primary/10 shadow-md transition-all duration-300 hover:-translate-y-1"
            asChild
          >
            <Link to="/blog">
              Explore My Blog
              <ArrowDown className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
