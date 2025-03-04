
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
      title: "Neural Style Transfer",
      description: "An experiment with neural style transfer to create artwork inspired by famous painters.",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      type: "image"
    },
    {
      id: 2,
      title: "AI-Generated Landscapes",
      description: "Beautiful landscape imagery created using stable diffusion models.",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      type: "image"
    },
    {
      id: 3,
      title: "Text-to-Image Creations",
      description: "Artwork generated from text prompts using DALL-E and Midjourney.",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      type: "image"
    },
    {
      id: 4,
      title: "AI-Enhanced Photography",
      description: "Real photos enhanced and transformed with generative AI techniques.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      type: "image"
    },
    {
      id: 5,
      title: "Generative Art Pieces",
      description: "Abstract art pieces created with generative adversarial networks.",
      imageUrl: "https://images.unsplash.com/photo-1557682250-33bd709cbe85",
      type: "image"
    },
    {
      id: 6,
      title: "AI Music Visualizations",
      description: "Visual representations of AI-generated music compositions.",
      imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
      type: "image"
    },
    {
      id: 7,
      title: "Facial Reconstruction",
      description: "AI-powered facial reconstruction from partial or damaged images.",
      imageUrl: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f",
      type: "image"
    },
    {
      id: 8,
      title: "Dream Visualizations",
      description: "Visual representations of described dreams using text-to-image models.",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
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
              <h1 className="text-4xl font-bold mb-4 text-gradient-primary dark:text-gradient">AI Gallery</h1>
              <p className="section-subtitle mx-auto">
                A showcase of my experiments with generative AI for creating images and videos.
              </p>
              <div className="max-w-xs mx-auto mb-8">
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
