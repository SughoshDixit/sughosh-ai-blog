
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Crop, ZoomIn, ZoomOut, RotateCcw, Check } from "lucide-react";
import ReactCrop, { Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedImage: Blob) => void;
  onCancel: () => void;
}

export const ImageCropper = ({ imageUrl, onCropComplete, onCancel }: ImageCropperProps) => {
  const [crop, setCrop] = useState<CropType>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [zoom, setZoom] = useState<number[]>([1]);
  const [rotation, setRotation] = useState(0);
  
  const imgRef = useRef<HTMLImageElement>(null);
  
  const handleZoomChange = (newZoom: number[]) => {
    setZoom(newZoom);
  };
  
  const increaseZoom = () => {
    setZoom(prev => [Math.min(prev[0] + 0.1, 3)]);
  };
  
  const decreaseZoom = () => {
    setZoom(prev => [Math.max(prev[0] - 0.1, 0.5)]);
  };
  
  const resetRotation = () => {
    setRotation(0);
  };
  
  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const getCroppedImg = (
    image: HTMLImageElement,
    pixelCrop: PixelCrop,
    rotation = 0,
    scale = 1,
  ): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Device pixel ratio
    const pixelRatio = window.devicePixelRatio;

    // Set canvas width to the cropped area width
    canvas.width = pixelCrop.width * scaleX * scale * pixelRatio;
    canvas.height = pixelCrop.height * scaleY * scale * pixelRatio;

    // Scale up the canvas to the device pixel ratio for sharper images
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    // Rotation logic
    if (rotation > 0) {
      // Move to center of canvas
      ctx.translate(canvas.width / (2 * pixelRatio), canvas.height / (2 * pixelRatio));
      
      // Rotate around center
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Move back
      ctx.translate(-canvas.width / (2 * pixelRatio), -canvas.height / (2 * pixelRatio));
    }

    // Draw the image on the canvas
    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width * scaleX * scale,
      pixelCrop.height * scaleY * scale
    );

    // Convert the canvas to a blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas is empty');
        }
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleApplyCrop = async () => {
    if (!imgRef.current || !completedCrop) return;
    
    try {
      const croppedImage = await getCroppedImg(
        imgRef.current,
        completedCrop,
        rotation,
        zoom[0]
      );
      onCropComplete(croppedImage);
    } catch (error) {
      console.error('Error creating cropped image:', error);
    }
  };

  return (
    <div className="bg-card border rounded-lg shadow-sm p-5 space-y-4">
      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
        <Crop className="h-5 w-5 text-primary" />
        Crop Image
      </h3>
      
      <div className="flex justify-center overflow-hidden rounded-lg">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          keepSelection
          aspect={1}
        >
          <img
            ref={imgRef}
            src={imageUrl}
            alt="Crop preview"
            style={{
              transform: `scale(${zoom[0]}) rotate(${rotation}deg)`,
              transformOrigin: 'center',
              maxHeight: '400px',
              width: 'auto'
            }}
          />
        </ReactCrop>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Zoom ({zoom[0].toFixed(1)}x)</label>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decreaseZoom}
                disabled={zoom[0] <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={increaseZoom}
                disabled={zoom[0] >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Slider
            defaultValue={[1]}
            min={0.5}
            max={3}
            step={0.01}
            value={zoom}
            onValueChange={handleZoomChange}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Rotation ({rotation}°)</label>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={rotate}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={resetRotation}
                disabled={rotation === 0}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleApplyCrop}
          disabled={!completedCrop}
        >
          Apply Crop
        </Button>
      </div>
    </div>
  );
};
