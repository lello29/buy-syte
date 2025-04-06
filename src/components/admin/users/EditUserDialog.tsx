
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, User, AlertCircle } from "lucide-react";
import { User as UserType } from "@/types";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFormSchema, UserFormValues } from "./schemas/userFormSchema";
import UserFormFields from "./UserFormFields";
import UserFormHandler from "./UserFormHandler";

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
  // Configura react-hook-form con zodResolver
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
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
        
        {user && (
          <UserFormHandler
            user={user}
            onUserUpdated={onUserUpdated}
            onComplete={() => onOpenChange(false)}
          >
            {({ handleSubmit, loading, error }) => (
              <>
                {error && (
                  <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-800">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <UserFormFields form={form} />
                    
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
              </>
            )}
          </UserFormHandler>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
