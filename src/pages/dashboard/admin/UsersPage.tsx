
import React from "react";
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
import { getUsersByRole } from "@/data/mockData";
import { toast } from "sonner";
import { User, UserCheck, UserX } from "lucide-react";

const UsersPage = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const users = getUsersByRole("user");

  const handleToggleUserStatus = (userId: string, isActive: boolean) => {
    // Here would go the API call to toggle user status
    toast.success(`Stato dell'utente aggiornato con successo`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestione Utenti</h1>
      <p className="text-gray-600">
        Visualizza e gestisci gli utenti registrati sulla piattaforma.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Lista Utenti
          </CardTitle>
          <CardDescription>
            Elenco di tutti gli utenti registrati sulla piattaforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">ID</th>
                    <th className="px-4 py-3 text-left font-medium">Nome</th>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    <th className="px-4 py-3 text-left font-medium">Registrato il</th>
                    <th className="px-4 py-3 text-left font-medium">Stato</th>
                    <th className="px-4 py-3 text-right font-medium">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 text-left font-mono text-sm">{user.id.slice(0, 8)}</td>
                      <td className="px-4 py-3 text-left">{user.name}</td>
                      <td className="px-4 py-3 text-left">{user.email}</td>
                      <td className="px-4 py-3 text-left">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-left">
                        <Badge variant={user.isActive ? "success" : "destructive"}>
                          {user.isActive ? "Attivo" : "Inattivo"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleUserStatus(user.id, !user.isActive)}
                          >
                            {user.isActive ? (
                              <><UserX className="mr-1 h-4 w-4" /> Disattiva</>
                            ) : (
                              <><UserCheck className="mr-1 h-4 w-4" /> Attiva</>
                            )}
                          </Button>
                          <Button size="sm" variant="outline">
                            Visualizza
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

export default UsersPage;
