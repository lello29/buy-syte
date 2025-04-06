
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { initScanner, stopScanner, defaultScannerConfig, processImageFile } from "./utils/scannerUtils";

interface BarcodeScannerProps {
  onDetected: (result: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected, onClose }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      setErrorMessage(null);
      
      if (!videoRef.current) {
        console.error("Video container reference not available");
        return;
      }
      
      setIsScanning(true);
      
      await initScanner("barcode-scanner", defaultScannerConfig, (code) => {
        // Stop scanner after successful detection
        stopScanner();
        setIsScanning(false);
        onDetected(code);
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
      setErrorMessage("Impossibile accedere alla fotocamera. Assicurati di aver concesso i permessi necessari.");
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (isScanning) {
      stopScanner();
      setIsScanning(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.loading("Analisi dell'immagine in corso...");
      processImageFile(file, (code) => {
        toast.dismiss();
        toast.success("Codice rilevato: " + code);
        onDetected(code);
      });
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
        
        <div 
          id="barcode-scanner"
          ref={videoRef}
          className="relative overflow-hidden rounded-lg aspect-video bg-gray-100 mb-4"
        >
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
            <Button onClick={stopCamera} className="w-full bg-red-600 hover:bg-red-700">
              Ferma Scansione
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
