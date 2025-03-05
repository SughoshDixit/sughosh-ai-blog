
import { Input } from "@/components/ui/input";

interface UploadFormProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  uploading: boolean;
}

export const UploadForm = ({ 
  title, 
  description, 
  setTitle, 
  setDescription,
  uploading
}: UploadFormProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input 
          placeholder="Enter a title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={uploading}
          className="purple-form-input"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input 
          placeholder="Enter a description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={uploading}
          className="purple-form-input"
        />
      </div>
    </>
  );
};
