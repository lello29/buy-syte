
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Loader2 } from "lucide-react";

const ConvertToCollaboratorPage = () => {
  const { currentUser, updateUserRole } = useAuth();
  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState("");
  const [coverageArea, setCoverageArea] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    return <div>Caricamento...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would create a collaborator profile in the database
    updateUserRole("collaborator");
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Diventa un Collaboratore</h1>
      <p className="text-gray-600 mb-8">
        Compila il form sottostante per convertire il tuo profilo in un account collaboratore e
        iniziare ad aiutare i negozi locali con consegne e servizi.
      </p>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle>Informazioni Collaboratore</CardTitle>
          </div>
          <CardDescription>
            Inserisci i tuoi dati per diventare collaboratore
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={currentUser.email}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input
                  id="phone"
                  placeholder="Es. +39 333 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverageArea">Area di Copertura</Label>
              <Textarea
                id="coverageArea"
                placeholder="Es. Milano Centro, Milano Nord, Monza"
                value={coverageArea}
                onChange={(e) => setCoverageArea(e.target.value)}
                required
                rows={2}
              />
              <p className="text-sm text-gray-500">
                Indica le zone in cui sei disponibile a effettuare servizi.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Disponibilità</Label>
              <div className="grid grid-cols-2 gap-4">
                <Select onValueChange={(value) => setAvailability(value)} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Giorni" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lun-ven">Lunedì - Venerdì</SelectItem>
                    <SelectItem value="lun-sab">Lunedì - Sabato</SelectItem>
                    <SelectItem value="weekend">Solo Weekend</SelectItem>
                    <SelectItem value="tutti-giorni">Tutti i giorni</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="Es. 9:00-18:00" 
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Competenze</Label>
              <Textarea
                id="skills"
                placeholder="Es. Consegne, Inventario, Assistenza Clienti, Fotografia..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-200">
              <p className="font-medium mb-2">Vantaggi dell'account collaboratore:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Trova incarichi presso negozi locali</li>
                <li>Gestisci la tua disponibilità</li>
                <li>Costruisci la tua reputazione</li>
                <li>Guadagna in base agli incarichi completati</li>
                <li>Nessun vincolo di orario: lavora quando vuoi</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Converti in Account Collaboratore
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ConvertToCollaboratorPage;
