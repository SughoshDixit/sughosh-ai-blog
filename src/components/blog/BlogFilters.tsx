
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const BlogFilters = () => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="flex items-center gap-1">
        Latest <ArrowRight className="h-4 w-4" />
      </Button>
      <Button variant="outline">Popular</Button>
    </div>
  );
};
