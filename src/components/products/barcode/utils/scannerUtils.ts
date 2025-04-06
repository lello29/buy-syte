
import Quagga from 'quagga';
import { toast } from "sonner";

interface ScannerConfig {
  inputStream: {
    type: string;
    constraints: {
      width?: number;
      height?: number;
      facingMode: string;
    };
    area?: {
      top?: string;
      right?: string;
      left?: string;
      bottom?: string;
    };
  };
  locator: {
    patchSize: string;
    halfSample: boolean;
  };
  numOfWorkers: number;
  frequency: number;
  decoder: {
    readers: string[];
  };
  locate: boolean;
}

export const defaultScannerConfig: ScannerConfig = {
  inputStream: {
    type: 'LiveStream',
    constraints: {
      facingMode: 'environment'
    },
    area: {
      top: '0%',
      right: '0%',
      left: '0%',
      bottom: '0%'
    },
  },
  locator: {
    patchSize: 'medium',
    halfSample: true
  },
  numOfWorkers: navigator.hardwareConcurrency || 4,
  frequency: 10,
  decoder: {
    readers: [
      'ean_reader',
      'ean_8_reader',
      'code_39_reader',
      'code_128_reader',
      'upc_reader',
      'upc_e_reader'
    ]
  },
  locate: true
};

export const initScanner = (
  elementId: string, 
  config: ScannerConfig, 
  onDetected: (result: string) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    Quagga.init(
      {
        ...config,
        inputStream: {
          ...config.inputStream,
          target: document.getElementById(elementId) || undefined
        }
      },
      (err) => {
        if (err) {
          console.error('Quagga initialization failed:', err);
          reject(err);
          return;
        }
        
        Quagga.start();
        
        Quagga.onDetected((result) => {
          if (result && result.codeResult && result.codeResult.code) {
            const code = result.codeResult.code;
            onDetected(code);
          }
        });
        
        resolve();
      }
    );
  });
};

export const stopScanner = (): void => {
  Quagga.stop();
};

export const processImageFile = (
  file: File, 
  onDetected: (result: string) => void
): void => {
  const reader = new FileReader();
  
  reader.onload = function(e) {
    if (e.target?.result) {
      // Create an image element to load the file
      const img = new Image();
      img.src = e.target.result as string;
      
      img.onload = function() {
        // Create a canvas to process the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, img.width, img.height);
          
          // Process the image with Quagga
          Quagga.decodeSingle({
            src: canvas.toDataURL(),
            numOfWorkers: navigator.hardwareConcurrency || 4,
            decoder: {
              readers: [
                'ean_reader',
                'ean_8_reader',
                'code_39_reader',
                'code_128_reader',
                'upc_reader',
                'upc_e_reader'
              ]
            },
            locate: true
          }, (result) => {
            if (result && result.codeResult && result.codeResult.code) {
              onDetected(result.codeResult.code);
            } else {
              toast.error("Nessun codice a barre trovato nell'immagine");
            }
          });
        }
      };
    }
  };
  
  reader.readAsDataURL(file);
};

