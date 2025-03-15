
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface PostActionsProps {
  initialLikes: number;
  postId: string;
}

export const PostActions = ({ initialLikes, postId }: PostActionsProps) => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  
  // Check if the user has already liked this post
  useEffect(() => {
    if (isAuthenticated && user) {
      const checkUserLike = async () => {
        const { data, error } = await supabase
          .from('post_likes')
          .select('*')
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .single();
          
        if (!error && data) {
          setIsLiked(true);
        }
      };
      
      checkUserLike();
    }
  }, [isAuthenticated, user, postId]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like this post",
      });
      return;
    }

    try {
      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user!.id);
          
        if (error) throw error;
        
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        
        toast({
          title: "Removed like",
          description: "You've removed your like from this post",
        });
      } else {
        // Add like
        const { error } = await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: user!.id,
          });
          
        if (error) throw error;
        
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        
        toast({
          title: "Post liked!",
          description: "You've liked this post",
        });
      }
    } catch (error) {
      console.error("Error handling like:", error);
      toast({
        title: "Error",
        description: "Could not process your like. Please try again.",
        variant: "destructive",
      });
    }
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
