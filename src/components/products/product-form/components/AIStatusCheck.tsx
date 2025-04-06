
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AIStatusCheck: React.FC = () => {
  const [aiStatus, setAiStatus] = useState<{
    available: boolean;
    credits: number;
    active: boolean;
  }>({
    available: true,
    credits: 10,
    active: true
  });

  useEffect(() => {
    // Simuliamo la verifica dello stato dell'AI
    // In un'implementazione reale, questo sarebbe un chiamata API
    const checkAIStatus = async () => {
      try {
        // Simuliamo una risposta
        const mockResponse = {
          available: true,
          credits: 10,
          active: true
        };
        
        setAiStatus(mockResponse);
        
        if (!mockResponse.active) {
          toast.warning("L'AI non è attiva. Prosegui con l'inserimento manuale.");
        } else if (mockResponse.credits <= 0) {
          toast.warning("Crediti AI esauriti. Prosegui con l'inserimento manuale.");
        }
      } catch (error) {
        console.error("Errore durante la verifica dello stato dell'AI:", error);
        setAiStatus({
          available: false,
          credits: 0,
          active: false
        });
        toast.error("Impossibile verificare lo stato dell'AI. Prosegui con l'inserimento manuale.");
      }
    };
    
    checkAIStatus();
  }, []);
  
  if (aiStatus.available && aiStatus.active && aiStatus.credits > 0) {
    return null; // Non mostrare nulla se tutto è ok
  }
  
  return (
    <Alert variant="default" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Funzionalità AI limitate</AlertTitle>
      <AlertDescription>
        {!aiStatus.active ? (
          "L'AI non è attiva per il tuo account. Prosegui con l'inserimento manuale."
        ) : aiStatus.credits <= 0 ? (
          "I crediti AI sono esauriti. Prosegui con l'inserimento manuale o contatta l'amministratore."
        ) : (
          "Servizio AI momentaneamente non disponibile. Prosegui con l'inserimento manuale."
        )}
      </AlertDescription>
    </Alert>
  );
};

export default AIStatusCheck;
