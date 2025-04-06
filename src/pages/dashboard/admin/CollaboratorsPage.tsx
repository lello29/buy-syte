
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
import CollaboratorsFilter, { CollaboratorStatusFilter } from "@/components/admin/collaborators/CollaboratorsFilter";
import CollaboratorsTable from "@/components/admin/collaborators/CollaboratorsTable";
import ViewCollaboratorDialog from "@/components/admin/collaborators/ViewCollaboratorDialog";
import DeleteCollaboratorDialog from "@/components/admin/collaborators/DeleteCollaboratorDialog";

interface CollaboratorsPageState {
  collaboratorsList: Collaborator[];
  statusFilter: CollaboratorStatusFilter;
  selectedCollaborator: Collaborator | null;
  isViewDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
}

const CollaboratorsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [state, setState] = useState<CollaboratorsPageState>({
    collaboratorsList: collaborators,
    statusFilter: "all",
    selectedCollaborator: null,
    isViewDialogOpen: false,
    isDeleteDialogOpen: false
  });
  
  const { 
    collaboratorsList, 
    statusFilter, 
    selectedCollaborator, 
    isViewDialogOpen, 
    isDeleteDialogOpen 
  } = state;
  
  const isMobile = useIsMobile();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleToggleStatus = (id: string, isActive: boolean): void => {
    const updatedCollaborators = collaboratorsList.map(collab => 
      collab.id === id ? { ...collab, isActive: isActive } : collab
    );
    setState(prev => ({ ...prev, collaboratorsList: updatedCollaborators }));
    toast.success(`Stato del collaboratore aggiornato con successo`);
  };

  const handleDeleteCollaborator = (id: string): void => {
    const updatedCollaborators = collaboratorsList.filter(collab => collab.id !== id);
    setState(prev => ({
      ...prev,
      collaboratorsList: updatedCollaborators,
      isDeleteDialogOpen: false,
      selectedCollaborator: null
    }));
    toast.success(`Collaboratore eliminato con successo`);
  };

  const openViewDialog = (collaborator: Collaborator): void => {
    setState(prev => ({
      ...prev,
      selectedCollaborator: collaborator,
      isViewDialogOpen: true
    }));
  };

  const openDeleteDialog = (collaborator: Collaborator): void => {
    setState(prev => ({
      ...prev,
      selectedCollaborator: collaborator,
      isDeleteDialogOpen: true
    }));
  };

  const handleAddCollaborator = (): void => {
    toast.info("Funzionalità di aggiunta collaboratore non ancora implementata");
  };

  const handleFilterChange = (filter: CollaboratorStatusFilter): void => {
    setState(prev => ({ ...prev, statusFilter: filter }));
  };

  const setIsViewDialogOpen = (open: boolean): void => {
    setState(prev => ({ ...prev, isViewDialogOpen: open }));
  };

  const setIsDeleteDialogOpen = (open: boolean): void => {
    setState(prev => ({ ...prev, isDeleteDialogOpen: open }));
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
        onFilterChange={handleFilterChange} 
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
