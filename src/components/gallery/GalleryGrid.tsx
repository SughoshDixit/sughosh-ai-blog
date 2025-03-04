
import { GalleryCard } from "./GalleryCard";
import { Button } from "@/components/ui/button";
import { GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
  loadedImages: Record<string, boolean>;
  onImageLoad: (id: number | string) => void;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export const GalleryGrid = ({
  items,
  loadedImages,
  onImageLoad,
  hasMore,
  loading,
  onLoadMore
}: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <GalleryCard
          key={item.id}
          {...item}
          onLoad={onImageLoad}
          isLoaded={loadedImages[item.id.toString()]}
        />
      ))}

      {/* Load More Button */}
      {hasMore && items.length > 0 && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};
