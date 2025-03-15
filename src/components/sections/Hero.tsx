
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  console.log("Hero component rendering");
  
  return (
    <section className="relative pt-32 md:pt-40 pb-20 min-h-[90vh] flex items-center justify-center">
      <div className="container px-4 mx-auto text-center z-10">
        <div className="mb-10 pt-4">
          <h1 className="text-5xl md:text-7xl font-bold text-primary inline-block px-2 py-2 relative z-10">
            Sughosh Dixit
          </h1>
          <p className="text-xl mt-4 text-muted-foreground">The Data Science Chronicle</p>
          <div className="w-48 md:w-64 h-1 bg-primary/30 mx-auto mt-3 rounded-full"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="gap-2 px-6 py-6 text-base"
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
            className="gap-2 px-6 py-6 text-base"
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
