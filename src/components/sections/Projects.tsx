
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
  repoUrl: string;
};

export function Projects() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const projects: Project[] = [
    {
      id: 1,
      title: "About",
      description: "A public repository showcasing my personal and professional information.",
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44",
      tags: ["Personal", "Portfolio", "GitHub"],
      repoUrl: "https://github.com/sughoshdixit/About",
    },
    {
      id: 2,
      title: "Covid-19 News Articles Analysis",
      description: "Analysis of COVID-19 news articles from 2020-2022, exploring trends and sentiment over time.",
      image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57",
      tags: ["Data Analysis", "NLP", "Python", "COVID-19"],
      repoUrl: "https://github.com/sughoshdixit/Covid-19-News-Articles-2020-2022-Analysis",
    },
    {
      id: 3,
      title: "Diabetes Dataset using Naive Bayes Classifier",
      description: "Implementation of a Naive Bayes classifier for diabetes prediction from medical data.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
      tags: ["Machine Learning", "Healthcare", "Python", "Data Science"],
      repoUrl: "https://github.com/sughoshdixit/Diabetes-Dataset-using-Naive-Bayes-Classifier",
    },
    {
      id: 4,
      title: "Face Detection",
      description: "A JavaScript-based web application for real-time face detection using computer vision techniques.",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
      tags: ["JavaScript", "Computer Vision", "Web Development"],
      repoUrl: "https://github.com/sughoshdixit/Face-Detect",
    },
    {
      id: 5,
      title: "Hotel Waiter Tip Prediction",
      description: "Predictive analysis model using Locally Weighted Regression to forecast restaurant tips.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      tags: ["Machine Learning", "Regression", "Python", "Data Science"],
      repoUrl: "https://github.com/sughoshdixit/Hotel-Waiter-Tip-Prediction-Using-Locally-Weighted-Regression",
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
          <h2 className="section-title">My GitHub Projects</h2>
          <p className="section-subtitle mx-auto">
            Explore my work in data science, machine learning, and web development.
          </p>
          <div className="max-w-md mx-auto mb-8">
            <img 
              src="/lovable-uploads/0ebeba33-fe4f-43dd-8a62-42e6ee00711e.png" 
              alt="Sughosh Dixit" 
              className="rounded-lg w-full object-cover shadow-lg"
            />
          </div>
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
                
                <Button variant={project.liveUrl ? "outline" : "default"} asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    <span>View on GitHub</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
