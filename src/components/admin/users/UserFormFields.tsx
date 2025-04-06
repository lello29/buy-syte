
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { UserFormValues } from "./schemas/userFormSchema";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield } from "lucide-react";

interface UserFormFieldsProps {
  form: UseFormReturn<UserFormValues>;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-4 py-2">
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
    </div>
  );
};

export default UserFormFields;
