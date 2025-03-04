
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export function Projects() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform built with React, Node.js, and MongoDB. Features include product search, cart management, and secure payment processing.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      id: 2,
      title: "Health Tracking App",
      description: "A mobile app for tracking health metrics, exercise routines, and nutrition. Integrates with wearable devices for comprehensive health monitoring.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      tags: ["React Native", "Firebase", "GraphQL"],
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "A web application that uses AI to generate content for marketing, blogs, and social media. Includes SEO optimization and content scheduling.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      tags: ["Next.js", "OpenAI API", "TailwindCSS"],
      liveUrl: "#",
      repoUrl: "#",
    },
  ];

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <section id="projects" className="section-container bg-muted/30">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle mx-auto">
            Explore some of my recent work showcasing my design and development skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden glass-card hover-scale transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-muted/40 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-700",
                    loadedImages[project.id] ? "image-blur-loaded" : "image-blur-loading"
                  )}
                  onLoad={() => handleImageLoad(project.id)}
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              
              <CardFooter className="flex gap-3 pt-2">
                {project.liveUrl && (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                
                {project.repoUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
