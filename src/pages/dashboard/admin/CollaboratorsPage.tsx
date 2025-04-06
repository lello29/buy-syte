
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
import { User, UserCheck, UserX, Star, Eye, Trash2, MapPin, Clock, Phone } from "lucide-react";
import { collaborators } from "@/data/mockData";
import { Collaborator } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCollaboratorsList from "@/components/admin/collaborators/MobileCollaboratorsList";

const CollaboratorsPage = () => {
  const { currentUser } = useAuth();
  const [collaboratorsList, setCollaboratorsList] = useState(collaborators);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleToggleStatus = (id: string, isActive: boolean) => {
    const updatedCollaborators = collaboratorsList.map(collab => 
      collab.id === id ? { ...collab, isActive: isActive } : collab
    );
    setCollaboratorsList(updatedCollaborators);
    toast.success(`Stato del collaboratore aggiornato con successo`);
  };

  const handleDeleteCollaborator = (id: string) => {
    const updatedCollaborators = collaboratorsList.filter(collab => collab.id !== id);
    setCollaboratorsList(updatedCollaborators);
    setIsDeleteDialogOpen(false);
    setSelectedCollaborator(null);
    toast.success(`Collaboratore eliminato con successo`);
  };

  const openViewDialog = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsDeleteDialogOpen(true);
  };

  const handleAddCollaborator = () => {
    toast.info("Funzionalità di aggiunta collaboratore non ancora implementata");
  };

  const filteredCollaborators = statusFilter === "all"
    ? collaboratorsList
    : collaboratorsList.filter(collab => 
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

      {isMobile ? (
        <MobileCollaboratorsList 
          collaborators={filteredCollaborators}
          onViewCollaborator={openViewDialog}
          onToggleStatus={handleToggleStatus}
          onDeleteCollaborator={handleDeleteCollaborator}
          onAddCollaborator={handleAddCollaborator}
        />
      ) : (
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Area di Copertura</TableHead>
                    <TableHead>Valutazione</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCollaborators.map((collaborator) => (
                    <TableRow key={collaborator.id}>
                      <TableCell>{collaborator.name}</TableCell>
                      <TableCell>{collaborator.email}</TableCell>
                      <TableCell>{collaborator.coverageArea}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {collaborator.rating.toFixed(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={collaborator.isActive ? "success" : "destructive"}>
                          {collaborator.isActive ? "Attivo" : "Inattivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openViewDialog(collaborator)}
                          >
                            <Eye className="mr-1 h-4 w-4" /> Dettagli
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:bg-red-100"
                            onClick={() => openDeleteDialog(collaborator)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" /> Elimina
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Collaborator Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Dettagli Collaboratore
            </DialogTitle>
            <DialogDescription>
              Informazioni dettagliate sul collaboratore
            </DialogDescription>
          </DialogHeader>
          {selectedCollaborator && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="font-mono">{selectedCollaborator.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Stato</p>
                  <Badge variant={selectedCollaborator.isActive ? "success" : "destructive"}>
                    {selectedCollaborator.isActive ? "Attivo" : "Inattivo"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p>{selectedCollaborator.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedCollaborator.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Telefono</p>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1 text-gray-600" />
                    <span>{selectedCollaborator.phone}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Valutazione</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>{selectedCollaborator.rating.toFixed(1)} ({selectedCollaborator.completedTasks} incarichi completati)</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Area di Copertura</p>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-600" />
                    <span>{selectedCollaborator.coverageArea}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Disponibilità</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-600" />
                    <span>{selectedCollaborator.availability}</span>
                  </div>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-sm font-medium text-gray-500">Data di registrazione</p>
                  <p>{new Date(selectedCollaborator.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Statistiche</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Incarichi completati:</strong> {selectedCollaborator.completedTasks}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Valutazione media:</strong> {selectedCollaborator.rating.toFixed(1)} / 5
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Chiudi
                </Button>
                <Button 
                  variant={selectedCollaborator.isActive ? "outline" : "default"}
                  className={selectedCollaborator.isActive ? "text-red-600 hover:bg-red-100" : ""}
                  onClick={() => {
                    handleToggleStatus(selectedCollaborator.id, !selectedCollaborator.isActive);
                    setIsViewDialogOpen(false);
                  }}
                >
                  {selectedCollaborator.isActive ? (
                    <><UserX className="mr-1 h-4 w-4" /> Disattiva</>
                  ) : (
                    <><UserCheck className="mr-1 h-4 w-4" /> Attiva</>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    openDeleteDialog(selectedCollaborator);
                  }}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Elimina
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Collaborator Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Conferma Eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare questo collaboratore? Questa azione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          {selectedCollaborator && (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-sm"><strong>Nome:</strong> {selectedCollaborator.name}</p>
                <p className="text-sm"><strong>Email:</strong> {selectedCollaborator.email}</p>
                <p className="text-sm"><strong>Area di Copertura:</strong> {selectedCollaborator.coverageArea}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Annulla
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDeleteCollaborator(selectedCollaborator.id)}
                >
                  Elimina Collaboratore
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollaboratorsPage;
