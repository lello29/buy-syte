
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";

interface BarcodeScannerProps {
  onDetected: (result: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      setErrorMessage(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsScanning(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setErrorMessage("Impossibile accedere alla fotocamera. Assicurati di aver concesso i permessi necessari.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsScanning(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Simulate barcode detection (in a real app, we'd use a proper barcode library)
        // For demo purposes, we'll generate a random barcode
        setTimeout(() => {
          const mockBarcode = Math.floor(Math.random() * 10000000000000).toString().padStart(13, '0');
          onDetected(mockBarcode);
          stopCamera();
        }, 500);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);
          
          // Simulate barcode detection from image
          setTimeout(() => {
            const mockBarcode = Math.floor(Math.random() * 10000000000000).toString().padStart(13, '0');
            onDetected(mockBarcode);
          }, 500);
        };
        img.src = URL.createObjectURL(file);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Scansiona Codice a Barre</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded">
            {errorMessage}
          </div>
        )}
        
        <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-100 mb-4">
          <video 
            ref={videoRef}
            autoPlay 
            playsInline
            className={`w-full h-full object-cover ${!isScanning ? 'hidden' : ''}`}
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {!isScanning && !errorMessage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
              <Camera className="h-12 w-12 mb-2" />
              <p>Premi il pulsante per attivare la fotocamera</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          {!isScanning ? (
            <Button onClick={startCamera} className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Attiva Fotocamera
            </Button>
          ) : (
            <Button onClick={captureImage} className="w-full bg-green-600 hover:bg-green-700">
              Scansiona Codice
            </Button>
          )}
          
          <div className="relative">
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Carica Immagine con Codice
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
