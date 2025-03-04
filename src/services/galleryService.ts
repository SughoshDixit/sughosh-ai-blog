
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { User } from "firebase/auth";

export const uploadGalleryItem = async (
  file: File,
  title: string,
  description: string,
  fileType: 'image' | 'video',
  user: User | null
): Promise<void> => {
  if (!title.trim()) {
    toast.error("Please add a title for your upload");
    return Promise.reject("Title is required");
  }

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
    
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // You can add progress tracking here if needed
        }, 
        (error) => {
          console.error("Upload error:", error);
          toast.error("Upload failed. Please try again.");
          reject(error);
        }, 
        async () => {
          try {
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
