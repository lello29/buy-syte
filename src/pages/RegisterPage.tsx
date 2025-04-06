
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, Loader2, ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";

const RegisterPage = () => {
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
    if (!name.trim()) {
      toast.error("Inserisci il tuo nome completo");
      return false;
    }
    
    if (!email.trim() || !email.includes('@')) {
      toast.error("Inserisci un indirizzo email valido");
      return false;
    }
    
    if (password !== confirmPassword) {
      setPasswordError("Le password non corrispondono");
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError("La password deve contenere almeno 6 caratteri");
      return false;
    }
    
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      console.log("Attempting to register user:", { name, email });
      const success = await register(name, email, password);
      
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Store className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Crea un account</CardTitle>
          <CardDescription className="text-center">
            Inserisci i tuoi dati per creare un account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Mario Rossi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
              />
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
            
            <Collapsible
              open={showBusinessFields}
              onOpenChange={setShowBusinessFields}
              className="border rounded-md p-2"
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
                  />
                  <p className="text-xs text-gray-500">
                    Obbligatorio solo per i negozianti
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Registrati
            </Button>
            <div className="text-center text-sm">
              Hai già un account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Accedi
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
