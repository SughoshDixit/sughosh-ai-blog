
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sparkles, Upload, X, FileImage, FileVideo } from "lucide-react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onUploadComplete: () => void;
}

export const ImageUploader = ({ onUploadComplete }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState<'image' | 'video'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Admin email - set to your email
  const ADMIN_EMAIL = "sughoshpdixit@gmail.com";

  const isAdmin = !!user && ADMIN_EMAIL === user.email;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check if it's an image or video
    const type = selectedFile.type.startsWith('image/') ? 'image' : 'video';
    setFileType(type);
    setFile(selectedFile);

    // Create preview for images
    if (type === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // For videos, we just show a placeholder
      setPreview(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!file || !isAdmin) return;
    if (!title.trim()) {
      toast.error("Please add a title for your upload");
      return;
    }

    setUploading(true);
    try {
      // Initialize Firebase storage
      const storage = getStorage();
      const db = getFirestore();
      
      // Create a unique filename
      const timestamp = new Date().getTime();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}-${file.name}`;
      const storagePath = `gallery/${fileName}`;
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          // You can add progress tracking here if needed
        }, 
        (error) => {
          console.error("Upload error:", error);
          toast.error("Upload failed. Please try again.");
          setUploading(false);
        }, 
        async () => {
          // Get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Save entry to Firestore
          await addDoc(collection(db, "gallery"), {
            title,
            description,
            imageUrl: downloadURL,
            type: fileType,
            createdAt: serverTimestamp(),
            createdBy: user?.uid
          });
          
          toast.success("Upload complete!");
          setUploading(false);
          clearFile();
          setTitle('');
          setDescription('');
          onUploadComplete();
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
      setUploading(false);
    }
  };

  // If not admin, don't render the component
  if (!isAdmin) return null;

  return (
    <div className="bg-card border rounded-lg shadow-sm p-5 mb-8">
      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        Upload New Content
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input 
            placeholder="Enter a title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={uploading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Input 
            placeholder="Enter a description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
          />
        </div>
        
        <div className="border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors">
          {!file ? (
            <div 
              className="flex flex-col items-center justify-center py-6 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Click to upload an image or video</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF, MP4 up to 10MB</p>
            </div>
          ) : (
            <div className="relative">
              <button 
                className="absolute top-2 right-2 bg-background/80 p-1 rounded-full"
                onClick={clearFile}
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
          )}
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*,video/*" 
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        
        <Button 
          className="w-full gap-2" 
          onClick={handleUpload} 
          disabled={!file || uploading}
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};
