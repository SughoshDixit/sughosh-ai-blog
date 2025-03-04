
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Code, Database, FilmIcon, Trophy, History, Play, Rocket } from "lucide-react";

export function About() {
  const skills = [
    { name: "Data Science", icon: <Database className="h-4 w-4 mr-2" /> },
    { name: "Web Development", icon: <Code className="h-4 w-4 mr-2" /> },
    { name: "Product Development", icon: <Rocket className="h-4 w-4 mr-2" /> },
    { name: "Competitive Programming", icon: <Code className="h-4 w-4 mr-2" /> },
    { name: "Football", icon: <Trophy className="h-4 w-4 mr-2" /> },
    { name: "Astronomy", icon: <FilmIcon className="h-4 w-4 mr-2" /> },
    { name: "Bharat's History", icon: <History className="h-4 w-4 mr-2" /> },
  ];

  const languages = [
    { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Oracle", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { name: "VS Code", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  ];

  return (
    <section id="about" className="section-container">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            Data Scientist at Oracle with a passion for football, music, and Bharat's history.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] hover-scale shadow-xl">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl" />
              {/* Embedded video with autoplay */}
              <iframe
                src="https://drive.google.com/file/d/1TGtD21UDdki5dBU_EtWCeWFQ4Gf70lzl/preview?autoplay=1"
                allow="autoplay; fullscreen"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10 hidden lg:block" />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-muted-foreground mb-6">
              I'm a Data Scientist at Oracle, combining analytical expertise with creative problem-solving. My professional 
              journey is complemented by my passion for football, music, and a deep interest in Bharat's history.
            </p>
            <p className="text-muted-foreground mb-6">
              As a civilizationalist by ideology, I believe in understanding our collective past to shape a better future.
              I'm also an enthusiast of astronomy and enjoy exploring the cosmos in my free time.
            </p>
            
            <h3 className="text-2xl font-bold mb-4 mt-10">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill) => (
                <span 
                  key={skill.name}
                  className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm flex items-center"
                >
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-4">Languages & Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 my-6">
              {languages.map((lang) => (
                <div key={lang.name} className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-2">
                    <img src={lang.image} alt={lang.name} className="w-full h-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
