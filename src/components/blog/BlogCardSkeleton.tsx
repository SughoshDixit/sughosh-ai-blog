
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface BlogCardSkeletonProps {
  key: number;
}

export const BlogCardSkeleton = ({ key }: BlogCardSkeletonProps) => {
  return (
    <Card key={key} className="glass-card animate-pulse overflow-hidden">
      <div className="h-48 bg-muted"></div>
      <CardHeader>
        <div className="h-6 bg-muted rounded w-24 mb-2"></div>
        <div className="h-8 bg-muted rounded w-full"></div>
      </CardHeader>
      <CardContent>
        <div className="h-20 bg-muted rounded w-full"></div>
      </CardContent>
      <CardFooter>
        <div className="h-10 bg-muted rounded w-full"></div>
      </CardFooter>
    </Card>
  );
};
