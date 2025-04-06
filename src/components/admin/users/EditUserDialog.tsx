
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Mail, Shield, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { User as UserType, UserRole } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

// Schema di validazione per il form
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve avere almeno 2 caratteri" }),
  email: z.string().email({ message: "Email non valida" }),
  role: z.enum(["user", "shop", "collaborator", "admin"], {
    message: "Seleziona un ruolo valido",
  }),
  password: z.string().optional(),
  fiscalCode: z.string().optional(),
  vatNumber: z.string().optional(),
});

interface EditUserDialogProps {
  user: UserType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: (updatedUser: UserType) => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  user,
  open,
  onOpenChange,
  onUserUpdated,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configura react-hook-form con zodResolver
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user" as UserRole,
      password: "",
      fiscalCode: "",
      vatNumber: "",
    },
  });

  // Aggiorna i valori del form quando l'utente cambia
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        password: "",
        fiscalCode: user.fiscalCode || "",
        vatNumber: user.vatNumber || "",
      });
    }
  }, [user, form]);

  const handleSubmit = async (data: z.infer<typeof userFormSchema>) => {
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
      onOpenChange(false);
      toast.success("Utente aggiornato con successo");
    } catch (error: any) {
      console.error("Errore nell'aggiornamento dell'utente:", error);
      setError(`Si è verificato un errore: ${error.message || "Errore sconosciuto"}`);
      toast.error("Si è verificato un errore durante l'aggiornamento dell'utente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Modifica Utente
          </DialogTitle>
          <DialogDescription>
            Modifica i dettagli dell'utente
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-800">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {user && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nome</FormLabel>
                    <div className="flex items-center border rounded-md">
                      <User className="mx-2 h-4 w-4 text-gray-500" />
                      <FormControl>
                        <Input
                          {...field}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Nome utente"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <div className="flex items-center border rounded-md">
                      <Mail className="mx-2 h-4 w-4 text-gray-500" />
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Email utente"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Ruolo</FormLabel>
                    <div className="flex items-center border rounded-md">
                      <Shield className="mx-2 h-4 w-4 text-gray-500" />
                      <FormControl>
                        <Select
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="border-0 focus:ring-0 w-full">
                            <SelectValue placeholder="Seleziona ruolo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Utente</SelectItem>
                            <SelectItem value="shop">Negozio</SelectItem>
                            <SelectItem value="collaborator">Collaboratore</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      Nuova Password <span className="text-gray-400 text-xs">(Lascia vuoto per mantenere la stessa)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Nuova password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-2 border-t mt-4">
                <Label className="text-sm font-medium text-gray-500 mb-2 block">
                  Informazioni Aziendali (opzionali)
                </Label>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fiscalCode"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Codice Fiscale</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Codice fiscale"
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Partita IVA</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Partita IVA"
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                  Annulla
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salva modifiche
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
