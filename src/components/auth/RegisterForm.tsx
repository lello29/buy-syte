
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Inserisci il tuo nome completo"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  password: z.string().min(6, "La password deve contenere almeno 6 caratteri"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Le password non corrispondono",
  path: ["confirmPassword"]
});

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fiscalCode, setFiscalCode] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showBusinessFields, setShowBusinessFields] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    try {
      registerSchema.parse({
        name,
        email,
        password,
        confirmPassword
      });
      setPasswordError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        
        if (formattedErrors.name?._errors) {
          toast.error(formattedErrors.name._errors[0]);
        } else if (formattedErrors.email?._errors) {
          toast.error(formattedErrors.email._errors[0]);
        } else if (formattedErrors.password?._errors) {
          setPasswordError(formattedErrors.password._errors[0]);
          toast.error(formattedErrors.password._errors[0]);
        } else if (formattedErrors.confirmPassword?._errors) {
          setPasswordError(formattedErrors.confirmPassword._errors[0]);
          toast.error(formattedErrors.confirmPassword._errors[0]);
        }
      } else {
        toast.error("Si è verificato un errore durante la validazione del form");
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      console.log("Attempting to register user:", { name, email });
      // Passa anche i campi opzionali se sono stati compilati
      const userData = {
        fiscalCode: showBusinessFields && fiscalCode ? fiscalCode : undefined,
        vatNumber: showBusinessFields && vatNumber ? vatNumber : undefined
      };
      
      const success = await register(name, email, password, userData);
      
      if (success) {
        console.log("Registration successful, redirecting to dashboard");
        toast.success(`Benvenuto, ${name}! Registrazione completata.`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Si è verificato un errore durante la registrazione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            placeholder="Mario Rossi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nome@esempio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Conferma Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError("");
            }}
            required
            className="w-full"
          />
          {passwordError && (
            <p className="text-sm text-red-500 mt-1">{passwordError}</p>
          )}
        </div>
        
        <Collapsible
          open={showBusinessFields}
          onOpenChange={setShowBusinessFields}
          className="border rounded-md p-2 mt-4"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer p-2">
              <p className="text-sm font-medium">Informazioni Aziendali (opzionali)</p>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-3">
            <div className="space-y-2">
              <Label htmlFor="fiscalCode">Codice Fiscale</Label>
              <Input
                id="fiscalCode"
                placeholder="Inserisci il codice fiscale"
                value={fiscalCode}
                onChange={(e) => setFiscalCode(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Obbligatorio solo per i negozianti
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vatNumber">Partita IVA</Label>
              <Input
                id="vatNumber"
                placeholder="Inserisci la partita IVA"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Obbligatorio solo per i negozianti
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className="flex flex-col space-y-4 mt-6">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Registrati
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
