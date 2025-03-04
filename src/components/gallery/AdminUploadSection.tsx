
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ImageUploader } from "@/components/gallery/ImageUploader";
import { useAuth } from "@/context/AuthContext";

// Admin email constant
const ADMIN_EMAIL = "sughoshpdixit@gmail.com";

interface AdminUploadSectionProps {
  onUploadComplete: () => void;
}

export const AdminUploadSection = ({ onUploadComplete }: AdminUploadSectionProps) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { user } = useAuth();

  const isAdmin = !!user && ADMIN_EMAIL === user.email;

  if (!isAdmin) {
    return null;
  }

  const handleUploadComplete = () => {
    setIsUploadModalOpen(false);
    onUploadComplete();
  };

  return (
    <>
      {!isUploadModalOpen ? (
        <div className="mb-8 flex justify-center">
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="gap-2"
            size="lg"
          >
            <Plus className="h-4 w-4" />
            Add New Content
          </Button>
        </div>
      ) : (
        <ImageUploader onUploadComplete={handleUploadComplete} />
      )}
    </>
  );
};
