
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

// Simple user type to handle both Firebase and Supabase users
type SimpleUser = {
  uid: string;
  email?: string | null;
} | null;

export const uploadGalleryItem = async (
  file: File,
  title: string,
  description: string,
  fileType: 'image' | 'video',
  user: SimpleUser,
  onProgress?: (progress: number) => void
): Promise<void> => {
  if (!title.trim()) {
    toast.error("Please add a title for your upload");
    return Promise.reject("Title is required");
  }

  try {
    // Try to use the Python backend first
    if (process.env.USE_PYTHON_BACKEND === 'true') {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', fileType);
      formData.append('userId', user?.uid || '');
      
      // Call progress callback with fake progress values
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
          onProgress?.(progress);
        } else {
          clearInterval(progressInterval);
        }
      }, 300);
      
      const response = await fetch('http://localhost:5000/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      onProgress?.(100);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      toast.success("Upload complete!");
      return;
    }
    
    // Fallback to Firebase storage if Python backend is not available
    const storage = getStorage();
    const db = getFirestore();
    
    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${file.name}`;
    const storagePath = `gallery/${fileName}`;
    
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(progress);
        }, 
        (error) => {
          console.error("Upload error:", error);
          toast.error("Upload failed. Please try again.");
          reject(error);
        }, 
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            await addDoc(collection(db, "gallery"), {
              title,
              description,
              imageUrl: downloadURL,
              type: fileType,
              createdAt: serverTimestamp(),
              createdBy: user?.uid
            });
            
            toast.success("Upload complete!");
            resolve();
          } catch (error) {
            console.error("Error saving to Firestore:", error);
            toast.error("Upload failed. Please try again.");
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Upload failed. Please try again.");
    return Promise.reject(error);
  }
};

// New function to analyze image with TensorFlow model via Python backend
export const analyzeImage = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('http://localhost:5000/api/ml/analyze-image', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Image analysis error:", error);
    toast.error("Failed to analyze image. Please try again.");
    return Promise.reject(error);
  }
};
