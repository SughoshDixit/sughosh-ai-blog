
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { FileUploader } from "@/components/gallery/FileUploader";
import { ImagePreview } from "@/components/gallery/ImagePreview";
import { UploadForm } from "@/components/gallery/UploadForm";
import { uploadGalleryItem } from "@/services/galleryService";

interface ImageUploaderProps {
  onUploadComplete: () => void;
}

const ADMIN_EMAIL = "sughoshpdixit@gmail.com";

export const ImageUploader = ({ onUploadComplete }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState<'image' | 'video'>('image');
  const { user } = useAuth();

  const isAdmin = !!user && ADMIN_EMAIL === user.email;

  const handleFileChange = (newFile: File | null, newFileType: 'image' | 'video', newPreview: string | null) => {
    setFile(newFile);
    setFileType(newFileType);
    setPreview(newPreview);
    setUploadProgress(0);
  };

  const handleFileUpdate = (updatedFile: File, updatedPreview: string) => {
    setFile(updatedFile);
    setPreview(updatedPreview);
  };

  const handleUpload = async () => {
    if (!file || !isAdmin) return;
    if (!title.trim()) return;

    setUploading(true);
    setUploadProgress(0);
    
    try {
      // We're not passing the user object directly, instead extract what we need
      const userInfo = user ? {
        uid: user.id,
        email: user.email
      } : null;

      await uploadGalleryItem(file, title, description, fileType, userInfo, (progress) => {
        setUploadProgress(progress);
      });
      setUploading(false);
      clearForm();
      onUploadComplete();
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const clearForm = () => {
    setFile(null);
    setPreview(null);
    setTitle('');
    setDescription('');
    setUploadProgress(0);
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-card border rounded-lg shadow-sm p-5 mb-8">
      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        Upload New Content
      </h3>
      
      <div className="space-y-4">
        <UploadForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          uploading={uploading}
        />
        
        {file ? (
          <ImagePreview
            file={file}
            preview={preview}
            fileType={fileType}
            onClear={clearForm}
            onFileUpdate={handleFileUpdate}
          />
        ) : (
          <FileUploader onFileChange={handleFileChange} disabled={uploading} />
        )}
        
        <Button 
          className="w-full gap-2" 
          onClick={handleUpload} 
          disabled={!file || uploading}
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>

        {uploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              {Math.round(uploadProgress)}% uploaded
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
