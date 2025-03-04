
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function About() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const skills = [
    "UI/UX Design",
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "Database Design",
    "API Development",
    "Cloud Services",
    "DevOps",
  ];

  return (
    <section id="about" className="section-container">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            I combine technical expertise with creative design to build meaningful digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] hover-scale shadow-xl">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl" />
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Portrait"
                className={cn(
                  "w-full h-full object-cover transition-all duration-700",
                  imageLoaded ? "image-blur-loaded" : "image-blur-loading"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10 hidden lg:block" />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-muted-foreground mb-6">
              I'm a passionate creator with over 5 years of experience building elegant solutions for complex problems. 
              My journey began with a fascination for how things work, which led me to explore the intersection of design 
              and technology.
            </p>
            <p className="text-muted-foreground mb-6">
              I believe in creating purposeful digital products that not only look beautiful but also solve real problems 
              for users. My approach combines strategic thinking with hands-on execution to deliver results that exceed expectations.
            </p>
            
            <h3 className="text-2xl font-bold mb-4 mt-10">My Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
