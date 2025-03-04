
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { getPostBySlug, getCommentsByPostId } from "@/services/blogService";
import { BlogPost, Comment } from "@/types";

// Import the newly created components
import { PostHeader } from "@/components/blog/PostHeader";
import { PostImage } from "@/components/blog/PostImage";
import { PostContent } from "@/components/blog/PostContent";
import { PostActions } from "@/components/blog/PostActions";
import { CommentSection } from "@/components/blog/CommentSection";
import { PostSkeleton } from "@/components/blog/PostSkeleton";
import { PostNotFound } from "@/components/blog/PostNotFound";
import { BlogPostSEO } from "@/components/blog/BlogPostSEO";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simplified auth state

  // Fetch post and comments
  useEffect(() => {
    if (!slug) return;
    
    // Flag to handle component unmounting
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        // Fetch post data
        const fetchedPost = await getPostBySlug(slug);
        
        // Only update state if component is still mounted
        if (isMounted && fetchedPost) {
          setPost(fetchedPost);
          
          // Now fetch comments with the post ID
          const fetchedComments = await getCommentsByPostId(fetchedPost.id);
          if (isMounted) {
            setComments(fetchedComments);
          }
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Add a small delay to simulate loading (can be removed in production)
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [slug]);

  // Calculate read time (based on 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return readTime;
  };

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (!post) {
    return <PostNotFound />;
  }

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen flex flex-col">
      <BlogPostSEO post={post} comments={comments} />
      
      <Header />
      <main className="flex-grow pt-24">
        <article className="container page-container">
          <PostHeader post={post} readTime={readTime} />

          <PostImage src={post.coverImage} alt={post.title} />

          <div className="max-w-3xl mx-auto">
            <PostContent content={post.content} />

            <PostActions initialLikes={post.likes} isAuthenticated={isAuthenticated} />

            <Separator className="my-12" />

            <CommentSection 
              comments={comments} 
              postId={post.id} 
              isAuthenticated={isAuthenticated} 
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
