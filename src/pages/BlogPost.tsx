
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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BlogPost, Comment } from "@/types";
import { useAuth } from "@/hooks/useAuth";

// Mock blog post data
const mockPost: BlogPost = {
  id: "1",
  title: "The Future of Web Development: What's Coming in 2023",
  slug: "future-web-development-2023",
  excerpt: "Explore the upcoming trends and technologies shaping the future of web development in 2023 and beyond.",
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
    
    <h2>The Rise of Web Components</h2>
    
    <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
    
    <p>Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
    
    <h2>AI-Powered Development Tools</h2>
    
    <p>Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
    
    <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    
    <h2>Server Components and the Future of Rendering</h2>
    
    <p>Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.</p>
    
    <p>Nunc ut sem vitae risus tristique posuere. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
    
    <h2>Conclusion</h2>
    
    <p>Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
  `,
  coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  category: "Web Development",
  publishedAt: "2023-05-15T10:00:00Z",
  likes: 42,
  author: {
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
};

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "comment-1",
    postId: "1",
    userId: "user-2",
    userName: "Jane Smith",
    userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "Great article! I especially liked the part about web components. Can't wait to see how they evolve in the coming years.",
    createdAt: "2023-05-16T14:23:00Z",
  },
  {
    id: "comment-2",
    postId: "1",
    userId: "user-3",
    userName: "Mark Wilson",
    userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    content: "I think AI-powered development tools will completely change the workflow for developers. We're already seeing some amazing things with GitHub Copilot.",
    createdAt: "2023-05-17T09:45:00Z",
  },
];

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  // Fetch post and comments
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      if (slug === mockPost.slug) {
        setPost(mockPost);
        setComments(mockComments);
        setLikeCount(mockPost.likes);
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

    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        postId: post?.id || "",
        userId: user?.id || "",
        userName: user?.name || "",
        userAvatar: user?.avatar,
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

  // Calculate read time (based on 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return readTime;
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
      <Header />
      <main className="flex-grow pt-24">
        <article className="container page-container">
          <div className="max-w-4xl mx-auto">
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
                <span className="text-sm">{formatDate(post.publishedAt)}</span>
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

            <div className="mb-16">
              <h3 className="text-xl font-bold mb-8">Comments ({comments.length})</h3>
              
              {isAuthenticated ? (
                <div className="mb-8">
                  <Textarea
                    placeholder="Add a comment..."
                    className="mb-4"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
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
              ) : (
                <div className="glass-card p-6 text-center mb-8">
                  <p className="mb-4">Sign in to join the conversation</p>
                  <Button asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              )}
              
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
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
