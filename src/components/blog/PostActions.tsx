
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PostActionsProps {
  initialLikes: number;
  isAuthenticated: boolean;
}

export const PostActions = ({ initialLikes, isAuthenticated }: PostActionsProps) => {
  const { toast } = useToast();

  // Removed like functionality that requires authentication

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
        {/* Removed Like button */}
        
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
