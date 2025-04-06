
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
import { Loader2, User, Mail, Shield } from "lucide-react";
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
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: UserRole;
    password: string;
    fiscalCode: string;
    vatNumber: string;
  }>({
    name: "",
    email: "",
    role: "user",
    password: "",
    fiscalCode: "",
    vatNumber: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        password: "",
        fiscalCode: user.fiscalCode || "",
        vatNumber: user.vatNumber || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const updateData: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        fiscal_code: formData.fiscalCode,
        vat_number: formData.vatNumber,
        updated_at: new Date().toISOString(),
      };
      
      // Only include password if it was changed
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      if (isSupabaseConfigured) {
        // Update user in Supabase
        const { error } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', user.id);
          
        if (error) {
          console.error("Error updating user:", error.message);
          toast.error("Errore durante l'aggiornamento dell'utente");
          return;
        }
      }
      
      // Create updated user object
      const updatedUser: UserType = {
        ...user,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        fiscalCode: formData.fiscalCode,
        vatNumber: formData.vatNumber,
        updatedAt: new Date().toISOString(),
      };
      
      // Call the callback with the updated user
      onUserUpdated(updatedUser);
      onOpenChange(false);
      toast.success("Utente aggiornato con successo");
    } catch (error) {
      console.error("Error updating user:", error);
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
        
        {user && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <div className="flex items-center border rounded-md">
                <User className="mx-2 h-4 w-4 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Nome utente"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center border rounded-md">
                <Mail className="mx-2 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Email utente"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Ruolo</Label>
              <div className="flex items-center border rounded-md">
                <Shield className="mx-2 h-4 w-4 text-gray-500" />
                <Select value={formData.role} onValueChange={handleRoleChange}>
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
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">
                Nuova Password <span className="text-gray-400 text-xs">(Lascia vuoto per mantenere la stessa)</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nuova password"
              />
            </div>
            
            <div className="pt-2 border-t mt-4">
              <Label className="text-sm font-medium text-gray-500 mb-2 block">
                Informazioni Aziendali (opzionali)
              </Label>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fiscalCode">Codice Fiscale</Label>
                  <Input
                    id="fiscalCode"
                    name="fiscalCode"
                    value={formData.fiscalCode}
                    onChange={handleInputChange}
                    placeholder="Codice fiscale"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatNumber">Partita IVA</Label>
                  <Input
                    id="vatNumber"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                    placeholder="Partita IVA"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salva modifiche
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
