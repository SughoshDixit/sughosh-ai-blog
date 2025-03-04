
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { AdminUploadSection } from "@/components/gallery/AdminUploadSection";
import { SEOHead } from "@/components/seo/SEOHead";
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
      <SEOHead
        title="AI Gallery | Sughosh Dixit"
        description="Explore my personal gallery showcasing AI-generated art, creative projects, and visual experiments in music, football, and technology."
        canonicalUrl="/ai-gallery"
        ogImage="/lovable-uploads/b007e0ae-455f-476f-939e-8b0f83230810.png"
      />
      <Header />
      <main className="flex-grow pt-24">
        <section className="section-container bg-muted/30">
          <div className="container page-container">
            <GalleryHeader />
            
            {/* Featured Image Preview */}
            <div className="mb-10">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/b007e0ae-455f-476f-939e-8b0f83230810.png" 
                    alt="AI Gallery Featured Image"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold">Adventures in Aviation</h3>
                      <p className="text-sm opacity-80">Exploring new heights and destinations through helicopter travel</p>
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
