
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera } from "lucide-react";
import CameraCaptureButton from "./CameraCaptureButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageDragDropAreaProps {
  onFilesAdded: (files: File[]) => void;
}

const ImageDragDropArea: React.FC<ImageDragDropAreaProps> = ({ onFilesAdded }) => {
  const [dragActive, setDragActive] = useState(false);
  const isMobile = useIsMobile();
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files && files.length > 0) {
      const imageFiles = files.filter(file => file.type.startsWith("image/"));
      onFilesAdded(imageFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const imageFiles = files.filter(file => file.type.startsWith("image/"));
      onFilesAdded(imageFiles);
      toast.success(`${imageFiles.length} immagini caricate con successo`);
    }
  };

  const handleCameraCapture = (file: File) => {
    if (file) {
      onFilesAdded([file]);
      toast.success("Immagine dalla fotocamera caricata con successo");
    }
  };

  const openFilePicker = () => {
    document.getElementById('image-upload')?.click();
  };

  const openCamera = () => {
    if (isMobile) {
      try {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.capture = 'environment';
        
        inputElement.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            onFilesAdded(Array.from(target.files));
            toast.success("Foto scattata con successo");
          }
        };
        
        inputElement.click();
      } catch (error) {
        console.error("Errore nell'apertura della fotocamera:", error);
        toast.error("Impossibile accedere alla fotocamera");
      }
    }
  };

  return (
    <div className="space-y-3">
      <div 
        className={`border-2 border-dashed rounded-md p-6 text-center ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-sm">
            <Label htmlFor="image-upload" className="cursor-pointer font-medium text-primary hover:underline">
              Clicca per caricare
            </Label>
            <Input 
              id="image-upload" 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <p className="text-muted-foreground">o trascina le immagini qui</p>
          </div>
          <p className="text-xs text-muted-foreground">
            PNG, JPG o GIF fino a 5MB (max 10 immagini)
          </p>
        </div>
      </div>
      
      {isMobile && (
        <div className="flex flex-col gap-2">
          <CameraCaptureButton onImageCaptured={handleCameraCapture} />
          <div className="grid grid-cols-2 gap-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex items-center justify-center gap-2"
              onClick={openFilePicker}
            >
              <Upload className="h-4 w-4" />
              Galleria
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              className="flex items-center justify-center gap-2"
              onClick={openCamera}
            >
              <Camera className="h-4 w-4" />
              Scatta foto
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDragDropArea;
