
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, X, MoveUp, MoveDown, Camera } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductImagesProps {
  data: any;
  updateData: (data: any) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({ data, updateData }) => {
  const isMobile = useIsMobile();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [images, setImages] = useState<(string | File)[]>(data.images || []);

  const updateImages = (newImages: (string | File)[]) => {
    setImages(newImages);
    updateData({ images: newImages });
  };

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files).filter(file => 
          file.type.startsWith("image/")
        );

        if (newFiles.length === 0) {
          toast.error("Puoi caricare solo immagini");
          return;
        }

        if (images.length + newFiles.length > 10) {
          toast.error("Puoi caricare massimo 10 immagini");
          return;
        }

        updateImages([...images, ...newFiles]);
        toast.success(`${newFiles.length} immagini caricate con successo`);
      }
    },
    [images]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      if (images.length + newFiles.length > 10) {
        toast.error("Puoi caricare massimo 10 immagini");
        return;
      }

      updateImages([...images, ...newFiles]);
      toast.success(`${newFiles.length} immagini caricate con successo`);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    updateImages(newImages);
    toast.info("Immagine rimossa");
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || 
        (direction === "down" && index === images.length - 1)) {
      return;
    }

    const newImages = [...images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    
    updateImages(newImages);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragEnter = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const newImages = [...images];
      const draggedImage = newImages[draggedIndex];
      
      // Remove the dragged item
      newImages.splice(draggedIndex, 1);
      // Insert it at the new position
      newImages.splice(index, 0, draggedImage);
      
      updateImages(newImages);
      setDraggedIndex(index);
    }
  };

  const handleCameraCapture = () => {
    if (!isMobile) {
      toast.info("Questa funzione è ottimizzata per dispositivi mobili con fotocamera");
      return;
    }
    
    // In a real app, this would open the device camera
    toast.info("Funzione di scatto foto in fase di sviluppo");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Immagini prodotto</h3>
        <p className="text-sm text-gray-500">{images.length}/10</p>
      </div>
      
      <div 
        className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors"
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <ImagePlus className="h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-500 font-medium">Trascina qui le immagini o clicca per caricarle</p>
          <p className="text-xs text-gray-400">Formati supportati: JPG, PNG, WebP - Max 2MB per file</p>
          
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" asChild>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileInputChange}
                />
                Seleziona file
              </label>
            </Button>
            
            {isMobile && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCameraCapture}
              >
                <Camera className="h-4 w-4 mr-2" />
                Scatta foto
              </Button>
            )}
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Immagini caricate</h4>
          <p className="text-xs text-gray-500">Trascina le immagini per riordinare. La prima immagine sarà quella principale.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden hover:ring-2 ${index === 0 ? 'ring-2 ring-primary' : ''} ${draggedIndex === index ? 'opacity-50' : 'opacity-100'}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => handleDragEnter(index)}
              >
                <CardContent className="p-0 aspect-square relative">
                  <img
                    src={typeof image === 'string' 
                      ? image 
                      : URL.createObjectURL(image)
                    }
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-primary text-white text-xs py-1 px-2 rounded">
                      Principale
                    </span>
                  )}
                  
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    
                    {!isMobile && (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => moveImage(index, "up")}
                          disabled={index === 0}
                        >
                          <MoveUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => moveImage(index, "down")}
                          disabled={index === images.length - 1}
                        >
                          <MoveDown className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;
