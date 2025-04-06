
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface CameraCaptureButtonProps {
  onImageCaptured: (file: File) => void;
}

const CameraCaptureButton: React.FC<CameraCaptureButtonProps> = ({ onImageCaptured }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Check if device has a camera
  const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  const startCamera = async () => {
    if (!hasGetUserMedia()) {
      toast.error("Il tuo dispositivo non supporta l'accesso alla fotocamera");
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" } // Use back camera if available
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (error) {
      console.error("Errore nell'accesso alla fotocamera:", error);
      toast.error("Impossibile accedere alla fotocamera. Verifica i permessi.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Create a File from the blob
          const file = new File([blob], `camera-image-${Date.now()}.jpg`, { type: "image/jpeg" });
          onImageCaptured(file);
          toast.success("Immagine acquisita con successo");
          setIsOpen(false);
          stopCamera();
        }
      }, "image/jpeg", 0.8);
    }
  };

  if (!isMobile) {
    return null; // Don't show camera button on desktop
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" type="button" className="w-full">
          <Camera className="mr-2 h-4 w-4" />
          Usa fotocamera
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Scatta foto del prodotto</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-lg overflow-hidden mb-4">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="flex gap-2 w-full max-w-md">
            <Button variant="default" size="lg" className="flex-1" onClick={captureImage}>
              Scatta foto
            </Button>
            
            <SheetClose asChild>
              <Button variant="ghost" size="lg">
                Annulla
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CameraCaptureButton;
