
import React, { useState } from "react";
import { UserFormValues } from "./schemas/userFormSchema";
import { User as UserType } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";
import { DatabaseAdapter } from "@/lib/databaseAdapter";

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
        // Aggiorna l'utente usando il nostro adapter
        const success = await DatabaseAdapter.update('users', updateData, 'id', user.id);
          
        if (!success) {
          setError(`Errore nell'aggiornamento dell'utente`);
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
