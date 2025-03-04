
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PostActionsProps {
  initialLikes: number;
  isAuthenticated: boolean;
}

export const PostActions = ({ initialLikes, isAuthenticated }: PostActionsProps) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

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

  return (
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
  );
};
