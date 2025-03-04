
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";

type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
};

export function YouTube() {
  const videos: Video[] = [
    {
      id: "video1",
      title: "Channel Intro: Data Science, Music, Footballer, and Content Creation",
      description: "An introduction to my channel covering my journey through data science, music, football, and content creation.",
      youtubeId: "dQw4w9WgXcQ" // Replace with actual YouTube ID
    },
    {
      id: "video2",
      title: "TechJourney Series: My Path to Becoming a Data Scientist",
      description: "Learn about my journey to becoming a data scientist at Oracle and the challenges I overcame along the way.",
      youtubeId: "KYz2wyBy3kc" // Replace with actual YouTube ID
    },
    {
      id: "video3",
      title: "Astronomy Explorations: Night Sky Observations",
      description: "Join me as I explore the night sky and share fascinating facts about our cosmos and celestial objects.",
      youtubeId: "V1i_x2_TGE0" // Replace with actual YouTube ID
    }
  ];

  return (
    <section id="youtube" className="section-container bg-muted/30 dark:bg-muted/5">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title text-gradient-primary dark:text-gradient">My YouTube Channel</h2>
          <p className="section-subtitle mx-auto text-muted-foreground">
            Check out my latest videos on data science, music, football, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="glass-card overflow-hidden hover-scale transition-all duration-300 flex flex-col border border-primary/20 dark:border-accent/20 shadow-lg dark:shadow-accent/5">
              <div className="aspect-video relative overflow-hidden bg-muted dark:bg-muted/30">
                <img 
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to medium quality thumbnail if HD fails
                    const target = e.target as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors duration-300">
                  <div className="p-4 rounded-full bg-secondary/90 text-secondary-foreground hover:bg-secondary transition-colors duration-300 cursor-pointer">
                    <Play className="h-8 w-8" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2 text-foreground">{video.title}</h3>
                <p className="text-muted-foreground">{video.description}</p>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-primary hover:bg-primary/90 dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90" asChild>
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Watch Video</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" className="border-primary/30 dark:border-accent/30 hover:bg-primary/10 dark:hover:bg-accent/10" asChild>
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
