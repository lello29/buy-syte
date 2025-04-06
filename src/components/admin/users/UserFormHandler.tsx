
import React, { useState } from "react";
import { UserFormValues } from "./schemas/userFormSchema";
import { User as UserType } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";

interface UserFormHandlerProps {
  user: UserType;
  onUserUpdated: (updatedUser: UserType) => void;
  onComplete: () => void;
  children: (props: {
    handleSubmit: (data: UserFormValues) => Promise<void>;
    loading: boolean;
    error: string | null;
  }) => React.ReactNode;
}

const UserFormHandler: React.FC<UserFormHandlerProps> = ({
  user,
  onUserUpdated,
  onComplete,
  children
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: UserFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const updateData: Record<string, any> = {
        name: data.name,
        email: data.email,
        role: data.role,
        fiscal_code: data.fiscalCode || null,
        vat_number: data.vatNumber || null,
        updated_at: new Date().toISOString(),
      };
      
      // Solo includi la password se è stata cambiata
      if (data.password) {
        updateData.password = data.password;
      }
      
      console.log("Aggiornamento utente con dati:", updateData);
      
      if (isSupabaseConfigured) {
        // Aggiorna l'utente in Supabase
        const { error: supabaseError } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', user.id);
          
        if (supabaseError) {
          console.error("Errore nell'aggiornamento dell'utente:", supabaseError.message);
          setError(`Errore nell'aggiornamento dell'utente: ${supabaseError.message}`);
          toast.error("Errore durante l'aggiornamento dell'utente");
          return;
        }
      }
      
      // Crea l'oggetto utente aggiornato
      const updatedUser: UserType = {
        ...user,
        name: data.name,
        email: data.email,
        role: data.role,
        fiscalCode: data.fiscalCode || undefined,
        vatNumber: data.vatNumber || undefined,
        updatedAt: new Date().toISOString(),
      };
      
      // Chiama il callback con l'utente aggiornato
      onUserUpdated(updatedUser);
      onComplete();
      toast.success("Utente aggiornato con successo");
    } catch (error: any) {
      console.error("Errore nell'aggiornamento dell'utente:", error);
      setError(`Si è verificato un errore: ${error.message || "Errore sconosciuto"}`);
      toast.error("Si è verificato un errore durante l'aggiornamento dell'utente");
    } finally {
      setLoading(false);
    }
  };

  return <>{children({ handleSubmit, loading, error })}</>;
};

export default UserFormHandler;
