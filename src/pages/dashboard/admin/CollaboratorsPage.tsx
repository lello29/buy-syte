
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { User, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { collaborators } from "@/data/collaborators";
import { Collaborator } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCollaboratorsList from "@/components/admin/collaborators/MobileCollaboratorsList";
import CollaboratorsFilter, { CollaboratorStatusFilter } from "@/components/admin/collaborators/CollaboratorsFilter";
import CollaboratorsTable from "@/components/admin/collaborators/CollaboratorsTable";
import ViewCollaboratorDialog from "@/components/admin/collaborators/ViewCollaboratorDialog";
import DeleteCollaboratorDialog from "@/components/admin/collaborators/DeleteCollaboratorDialog";
import { Button } from "@/components/ui/button";

interface CollaboratorsPageState {
  collaboratorsList: Collaborator[];
  statusFilter: CollaboratorStatusFilter;
  selectedCollaborator: Collaborator | null;
  isViewDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isDeletingAll: boolean;
}

const CollaboratorsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [state, setState] = useState<CollaboratorsPageState>({
    collaboratorsList: collaborators,
    statusFilter: "all",
    selectedCollaborator: null,
    isViewDialogOpen: false,
    isDeleteDialogOpen: false,
    isDeletingAll: false
  });
  
  const { 
    collaboratorsList, 
    statusFilter, 
    selectedCollaborator, 
    isViewDialogOpen, 
    isDeleteDialogOpen,
    isDeletingAll
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

  const handleDeleteAllCollaborators = (): void => {
    setState(prev => ({ ...prev, isDeletingAll: true }));
    
    // Simulate deletion with a short delay
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        collaboratorsList: [],
        isDeletingAll: false
      }));
      toast.success(`Tutti i collaboratori sono stati eliminati con successo`);
    }, 1000);
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestione Collaboratori</h1>
          <p className="text-gray-600">
            Visualizza e gestisci i collaboratori registrati sulla piattaforma.
          </p>
        </div>
        
        <Button 
          variant="destructive"
          onClick={handleDeleteAllCollaborators}
          disabled={isDeletingAll || collaboratorsList.length === 0}
        >
          {isDeletingAll ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Eliminazione in corso...
            </>
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" />
              Elimina Tutti i Collaboratori
            </>
          )}
        </Button>
      </div>

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
            {filteredCollaborators.length > 0 ? (
              <CollaboratorsTable 
                collaborators={filteredCollaborators}
                onViewCollaborator={openViewDialog}
                onToggleStatus={handleToggleStatus}
                onDeleteCollaborator={openDeleteDialog}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg space-y-4">
                <p className="text-muted-foreground">Nessun collaboratore trovato.</p>
              </div>
            )}
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
