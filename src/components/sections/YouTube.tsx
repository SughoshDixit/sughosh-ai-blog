
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";

type Video = {
  id: string;
  title: string;
  description: string;
};

export function YouTube() {
  const videos: Video[] = [
    {
      id: "video1",
      title: "Channel Intro: Data Science, Music, Footballer, and Content Creation",
      description: "An introduction to my channel covering my journey through data science, music, football, and content creation."
    },
    {
      id: "video2",
      title: "TechJourney Series: My Path to Becoming a Data Scientist",
      description: "Learn about my journey to becoming a data scientist at Oracle and the challenges I overcame along the way."
    },
    {
      id: "video3",
      title: "Astronomy Explorations: Night Sky Observations",
      description: "Join me as I explore the night sky and share fascinating facts about our cosmos and celestial objects."
    }
  ];

  return (
    <section className="section-container bg-muted/30">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">My YouTube Channel</h2>
          <p className="section-subtitle mx-auto">
            Check out my latest videos on data science, music, football, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="glass-card overflow-hidden hover-scale transition-all duration-300 flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-muted">
                {/* This is a placeholder. In a real implementation, you would embed actual YouTube videos */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-primary/90 text-primary-foreground">
                    <Play className="h-8 w-8" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-muted-foreground">{video.description}</p>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <span>Watch Video</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <a 
              href="https://www.youtube.com/@sughoshdixit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>View All Videos</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
