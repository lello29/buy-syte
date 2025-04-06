
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, ImageIcon } from "lucide-react";

interface ImageGalleryProps {
  images: (string | File)[];
  onRemoveImage: (index: number) => void;
  onAddMoreImages: (files: File[]) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  onRemoveImage, 
  onAddMoreImages 
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      onAddMoreImages(files);
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Immagini caricate ({images.length}/10)</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
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
              onClick={() => onRemoveImage(index)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
        
        {images.length < 10 && (
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
  );
};

export default ImageGallery;
