
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, UserCheck, UserX, Star } from "lucide-react";
import { collaborators } from "@/data/mockData";

const CollaboratorsPage = () => {
  const { currentUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleToggleStatus = (id: string, isActive: boolean) => {
    toast.success(`Stato del collaboratore aggiornato con successo`);
  };

  const filteredCollaborators = statusFilter === "all"
    ? collaborators
    : collaborators.filter(collab => 
        statusFilter === "active" ? collab.isActive : !collab.isActive
      );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestione Collaboratori</h1>
      <p className="text-gray-600">
        Visualizza e gestisci i collaboratori registrati sulla piattaforma.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          variant={statusFilter === "all" ? "default" : "outline"} 
          onClick={() => setStatusFilter("all")}
        >
          Tutti
        </Button>
        <Button 
          variant={statusFilter === "active" ? "default" : "outline"} 
          onClick={() => setStatusFilter("active")}
        >
          Attivi
        </Button>
        <Button 
          variant={statusFilter === "inactive" ? "default" : "outline"} 
          onClick={() => setStatusFilter("inactive")}
        >
          Inattivi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Lista Collaboratori
          </CardTitle>
          <CardDescription>
            Elenco di tutti i collaboratori registrati sulla piattaforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Nome</th>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    <th className="px-4 py-3 text-left font-medium">Area di Copertura</th>
                    <th className="px-4 py-3 text-left font-medium">Valutazione</th>
                    <th className="px-4 py-3 text-left font-medium">Stato</th>
                    <th className="px-4 py-3 text-right font-medium">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredCollaborators.map((collaborator) => (
                    <tr key={collaborator.id}>
                      <td className="px-4 py-3 text-left">{collaborator.name}</td>
                      <td className="px-4 py-3 text-left">{collaborator.email}</td>
                      <td className="px-4 py-3 text-left">{collaborator.coverageArea}</td>
                      <td className="px-4 py-3 text-left">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {collaborator.rating.toFixed(1)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-left">
                        <Badge variant={collaborator.isActive ? "success" : "destructive"}>
                          {collaborator.isActive ? "Attivo" : "Inattivo"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleStatus(collaborator.id, !collaborator.isActive)}
                          >
                            {collaborator.isActive ? (
                              <><UserX className="mr-1 h-4 w-4" /> Disattiva</>
                            ) : (
                              <><UserCheck className="mr-1 h-4 w-4" /> Attiva</>
                            )}
                          </Button>
                          <Button size="sm" variant="outline">
                            Dettagli
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaboratorsPage;
