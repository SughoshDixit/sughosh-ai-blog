
import { useRef } from 'react';
import { Upload } from "lucide-react";

interface FileUploaderProps {
  onFileChange: (file: File | null, fileType: 'image' | 'video', preview: string | null) => void;
  disabled?: boolean;
}

export const FileUploader = ({ onFileChange, disabled = false }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check if it's an image or video
    const type = selectedFile.type.startsWith('image/') ? 'image' : 'video';

    // Create preview for images
    if (type === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        onFileChange(selectedFile, type, reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // For videos, we just show a placeholder
      onFileChange(selectedFile, type, null);
    }
  };

  return (
    <div 
      className="border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors"
      onClick={() => !disabled && fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center py-6 cursor-pointer">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-1">Click to upload an image or video</p>
        <p className="text-xs text-muted-foreground">PNG, JPG, GIF, MP4 up to 10MB</p>
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
