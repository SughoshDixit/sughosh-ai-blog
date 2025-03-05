
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code, Play, Download, ExternalLink } from 'lucide-react';

interface NotebookEmbedProps {
  notebookUrl: string;
  title: string;
  description?: string;
  renderedHtml?: string;
  thumbnail?: string;
}

export const NotebookEmbed: React.FC<NotebookEmbedProps> = ({ 
  notebookUrl, 
  title, 
  description, 
  renderedHtml,
  thumbnail
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Function to safely render HTML content
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <Card className="my-8 overflow-hidden border border-primary/20">
      <div className="p-4 bg-muted/50">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Code className="h-5 w-5 mr-2 text-primary" />
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {thumbnail && (
            <img 
              src={thumbnail} 
              alt={`${title} preview`} 
              className="h-16 w-24 object-cover rounded border border-border" 
            />
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            size="sm" 
            variant="outline"
            className="gap-1 text-xs"
            onClick={() => window.open(notebookUrl, '_blank')}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open in Colab
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            className="gap-1 text-xs"
            onClick={() => window.open(notebookUrl.replace('colab', 'download'), '_blank')}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </Button>
          
          <Button 
            size="sm" 
            variant="default"
            className="gap-1 text-xs ml-auto"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Play className="h-3.5 w-3.5" />
            {isExpanded ? "Hide Notebook" : "View Notebook"}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <Separator />
          <Tabs defaultValue="preview" className="w-full">
            <div className="px-4 pt-2">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="preview" className="p-4">
              {renderedHtml ? (
                <div 
                  className="notebook-preview" 
                  dangerouslySetInnerHTML={createMarkup(renderedHtml)} 
                />
              ) : (
                <div className="p-4 bg-muted rounded text-center">
                  <p>Preview not available. Please open in Colab or download the notebook.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="code" className="p-4">
              <div className="p-4 bg-muted rounded overflow-auto max-h-[500px]">
                <pre className="text-sm">
                  <code>
                    # This is a sample Python code from the notebook
                    # In a real implementation, this would show the actual notebook code
                    
                    import pandas as pd
                    import numpy as np
                    import matplotlib.pyplot as plt
                    
                    # Load and process data
                    df = pd.read_csv('data.csv')
                    
                    # Analyze the data
                    results = df.describe()
                    
                    # Visualize results
                    plt.figure(figsize=(10, 6))
                    plt.plot(df['x'], df['y'])
                    plt.title('Data Analysis')
                    plt.xlabel('X')
                    plt.ylabel('Y')
                    plt.show()
                  </code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </Card>
  );
};
