
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Check,
  Scan,
  Info,
  Barcode 
} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useProductForm } from "../ProductFormContext";
import StepNavSidebar from "../components/StepNavSidebar";
import FormStepContent from "../components/FormStepContent";

interface DesktopFormLayoutProps {
  onClose?: () => void;
}

const DesktopFormLayout: React.FC<DesktopFormLayoutProps> = ({ onClose }) => {
  const { 
    currentStep, 
    setCurrentStep, 
    steps, 
    handleNext, 
    handlePrevious, 
    handleSubmit,
    handleSkipToManualEntry,
    showHelp,
    setShowHelp
  } = useProductForm();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {currentStep === 0 ? "Inserimento Prodotto" : `${steps[currentStep].label}`}
        </h2>
        
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Navigazione Rapida</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {steps.map((step, index) => (
                      <li key={step.id}>
                        <NavigationMenuLink asChild>
                          <Button 
                            variant="ghost" 
                            onClick={() => setCurrentStep(index)}
                            disabled={index > currentStep}
                            className="w-full justify-start"
                          >
                            <step.icon className="mr-2 h-4 w-4" />
                            <div className="flex flex-col items-start">
                              <span>{step.label}</span>
                              <span className="text-xs text-muted-foreground">{step.subtitle}</span>
                            </div>
                          </Button>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Sheet open={showHelp} onOpenChange={setShowHelp}>
            <SheetTrigger asChild>
              <Button variant="outline">Aiuto</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Guida all'inserimento prodotti</SheetTitle>
                <SheetDescription>
                  Come inserire al meglio i tuoi prodotti
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Metodi di inserimento</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Scansione codice a barre:</strong> Più veloce se il prodotto è già nel database</li>
                    <li><strong>Inserimento manuale:</strong> Completo controllo sui dettagli del prodotto</li>
                    <li><strong>Generazione codice:</strong> Per prodotti senza codice EAN esistente</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Suggerimenti</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Foto di qualità aumentano le vendite del 30%</li>
                    <li>Descrizioni dettagliate riducono i resi e aumentano la soddisfazione</li>
                    <li>Imposta correttamente le varianti per facilitare gli acquisti</li>
                    <li>Specifica le opzioni di vendita per chiarire come il cliente può acquistare</li>
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="flex gap-6">
        <StepNavSidebar />
        
        <div className="flex-1">
          <div className="bg-white border rounded-lg p-6">
            <TabsContent value={steps[currentStep].id} className="mt-0">
              <FormStepContent 
                onClose={onClose}
                handleSkipToManualEntry={handleSkipToManualEntry}
              />
            </TabsContent>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Precedente
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Successivo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => { 
                handleSubmit();
                if (onClose) setTimeout(onClose, 2000);
              }} className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                Salva Prodotto
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopFormLayout;
