
import { useRef, useState } from 'react';
import { Upload, Crop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageCropper } from "./ImageCropper";

interface FileUploaderProps {
  onFileChange: (file: File | null, fileType: 'image' | 'video', preview: string | null) => void;
  disabled?: boolean;
}

export const FileUploader = ({ onFileChange, disabled = false }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video'>('image');
  const [showCropper, setShowCropper] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's an image or video
    const type = file.type.startsWith('image/') ? 'image' : 'video';
    setFileType(type);
    setSelectedFile(file);

    // Create preview for images
    if (type === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
        // For images, we'll first show the cropper
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    } else {
      // For videos, we just show a placeholder and pass directly
      onFileChange(file, type, null);
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    // Convert the cropped blob to a File
    const croppedFile = new File(
      [croppedBlob], 
      selectedFile?.name || 'cropped-image.jpg',
      { type: 'image/jpeg' }
    );
    
    // Create a preview of the cropped image
    const reader = new FileReader();
    reader.onload = () => {
      const croppedPreview = reader.result as string;
      // Pass the cropped file and preview to parent
      onFileChange(croppedFile, 'image', croppedPreview);
    };
    reader.readAsDataURL(croppedBlob);
    
    // Hide the cropper
    setShowCropper(false);
  };

  const handleCancelCrop = () => {
    // If user cancels cropping, use the original file
    if (selectedFile && filePreview) {
      onFileChange(selectedFile, fileType, filePreview);
    }
    setShowCropper(false);
  };

  if (showCropper && filePreview) {
    return (
      <ImageCropper
        imageUrl={filePreview}
        onCropComplete={handleCropComplete}
        onCancel={handleCancelCrop}
      />
    );
  }

  return (
    <div 
      className="border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors"
      onClick={() => !disabled && fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center py-6 cursor-pointer">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-1">Click to upload an image or video</p>
        <p className="text-xs text-muted-foreground">PNG, JPG, GIF, MP4 up to 10MB</p>
        <p className="text-xs text-primary mt-2 flex items-center">
          <Crop className="h-3 w-3 mr-1" />
          Images can be cropped after selection
        </p>
      </div>
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*,video/*" 
        onChange={handleFileChange}
        disabled={disabled}
      />
    </div>
  );
};
