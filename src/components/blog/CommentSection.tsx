
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/types";

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  isAuthenticated: boolean;
}

export const CommentSection = ({ comments, postId, isAuthenticated }: CommentSectionProps) => {
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

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
        postId: postId,
        userId: "current-user",
        userName: "Current User",
        userAvatar: "https://randomuser.me/api/portraits/men/85.jpg",
        content: commentText,
        createdAt: new Date().toISOString(),
      };

      setLocalComments(prev => [newComment, ...prev]);
      setCommentText("");
      setIsCommenting(false);

      toast({
        title: "Comment added",
        description: "Your comment has been published",
      });
    }, 1000);
  };

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
    <section aria-labelledby="comments-heading" className="mb-16">
      <h2 id="comments-heading" className="text-xl font-bold mb-8">Comments ({localComments.length})</h2>
      
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
      
      {localComments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {localComments.map((comment) => (
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
  );
};

