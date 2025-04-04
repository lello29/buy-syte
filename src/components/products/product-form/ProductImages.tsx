
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2, Upload, Plus, Image as ImageIcon } from "lucide-react";
import { useProductForm } from "./ProductFormContext";
import { FormMessage } from "@/components/ui/form";

interface ProductImagesProps {
  data: any;
  updateData: (data: any) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({ data, updateData }) => {
  const [dragActive, setDragActive] = useState(false);
  const [currentUrlInput, setCurrentUrlInput] = useState("");
  const { getErrorForField } = useProductForm();
  
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
      handleNewImages(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      handleNewImages(files);
    }
  };

  const handleNewImages = (files: File[]) => {
    // Filter out non-image files
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    
    // Check if we're exceeding the limit (10 images max)
    const currentImages = data.images || [];
    const totalImages = currentImages.length + imageFiles.length;
    
    if (totalImages > 10) {
      alert("Puoi caricare un massimo di 10 immagini");
      
      // Only add images up to the limit
      const remainingSlots = 10 - currentImages.length;
      if (remainingSlots > 0) {
        const newImages = [...currentImages, ...imageFiles.slice(0, remainingSlots)];
        updateData({ images: newImages });
      }
    } else {
      // Add all images
      const newImages = [...currentImages, ...imageFiles];
      updateData({ images: newImages });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...data.images];
    newImages.splice(index, 1);
    updateData({ images: newImages });
  };

  const handleAddImageUrl = () => {
    if (currentUrlInput && currentUrlInput.trim() !== "") {
      const currentImages = data.images || [];
      
      if (currentImages.length >= 10) {
        alert("Puoi caricare un massimo di 10 immagini");
        return;
      }
      
      const newImages = [...currentImages, currentUrlInput];
      updateData({ images: newImages });
      setCurrentUrlInput("");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Immagini del prodotto</h3>
      
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
      
      {getErrorForField("images") && (
        <FormMessage>{getErrorForField("images")?.message}</FormMessage>
      )}
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium mb-2">Aggiungi immagine da URL</h4>
        <div className="flex space-x-2">
          <Input
            placeholder="https://esempio.com/immagine.jpg"
            value={currentUrlInput}
            onChange={(e) => setCurrentUrlInput(e.target.value)}
          />
          <Button onClick={handleAddImageUrl}>
            <Plus className="h-4 w-4 mr-1" /> Aggiungi
          </Button>
        </div>
      </div>
      
      {data.images && data.images.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Immagini caricate ({data.images.length}/10)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.images.map((image: string | File, index: number) => (
              <div key={index} className="relative group">
                <div className="aspect-square border rounded-md overflow-hidden bg-gray-50">
                  {typeof image === "string" ? (
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Error";
                      }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {data.images.length < 10 && (
              <div className="aspect-square border rounded-md flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                <Label htmlFor="add-more-images" className="cursor-pointer flex flex-col items-center p-4">
                  <ImageIcon className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-xs text-center text-gray-500">Aggiungi altra immagine</span>
                </Label>
                <Input 
                  id="add-more-images" 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        <p>
          <span className="font-medium">Suggerimento:</span> Carica immagini di alta qualità per migliorare le conversioni. Le immagini di qualità aumentano le vendite del 30%.
        </p>
      </div>
    </div>
  );
};

export default ProductImages;
