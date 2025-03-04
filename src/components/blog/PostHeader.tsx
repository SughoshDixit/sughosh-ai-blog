
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { BlogPost } from "@/types";

interface PostHeaderProps {
  post: BlogPost;
  readTime: number;
}

export const PostHeader = ({ post, readTime }: PostHeaderProps) => {
  // Format date for display
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

  return (
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
          <span className="text-sm">{readTime} min read</span>
        </div>
      </div>
    </div>
  );
};
