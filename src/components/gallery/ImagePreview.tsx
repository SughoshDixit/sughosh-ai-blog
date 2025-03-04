
import { FileImage, FileVideo, X } from "lucide-react";

interface ImagePreviewProps {
  file: File;
  preview: string | null;
  fileType: 'image' | 'video';
  onClear: () => void;
}

export const ImagePreview = ({ file, preview, fileType, onClear }: ImagePreviewProps) => {
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
        <img 
          src={preview} 
          alt="Preview" 
          className="w-full h-48 object-contain rounded"
        />
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
