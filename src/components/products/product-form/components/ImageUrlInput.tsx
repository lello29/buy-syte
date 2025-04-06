
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface ImageUrlInputProps {
  onImageUrlAdded: (url: string) => void;
}

const ImageUrlInput: React.FC<ImageUrlInputProps> = ({ onImageUrlAdded }) => {
  const [currentUrlInput, setCurrentUrlInput] = useState("");

  const handleAddImageUrl = () => {
    if (currentUrlInput && currentUrlInput.trim() !== "") {
      onImageUrlAdded(currentUrlInput);
      setCurrentUrlInput("");
    }
  };

  return (
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
  );
};

export default ImageUrlInput;
