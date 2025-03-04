
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Play, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import aiAnimation from "@/assets/animations/ai-animation.json";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  type: "image" | "video";
};

const AIGalleryPage = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Late Night Coding",
      description: "Focused on developing innovative solutions in the late hours.",
      imageUrl: "/lovable-uploads/bdc0862d-de04-41e0-8b17-a90996eef7dd.png",
      type: "image"
    },
    {
      id: 2,
      title: "Musical Performance",
      description: "Performing with acoustic guitar at a live concert venue.",
      imageUrl: "/lovable-uploads/459b4b49-b54b-4497-b3f3-5ea33aee1ae8.png",
      type: "image"
    },
    {
      id: 3,
      title: "Fashion Forward",
      description: "Style meets sophistication at a fashion event.",
      imageUrl: "/lovable-uploads/0e9a2962-aee6-448d-9ccc-7992f5bf765b.png",
      type: "image"
    },
    {
      id: 4,
      title: "Live Performance",
      description: "On stage with keyboard and vocals, creating musical magic.",
      imageUrl: "/lovable-uploads/558ad19c-1140-4b4b-84ae-2e07abc1e9a3.png",
      type: "image"
    },
    {
      id: 5,
      title: "Stage Presence",
      description: "Engaging with the audience during a live musical performance.",
      imageUrl: "/lovable-uploads/2e34de0b-d574-4669-b221-6c2a7f1a5243.png",
      type: "image"
    },
    {
      id: 6,
      title: "Artist Portrait",
      description: "Artistic promotional shot with vibrant background design.",
      imageUrl: "/lovable-uploads/8fd7efd1-9f2a-4211-8a0b-c349e58ea802.png",
      type: "image"
    },
    {
      id: 7,
      title: "Concert Performance",
      description: "Live music performance with guitar and vocals.",
      imageUrl: "/lovable-uploads/a2fdcdcf-f6af-4a46-8736-d7bdfb6a31e7.png",
      type: "image"
    },
    {
      id: 8,
      title: "Football Training",
      description: "Professional football practice at Real Madrid's stadium.",
      imageUrl: "/lovable-uploads/8e4fef83-79c2-412a-97ad-0ed0a145e47d.png",
      type: "image"
    },
    {
      id: 9,
      title: "Match Day",
      description: "Action shot during a competitive football match.",
      imageUrl: "/lovable-uploads/79623cf2-e704-4f84-999d-023a5da062dc.png",
      type: "image"
    },
    {
      id: 10,
      title: "Field Position",
      description: "Ready for action on the football pitch.",
      imageUrl: "/lovable-uploads/cb1b0553-1397-425c-92b8-e48a67b68c40.png",
      type: "image"
    },
    {
      id: 11,
      title: "Pre-Match",
      description: "Preparing for kickoff at the stadium.",
      imageUrl: "/lovable-uploads/1ae3f1e2-68e7-43cc-926e-ee93ce4e105b.png",
      type: "image"
    },
    {
      id: 12,
      title: "Game Control",
      description: "Demonstrating ball control during match play.",
      imageUrl: "/lovable-uploads/81b84bf6-3225-4a1b-9032-3d6b939ce294.png",
      type: "image"
    },
    {
      id: 13,
      title: "Match Skills",
      description: "Showcasing technical abilities on the pitch.",
      imageUrl: "/lovable-uploads/b109308a-387d-4291-9f6e-0149a2ad2e37.png",
      type: "image"
    }
  ];

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="section-container bg-muted/30">
          <div className="container page-container">
            <div className="mb-16 text-center">
              <h1 className="text-4xl font-bold mb-4 text-gradient-primary dark:text-gradient">Personal Gallery</h1>
              <p className="section-subtitle mx-auto">
                A showcase of my journey through music, football, and technology.
              </p>
              <div className="max-w-md mx-auto mb-8">
                <Lottie animationData={aiAnimation} loop={true} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <Card key={item.id} className="glass-card overflow-hidden hover-scale transition-all duration-300 h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 bg-muted/40 z-10" />
                    {item.type === "image" ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={cn(
                          "w-full h-full object-cover transition-all duration-700",
                          loadedImages[item.id] ? "image-blur-loaded" : "image-blur-loading"
                        )}
                        onLoad={() => handleImageLoad(item.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Play className="h-12 w-12 text-primary/70" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 z-20">
                      <div className="bg-background/80 backdrop-blur-sm p-1.5 rounded-full">
                        {item.type === "image" ? (
                          <Image className="h-4 w-4 text-primary" />
                        ) : (
                          <Play className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}

              {/* Add more button */}
              <Card className="glass-card overflow-hidden border-dashed border-2 hover:border-primary transition-all duration-300 flex items-center justify-center h-full">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Add New Creation</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Upload your own AI-generated images or videos
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Upload</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIGalleryPage;
