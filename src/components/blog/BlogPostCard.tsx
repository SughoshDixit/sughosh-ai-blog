
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types";

interface BlogPostCardProps {
  post: BlogPost;
  loadedImages: Record<string, boolean>;
  onImageLoad: (id: string) => void;
}

export const BlogPostCard = ({ post, loadedImages, onImageLoad }: BlogPostCardProps) => {
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
    <Card key={post.id} className="glass-card hover-scale overflow-hidden flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <Link to={`/blog/${post.slug}`}>
          <img
            src={post.coverImage}
            alt={post.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              loadedImages[post.id] ? "image-blur-loaded" : "image-blur-loading"
            )}
            onLoad={() => onImageLoad(post.id)}
          />
        </Link>
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
  );
};
