
import Lottie from "lottie-react";
import aiAnimation from "@/assets/animations/ai-animation.json";

export const GalleryHeader = () => {
  return (
    <div className="mb-16 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gradient-primary dark:text-gradient">
        Personal Gallery
      </h1>
      <p className="section-subtitle mx-auto">
        A showcase of my journey through music, football, and technology.
      </p>
      <div className="max-w-md mx-auto mb-8">
        <Lottie animationData={aiAnimation} loop={true} />
      </div>
    </div>
  );
};
