
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const BlogSearch = ({ searchQuery, setSearchQuery }: BlogSearchProps) => {
  return (
    <div className="relative w-full md:w-96">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/70 h-4 w-4" />
      <Input
        placeholder="Search articles..."
        className="pl-10 purple-form-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
