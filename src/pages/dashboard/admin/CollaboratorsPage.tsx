
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";
import { toast } from "sonner";
import { collaborators } from "@/data/mockData";
import { Collaborator } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCollaboratorsList from "@/components/admin/collaborators/MobileCollaboratorsList";
import CollaboratorsFilter from "@/components/admin/collaborators/CollaboratorsFilter";
import CollaboratorsTable from "@/components/admin/collaborators/CollaboratorsTable";
import ViewCollaboratorDialog from "@/components/admin/collaborators/ViewCollaboratorDialog";
import DeleteCollaboratorDialog from "@/components/admin/collaborators/DeleteCollaboratorDialog";

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

      <CollaboratorsFilter 
        statusFilter={statusFilter} 
        onFilterChange={setStatusFilter} 
      />

      {isMobile ? (
        <MobileCollaboratorsList 
          collaborators={filteredCollaborators}
          onViewCollaborator={openViewDialog}
          onToggleStatus={handleToggleStatus}
          onDeleteCollaborator={id => {
            const collaborator = collaboratorsList.find(c => c.id === id);
            if (collaborator) openDeleteDialog(collaborator);
          }}
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
            <CollaboratorsTable 
              collaborators={filteredCollaborators}
              onViewCollaborator={openViewDialog}
              onToggleStatus={handleToggleStatus}
              onDeleteCollaborator={openDeleteDialog}
            />
          </CardContent>
        </Card>
      )}

      {/* View Collaborator Details Dialog */}
      <ViewCollaboratorDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        collaborator={selectedCollaborator}
        onToggleStatus={handleToggleStatus}
        onDelete={openDeleteDialog}
      />

      {/* Delete Collaborator Confirmation Dialog */}
      <DeleteCollaboratorDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        collaborator={selectedCollaborator}
        onConfirmDelete={handleDeleteCollaborator}
      />
    </div>
  );
};

export default CollaboratorsPage;
