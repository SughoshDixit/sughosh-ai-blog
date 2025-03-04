
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostImageProps {
  src: string;
  alt: string;
}

export const PostImage = ({ src, alt }: PostImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto mb-12 rounded-xl overflow-hidden shadow-lg">
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-auto transition-all duration-700",
          imageLoaded ? "image-blur-loaded" : "image-blur-loading"
        )}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};
