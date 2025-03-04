
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogCardSkeleton } from "@/components/blog/BlogCardSkeleton";
import { NoResults } from "@/components/blog/NoResults";
import { getMockPosts } from "@/services/blogService";
import { BlogPost } from "@/types";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Simulate fetching posts
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(getMockPosts());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="container page-container">
          <div className="mb-16 text-center">
            <h1 className="section-title">Blog</h1>
            <p className="section-subtitle mx-auto">
              Thoughts, insights, and updates from my journey in tech and design.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
            <BlogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <BlogFilters />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {filteredPosts.length === 0 ? (
                <NoResults />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogPostCard 
                      key={post.id} 
                      post={post} 
                      loadedImages={loadedImages} 
                      onImageLoad={handleImageLoad} 
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
