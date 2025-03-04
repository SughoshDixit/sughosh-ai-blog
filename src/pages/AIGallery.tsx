
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { AdminUploadSection } from "@/components/gallery/AdminUploadSection";
import { useGalleryData } from "@/hooks/useGalleryData";

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
