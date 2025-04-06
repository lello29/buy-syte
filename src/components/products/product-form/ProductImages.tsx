
import React from "react";
import { FormMessage } from "@/components/ui/form";
import { useProductForm } from "./ProductFormContext";
import ImageDragDropArea from "./components/ImageDragDropArea";
import ImageUrlInput from "./components/ImageUrlInput";
import ImageGallery from "./components/ImageGallery";
import { addNewImages, getImageLimitWarning } from "./utils/imageUtils";
import { toast } from "sonner";

interface ProductImagesProps {
  data: any;
  updateData: (data: any) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({ data, updateData }) => {
  const { getErrorForField } = useProductForm();
  const MAX_IMAGES = 10;
  
  const handleNewImages = (files: File[]) => {
    // Filter out non-image files
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    
    // Check if we're exceeding the limit
    const currentImages = data.images || [];
    const warning = getImageLimitWarning(currentImages.length, imageFiles.length, MAX_IMAGES);
    
    if (warning) {
      toast.warning(warning);
    }
    
    // Add images within limit
    const newImages = addNewImages(currentImages, imageFiles, MAX_IMAGES);
    updateData({ images: newImages });
  };

  const handleAddImageUrl = (url: string) => {
    const currentImages = data.images || [];
    
    if (currentImages.length >= MAX_IMAGES) {
      toast.warning(`Puoi caricare un massimo di ${MAX_IMAGES} immagini`);
      return;
    }
    
    const newImages = [...currentImages, url];
    updateData({ images: newImages });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...data.images];
    newImages.splice(index, 1);
    updateData({ images: newImages });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Immagini del prodotto</h3>
      
      <ImageDragDropArea onFilesAdded={handleNewImages} />
      
      {getErrorForField("images") && (
        <FormMessage>{getErrorForField("images")?.message}</FormMessage>
      )}
      
      <ImageUrlInput onImageUrlAdded={handleAddImageUrl} />
      
      <ImageGallery 
        images={data.images || []} 
        onRemoveImage={handleRemoveImage}
        onAddMoreImages={handleNewImages}
      />

      <div className="text-sm text-muted-foreground">
        <p>
          <span className="font-medium">Suggerimento:</span> Carica immagini di alta qualità per migliorare le conversioni. Le immagini di qualità aumentano le vendite del 30%.
        </p>
      </div>
    </div>
  );
};

export default ProductImages;
