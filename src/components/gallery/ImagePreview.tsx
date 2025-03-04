
import { FileImage, FileVideo, X, Crop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImageCropper } from "./ImageCropper";

interface ImagePreviewProps {
  file: File;
  preview: string | null;
  fileType: 'image' | 'video';
  onClear: () => void;
  onFileUpdate?: (file: File, preview: string) => void;
}

export const ImagePreview = ({ 
  file, 
  preview, 
  fileType, 
  onClear,
  onFileUpdate
}: ImagePreviewProps) => {
  const [showCropper, setShowCropper] = useState(false);

  const handleCropComplete = (croppedBlob: Blob) => {
    // Convert the cropped blob to a File
    const croppedFile = new File(
      [croppedBlob], 
      file.name,
      { type: 'image/jpeg' }
    );
    
    // Create a preview of the cropped image
    const reader = new FileReader();
    reader.onload = () => {
      const croppedPreview = reader.result as string;
      if (onFileUpdate) {
        onFileUpdate(croppedFile, croppedPreview);
      }
    };
    reader.readAsDataURL(croppedBlob);
    
    setShowCropper(false);
  };

  if (showCropper && preview && fileType === 'image') {
    return (
      <ImageCropper
        imageUrl={preview}
        onCropComplete={handleCropComplete}
        onCancel={() => setShowCropper(false)}
      />
    );
  }

  return (
    <div className="border-2 border-dashed rounded-lg p-4 relative">
      <button 
        className="absolute top-2 right-2 bg-background/80 p-1 rounded-full"
        onClick={onClear}
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
      
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-contain rounded"
          />
          {fileType === 'image' && onFileUpdate && (
            <Button
              variant="outline"
              size="sm"
              className="absolute bottom-2 right-2 gap-1 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowCropper(true)}
            >
              <Crop className="h-3 w-3" />
              Edit
            </Button>
          )}
        </div>
      ) : (
        <div className="w-full h-48 bg-muted flex items-center justify-center rounded">
          {fileType === 'image' ? (
            <FileImage className="h-12 w-12 text-muted-foreground" />
          ) : (
            <FileVideo className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
      )}
      
      <p className="mt-2 text-sm truncate">{file.name}</p>
    </div>
  );
};
