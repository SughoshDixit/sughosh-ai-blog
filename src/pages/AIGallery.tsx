import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ImageUploader } from "@/components/gallery/ImageUploader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { useAuth } from "@/context/AuthContext";
import { GalleryItem } from "@/types";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";

const ADMIN_EMAIL = ""; // Replace with your email in production

const AIGalleryPage = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const isAdmin = !!user && (ADMIN_EMAIL === user.email || ADMIN_EMAIL === "");

  // Static gallery items as fallback
  const staticGalleryItems: GalleryItem[] = [
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

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async (fetchMore = false) => {
    try {
      setLoading(true);
      const db = getFirestore();
      
      // Create a query
      let galleryQuery = query(
        collection(db, "gallery"),
        orderBy("createdAt", "desc"),
        limit(12)
      );
      
      // If we're fetching more, start after the last document
      if (fetchMore && lastDoc) {
        galleryQuery = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(12)
        );
      }
      
      const querySnapshot = await getDocs(galleryQuery);
      
      // If no more documents, set hasMore to false
      if (querySnapshot.empty) {
        setHasMore(false);
        
        // If it's the first fetch and there are no items, use the static items
        if (!fetchMore) {
          setGalleryItems(staticGalleryItems);
        }
        
        setLoading(false);
        return;
      }
      
      // Set the last document for pagination
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      
      // Convert Firestore documents to GalleryItems
      const items = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "Untitled",
          description: data.description || "",
          imageUrl: data.imageUrl,
          type: data.type || "image"
        } as GalleryItem;
      });
      
      // Update the gallery items
      if (fetchMore) {
        setGalleryItems(prev => [...prev, ...items]);
      } else {
        // If there are no items in Firestore, use the static ones
        setGalleryItems(items.length > 0 ? items : staticGalleryItems);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      // Fallback to static gallery items if there's an error
      if (!fetchMore) {
        setGalleryItems(staticGalleryItems);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = (id: number | string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id.toString()]: true
    }));
  };

  const handleUploadComplete = () => {
    setIsUploadModalOpen(false);
    fetchGalleryItems();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="section-container bg-muted/30">
          <div className="container page-container">
            <GalleryHeader />

            {/* Upload Section (Only visible to admin) */}
            {isAdmin && !isUploadModalOpen && (
              <div className="mb-8 flex justify-center">
                <Button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="gap-2"
                  size="lg"
                >
                  <Plus className="h-4 w-4" />
                  Add New Content
                </Button>
              </div>
            )}

            {/* Upload Form */}
            {isUploadModalOpen && (
              <ImageUploader onUploadComplete={handleUploadComplete} />
            )}

            {/* Gallery Grid */}
            <GalleryGrid
              items={galleryItems}
              loadedImages={loadedImages}
              onImageLoad={handleImageLoad}
              hasMore={hasMore}
              loading={loading}
              onLoadMore={() => fetchGalleryItems(true)}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIGalleryPage;
