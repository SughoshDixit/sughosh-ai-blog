
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogCardSkeleton } from "@/components/blog/BlogCardSkeleton";
import { NoResults } from "@/components/blog/NoResults";
import { SEOHead } from "@/components/seo/SEOHead";
import { getMockPosts } from "@/services/blogService";
import { BlogPost } from "@/types";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/sections/Hero";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Filter posts based on search query and selected category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filters
  const categories = Array.from(new Set(posts.map(post => post.category)));

  // Create JSON-LD structured data for BlogPosting
  const createBlogPostingStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "headline": "Sughosh Dixit's Data Science Blog",
      "description": "Data Science research, analysis, and insights shared through articles and interactive Python notebooks.",
      "author": {
        "@type": "Person",
        "name": "Sughosh Dixit"
      },
      "blogPost": posts.slice(0, 10).map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.publishedAt,
        "author": {
          "@type": "Person",
          "name": post.author.name
        },
        "image": post.coverImage,
        "url": `https://sughoshdixit.com/blog/${post.slug}`
      }))
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Sughosh Dixit | Data Science & Analysis Blog"
        description="Explore data science research, analysis, and insights through articles and interactive Python notebooks by Sughosh Dixit."
        canonicalUrl="/"
        ogType="website"
      />
      
      {/* Structured Data for Blog */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createBlogPostingStructuredData())}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <Hero />
        
        <section className="container page-container py-20" id="blog-section">
          <div className="mb-16 text-center">
            <h2 className="section-title">Latest Research & Analysis</h2>
            <p className="section-subtitle mx-auto">
              Exploring data science concepts through articles and interactive Python notebooks
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
            <BlogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <BlogFilters 
              categories={categories} 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
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
