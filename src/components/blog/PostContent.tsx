
interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mb-16" 
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};
