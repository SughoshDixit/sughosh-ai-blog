
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LogOut } from "lucide-react";

export const LoginButton = () => {
  const { user, isAuthenticated, signInWithGoogle, signOut } = useAuth();

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
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      ) : (
        <Button 
          variant="default" 
          size="sm" 
          onClick={signInWithGoogle}
          className="gap-2"
        >
          <LogIn className="h-4 w-4" />
          <span>Sign In with Google</span>
        </Button>
      )}
    </div>
  );
};
