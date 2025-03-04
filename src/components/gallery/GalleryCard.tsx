
import { Card, CardContent } from "@/components/ui/card";
import { Image, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
  id: number | string;
  title: string;
  description: string;
  imageUrl: string;
  type: "image" | "video";
  onLoad: (id: number | string) => void;
  isLoaded: boolean;
}

export const GalleryCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  type, 
  onLoad, 
  isLoaded 
}: GalleryCardProps) => {
  return (
    <Card className="glass-card overflow-hidden hover-scale transition-all duration-300 h-full">
      <div className="relative overflow-hidden">
        {type === "image" ? (
          <div className="aspect-[4/3] relative">
            <img
              src={imageUrl}
              alt={title}
              className={cn(
                "w-full h-full object-contain transition-all duration-700",
                isLoaded ? "image-blur-loaded" : "image-blur-loading"
              )}
              onLoad={() => onLoad(id)}
            />
            <div className="absolute top-3 right-3 z-20">
              <div className="bg-background/80 backdrop-blur-sm p-1.5 rounded-full">
                <Image className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-[4/3] bg-muted flex items-center justify-center">
            <Play className="h-12 w-12 text-primary/70" />
            <div className="absolute top-3 right-3 z-20">
              <div className="bg-background/80 backdrop-blur-sm p-1.5 rounded-full">
                <Play className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};
