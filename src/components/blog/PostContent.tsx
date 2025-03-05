
import { NotebookEmbed } from "./NotebookEmbed";

interface PostContentProps {
  content: string;
  notebooks?: {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail?: string;
    renderedHtml?: string;
  }[];
}

export const PostContent = ({ content, notebooks }: PostContentProps) => {
  // Function to replace notebook placeholders in content with actual components
  const processContent = () => {
    if (!notebooks || notebooks.length === 0) {
      return content;
    }

    let processedContent = content;
    notebooks.forEach(notebook => {
      const placeholder = `{{notebook:${notebook.id}}}`;
      if (processedContent.includes(placeholder)) {
        // This is just for the demo - in a real implementation, we would need to 
        // use a more sophisticated approach to replace HTML content
        processedContent = processedContent.replace(
          placeholder, 
          `<div id="notebook-placeholder-${notebook.id}"></div>`
        );
      }
    });

    return processedContent;
  };

  return (
    <>
      <div 
        className="prose prose-lg dark:prose-invert max-w-none mb-8" 
        dangerouslySetInnerHTML={{ __html: processContent() }} 
      />
      
      {notebooks && notebooks.map(notebook => (
        <NotebookEmbed
          key={notebook.id}
          notebookUrl={notebook.url}
          title={notebook.title}
          description={notebook.description}
          renderedHtml={notebook.renderedHtml}
          thumbnail={notebook.thumbnail}
        />
      ))}
    </>
  );
};
