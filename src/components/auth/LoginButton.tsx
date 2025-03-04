
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LogOut, Loader2 } from "lucide-react";

export const LoginButton = () => {
  const { user, isAuthenticated, isLoading, signInWithGoogle, signOut } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img 
              src={user?.photoURL || ''} 
              alt="Profile" 
              className="w-8 h-8 rounded-full"
              referrerPolicy="no-referrer"
            />
            <span className="text-sm font-medium hidden md:inline">
              {user?.displayName}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={signOut}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      ) : (
        <Button 
          variant="default" 
          size="sm" 
          onClick={signInWithGoogle}
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          <span>Sign In with Google</span>
        </Button>
      )}
    </div>
  );
};
