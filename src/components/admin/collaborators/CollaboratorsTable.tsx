
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Eye, Trash2, UserX, UserCheck } from "lucide-react";
import { Collaborator } from "@/types";

export interface CollaboratorsTableProps {
  collaborators: Collaborator[];
  onViewCollaborator: (collaborator: Collaborator) => void;
  onToggleStatus: (collaboratorId: string, isActive: boolean) => void;
  onDeleteCollaborator: (collaborator: Collaborator) => void;
}

const CollaboratorsTable: React.FC<CollaboratorsTableProps> = ({
  collaborators,
  onViewCollaborator,
  onToggleStatus,
  onDeleteCollaborator,
}) => {
  return (
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
          {collaborators.map((collaborator) => (
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
                    onClick={() => onToggleStatus(collaborator.id, !collaborator.isActive)}
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
                    onClick={() => onViewCollaborator(collaborator)}
                  >
                    <Eye className="mr-1 h-4 w-4" /> Dettagli
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 hover:bg-red-100"
                    onClick={() => onDeleteCollaborator(collaborator)}
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
  );
};

export default CollaboratorsTable;
