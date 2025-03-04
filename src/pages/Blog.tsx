
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, Heart, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types";

// Mock blog posts data
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: What's Coming in 2023",
    slug: "future-web-development-2023",
    excerpt: "Explore the upcoming trends and technologies shaping the future of web development in 2023 and beyond.",
    content: "Lorem ipsum dolor sit amet...",
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Web Development",
    publishedAt: "2023-05-15T10:00:00Z",
    likes: 42,
    author: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    id: "2",
    title: "Mastering CSS Grid: Advanced Layout Techniques",
    slug: "mastering-css-grid-advanced-techniques",
    excerpt: "Learn advanced CSS Grid techniques to create complex and responsive layouts for modern websites.",
    content: "Lorem ipsum dolor sit amet...",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "CSS",
    publishedAt: "2023-04-28T09:30:00Z",
    likes: 38,
    author: {
      name: "Samantha Lee",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    id: "3",
    title: "Building Accessible Web Applications: Best Practices",
    slug: "accessible-web-applications-best-practices",
    excerpt: "A comprehensive guide to implementing accessibility features in your web applications following WCAG standards.",
    content: "Lorem ipsum dolor sit amet...",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Accessibility",
    publishedAt: "2023-04-15T14:20:00Z",
    likes: 65,
    author: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  },
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Simulate fetching posts
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockPosts);
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                Latest <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline">Popular</Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass-card animate-pulse overflow-hidden">
                  <div className="h-48 bg-muted"></div>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-24 mb-2"></div>
                    <div className="h-8 bg-muted rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded w-full"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-muted rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="glass-card hover-scale overflow-hidden flex flex-col">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className={cn(
                            "w-full h-full object-cover transition-all duration-700",
                            loadedImages[post.id] ? "image-blur-loaded" : "image-blur-loading"
                          )}
                          onLoad={() => handleImageLoad(post.id)}
                        />
                        <Badge className="absolute top-4 left-4">{post.category}</Badge>
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span className="text-sm">{post.author.name}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                      </CardHeader>
                      
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="border-t border-border py-4">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                          
                          <div className="flex gap-3">
                            <div className="flex items-center gap-1 text-sm">
                              <Heart className="h-4 w-4 text-red-500" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MessageSquare className="h-4 w-4" />
                              <span>8</span>
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
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
