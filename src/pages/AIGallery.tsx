
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { AdminUploadSection } from "@/components/gallery/AdminUploadSection";
import { useGalleryData } from "@/hooks/useGalleryData";
import { Card } from "@/components/ui/card";

const AIGalleryPage = () => {
  const {
    galleryItems,
    loading,
    hasMore,
    loadedImages,
    handleImageLoad,
    fetchMoreItems
  } = useGalleryData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="section-container bg-muted/30">
          <div className="container page-container">
            <GalleryHeader />
            
            {/* Featured Image Preview */}
            <div className="mb-10">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="aspect-[4/5] md:aspect-[16/9] relative">
                  <img 
                    src="/lovable-uploads/b4deee10-cd86-4042-8ab9-ea4521539f75.png" 
                    alt="AI Gallery Featured Image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold">My Journey with AI</h3>
                      <p className="text-sm opacity-80">Exploring the world through the lens of artificial intelligence</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <AdminUploadSection 
              onUploadComplete={fetchMoreItems}
            />

            <GalleryGrid
              items={galleryItems}
              loadedImages={loadedImages}
              onImageLoad={handleImageLoad}
              hasMore={hasMore}
              loading={loading}
              onLoadMore={fetchMoreItems}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIGalleryPage;
