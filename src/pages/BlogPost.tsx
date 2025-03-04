import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Share2, Calendar, Clock, ArrowLeft, Send } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getPostBySlug, getCommentsByPostId } from "@/services/blogService";
import { BlogPost, Comment } from "@/types";
import { Helmet } from "react-helmet-async";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simplified auth state

  // Fetch post and comments
  useEffect(() => {
    if (!slug) return;
    
    // Simulate API call with delay
    const timer = setTimeout(() => {
      const fetchedPost = getPostBySlug(slug);
      if (fetchedPost) {
        setPost(fetchedPost);
        setLikeCount(fetchedPost.likes);
        setComments(getCommentsByPostId(fetchedPost.id));
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [slug]);

  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like this post",
      });
      return;
    }

    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
    toast({
      title: isLiked ? "Removed like" : "Post liked!",
      description: isLiked ? "You've removed your like from this post" : "You've liked this post",
    });
  };

  const handleShare = () => {
    // Copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link copied!",
      description: "Post URL copied to clipboard",
    });
  };

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
      });
      return;
    }

    if (!commentText.trim()) {
      toast({
        title: "Empty comment",
        description: "Please write something before submitting",
      });
      return;
    }

    setIsCommenting(true);

    // Simulate API call with delay
    setTimeout(() => {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        postId: post?.id || "",
        userId: "current-user",
        userName: "Current User",
        userAvatar: "https://randomuser.me/api/portraits/men/85.jpg",
        content: commentText,
        createdAt: new Date().toISOString(),
      };

      setComments(prev => [newComment, ...prev]);
      setCommentText("");
      setIsCommenting(false);

      toast({
        title: "Comment added",
        description: "Your comment has been published",
      });
    }, 1000);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // ISO format date for structured data
  const formatISODate = (dateString: string) => {
    return new Date(dateString).toISOString();
  };

  // Calculate read time (based on 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return readTime;
  };

  // Create structured data for BlogPosting
  const createBlogPostingStructuredData = (post: BlogPost) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.coverImage,
      "wordcount": post.content.trim().split(/\s+/).length,
      "publisher": {
        "@type": "Organization",
        "name": "Sughosh Dixit",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sughoshdixit.com/og-image.png"
        }
      },
      "url": `https://sughoshdixit.com/blog/${post.slug}`,
      "datePublished": formatISODate(post.publishedAt),
      "dateCreated": formatISODate(post.publishedAt),
      "dateModified": post.updatedAt ? formatISODate(post.updatedAt) : formatISODate(post.publishedAt),
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author.name
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sughoshdixit.com/blog/${post.slug}`
      },
      "comment": comments.map(comment => ({
        "@type": "Comment",
        "author": {
          "@type": "Person",
          "name": comment.userName
        },
        "datePublished": formatISODate(comment.createdAt),
        "text": comment.content
      }))
    };
  };

  // Create breadcrumb structured data
  const createBreadcrumbStructuredData = (post: BlogPost) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sughoshdixit.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://sughoshdixit.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://sughoshdixit.com/blog/${post.slug}`
        }
      ]
    };
  };

  if (isLoading) {
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
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <div className="container page-container text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${post.title} | Blog | Sughosh Dixit`}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.coverImage}
        article={{
          publishedTime: formatISODate(post.publishedAt),
          modifiedTime: post.updatedAt ? formatISODate(post.updatedAt) : undefined,
          author: post.author.name,
          tags: [post.category]
        }}
      />
      
      {/* Structured Data for BlogPosting and BreadcrumbList */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createBlogPostingStructuredData(post))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(createBreadcrumbStructuredData(post))}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        <article className="container page-container">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb navigation (for accessibility and SEO) */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary">Home</Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link to="/blog" className="hover:text-primary">Blog</Link>
                </li>
                <li>&gt;</li>
                <li aria-current="page" className="truncate max-w-[200px]">
                  {post.title}
                </li>
              </ol>
            </nav>
            
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-8 hover:bg-muted"
            >
              <Link to="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <Badge className="mb-4">{post.category}</Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{post.author.name}</span>
              </div>
              
              <Separator orientation="vertical" className="h-5" />
              
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time dateTime={formatISODate(post.publishedAt)} className="text-sm">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              
              <Separator orientation="vertical" className="h-5" />
              
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{calculateReadTime(post.content)} min read</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-5xl mx-auto mb-12 rounded-xl overflow-hidden shadow-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className={cn(
                "w-full h-auto transition-all duration-700",
                imageLoaded ? "image-blur-loaded" : "image-blur-loading"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="flex items-center justify-between mt-12 mb-16">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={cn(
                    "flex items-center gap-2",
                    isLiked && "bg-primary/10 text-primary"
                  )}
                >
                  <Heart 
                    className={cn(
                      "h-4 w-4",
                      isLiked && "fill-primary text-primary"
                    )} 
                  />
                  <span>{likeCount}</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            <Separator className="my-12" />

            <section aria-labelledby="comments-heading" className="mb-16">
              <h2 id="comments-heading" className="text-xl font-bold mb-8">Comments ({comments.length})</h2>
              
              <div className="mb-8">
                <Textarea
                  placeholder="Add a comment..."
                  className="mb-4"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  aria-label="Comment text"
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={isCommenting || !commentText.trim()}
                  className="flex items-center gap-2"
                >
                  {isCommenting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Post Comment</span>
                    </>
                  )}
                </Button>
              </div>
              
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="glass-card p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                          <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{comment.userName}</h4>
                            <time dateTime={formatISODate(comment.createdAt)} className="text-xs text-muted-foreground">
                              {formatDate(comment.createdAt)}
                            </time>
                          </div>
                          <p className="text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
