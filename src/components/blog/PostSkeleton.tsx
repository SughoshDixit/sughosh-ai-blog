
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const PostSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container page-container">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-12"></div>
            <div className="aspect-video bg-muted rounded-lg mb-10"></div>
            <div className="space-y-4 max-w-3xl mx-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-muted rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
