
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, CircleHelp } from "lucide-react";
import { analyzeImage } from "@/services/galleryService";
import { toast } from "sonner";

interface ImageAnalysisProps {
  file: File;
  preview: string | null;
}

interface Prediction {
  label: string;
  confidence: number;
}

export const ImageAnalysis = ({ file, preview }: ImageAnalysisProps) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [modelInfo, setModelInfo] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file || analyzing) return;
    
    setAnalyzing(true);
    try {
      const result = await analyzeImage(file);
      setPredictions(result.predictions);
      setModelInfo(result.modelType);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze image");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-medium">AI Image Analysis</h3>
      </div>
      
      {preview && (
        <div className="flex items-center mb-4">
          <img src={preview} alt="Preview" className="h-16 w-16 object-cover rounded mr-3" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Use machine learning to analyze this image and detect its content
            </p>
          </div>
        </div>
      )}
      
      {analyzing ? (
        <div className="space-y-2">
          <Progress value={50} className="h-2 animate-pulse" />
          <p className="text-sm text-center text-muted-foreground">Analyzing image...</p>
        </div>
      ) : (
        <Button
          onClick={handleAnalyze}
          className="w-full gap-2 mb-3"
          variant={predictions.length > 0 ? "outline" : "default"}
        >
          <Sparkles className="h-4 w-4" />
          {predictions.length > 0 ? "Analyze Again" : "Analyze with AI"}
        </Button>
      )}
      
      {predictions.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-1 mb-2">
            <h4 className="text-sm font-medium">Results</h4>
            {modelInfo && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <CircleHelp className="h-3 w-3" />
                {modelInfo}
              </div>
            )}
          </div>
          
          <ul className="space-y-2">
            {predictions.map((prediction, index) => (
              <li key={index} className="flex justify-between">
                <span className="text-sm">{prediction.label}</span>
                <span className="text-sm font-medium">
                  {(prediction.confidence * 100).toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
