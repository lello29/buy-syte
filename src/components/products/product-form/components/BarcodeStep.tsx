
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Barcode, Info, Scan } from "lucide-react";
import { useProductForm } from "../ProductFormContext";
import BarcodeScanner from "@/components/products/barcode/BarcodeScanner";
import { toast } from "sonner";

interface BarcodeStepProps {
  isMobile?: boolean;
  handleSkipToManualEntry: () => void;
}

const BarcodeStep: React.FC<BarcodeStepProps> = ({ isMobile, handleSkipToManualEntry }) => {
  const { steps, setCurrentStep, updateProductData } = useProductForm();
  const [showScanner, setShowScanner] = useState(false);

  const handleScanBarcode = () => {
    setShowScanner(true);
  };

  const handleBarcodeDetected = (barcode: string) => {
    updateProductData({ barcode });
    setShowScanner(false);
    toast.success(`Codice ${barcode} rilevato con successo`);
    
    // Navigate to the details step
    const detailsStep = steps.findIndex(step => step.id === "details");
    setCurrentStep(detailsStep);
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="text-center py-2">
          <Barcode className="h-12 w-12 mx-auto mb-3 text-primary" />
          <h3 className="text-lg font-medium mb-2">Codice a barre</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Scansiona per cercare nel database centrale
          </p>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleScanBarcode}
              size="sm"
            >
              <Scan className="mr-2 h-4 w-4" />
              Scansiona
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleSkipToManualEntry}
              size="sm"
            >
              <Info className="mr-2 h-4 w-4" />
              Inserimento manuale
            </Button>
          </div>
          
          <p className="text-[10px] text-muted-foreground mt-4">
            Prodotti con codice a barre vengono salvati in archivio condiviso
          </p>
        </div>

        {showScanner && (
          <BarcodeScanner 
            onDetected={handleBarcodeDetected} 
            onClose={() => setShowScanner(false)} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <Barcode className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-medium mb-2">Inizia con un codice a barre</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Scansiona il codice a barre del prodotto per cercarlo nel database centrale e velocizzare l'inserimento.
        </p>
        
        <div className="flex flex-col space-y-3 justify-center items-center">
          <Button 
            onClick={handleScanBarcode}
            className="w-full max-w-xs"
          >
            <Scan className="mr-2 h-4 w-4" />
            Scansiona codice a barre
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSkipToManualEntry}
            className="w-full max-w-xs"
          >
            <Info className="mr-2 h-4 w-4" />
            Inserisci prodotto manualmente
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-8">
          Nota: i prodotti con codice a barre vengono salvati in un archivio condiviso per facilitare l'inserimento da parte di altri utenti.
        </p>
      </div>

      {showScanner && (
        <BarcodeScanner 
          onDetected={handleBarcodeDetected} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </div>
  );
};

export default BarcodeStep;
