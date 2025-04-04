
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  ArrowLeft, 
  Save 
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useProductForm } from "../ProductFormContext";
import FormStepContent from "../components/FormStepContent";
import MobileStepNav from "../components/MobileStepNav";

interface MobileFormLayoutProps {
  onClose?: () => void;
}

const MobileFormLayout: React.FC<MobileFormLayoutProps> = ({ onClose }) => {
  const { 
    currentStep, 
    steps, 
    handleNext, 
    handlePrevious, 
    handleSubmit,
    showHelp,
    setShowHelp
  } = useProductForm();

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {currentStep === 0 ? "Inserimento" : steps[currentStep].label}
          </h2>
          
          <Sheet open={showHelp} onOpenChange={setShowHelp}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">Aiuto</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh]">
              <SheetHeader>
                <SheetTitle>Guida all'inserimento</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Metodi di inserimento</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Scansione codice:</strong> Veloce per prodotti esistenti</li>
                    <li><strong>Inserimento manuale:</strong> Controllo completo</li>
                    <li><strong>Generazione codice:</strong> Per prodotti senza codice</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Suggerimenti</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Foto di qualità aumentano le vendite del 30%</li>
                    <li>Descrizioni dettagliate riducono i resi</li>
                    <li>Imposta correttamente le varianti</li>
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <MobileStepNav />
      </div>

      <div className="border rounded-lg overflow-hidden mb-4">
        <TabsContent value={steps[currentStep].id} className="m-0 p-4">
          <FormStepContent onClose={onClose} isMobile />
        </TabsContent>
      </div>
      
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          variant="outline"
          size="sm"
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Indietro
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext} size="sm">
            Avanti
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={() => { 
              handleSubmit();
              if (onClose) setTimeout(onClose, 2000);
            }} 
            size="sm" 
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="mr-1 h-4 w-4" />
            Salva
          </Button>
        )}
      </div>
    </>
  );
};

export default MobileFormLayout;
