
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Ban, Trash2, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collaborator } from '@/types';

export interface MobileCollaboratorsListProps {
  collaborators: Collaborator[];
  onViewCollaborator: (collaborator: Collaborator) => void;
  onToggleStatus: (collaboratorId: string, isActive: boolean) => void;
  onDeleteCollaborator: (collaboratorId: string) => void;
  onAddCollaborator: () => void;
}

const MobileCollaboratorsList: React.FC<MobileCollaboratorsListProps> = ({ 
  collaborators, 
  onViewCollaborator, 
  onToggleStatus,
  onDeleteCollaborator,
  onAddCollaborator
}) => {
  return (
    <div className="space-y-4">
      <Button 
        className="w-full bg-[#0a3276] hover:bg-[#0a3276]/90 text-white font-bold py-3 rounded-md flex items-center justify-center"
        onClick={onAddCollaborator}
      >
        <UserPlus className="h-5 w-5 mr-2" />
        Aggiungi nuovo collaboratore
      </Button>
      
      <div className="space-y-1">
        {collaborators.map((collaborator) => (
          <div key={collaborator.id} className="border rounded-md overflow-hidden mb-4 bg-white">
            <div className="p-4">
              <div className="text-2xl font-bold">{collaborator.name}</div>
              <div className="text-gray-800">{collaborator.email}</div>
              <div className="text-sm text-gray-500 mt-1">
                Area: {collaborator.coverageArea}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <Badge variant={collaborator.isActive ? "success" : "destructive"}>
                  {collaborator.isActive ? "Attivo" : "Inattivo"}
                </Badge>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-medium">{collaborator.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="flex border-t">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-gray-700 hover:bg-gray-100"
                onClick={() => onToggleStatus(collaborator.id, !collaborator.isActive)}
              >
                <Ban className="h-5 w-5 mr-1" /> 
                {collaborator.isActive ? "Disattiva" : "Attiva"}
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-blue-700 hover:bg-blue-50"
                onClick={() => onViewCollaborator(collaborator)}
              >
                <Eye className="h-5 w-5 mr-1" />
                Dettagli
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-red-600 hover:bg-red-50"
                onClick={() => onDeleteCollaborator(collaborator.id)}
              >
                <Trash2 className="h-5 w-5 mr-1" />
                Elimina
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCollaboratorsList;
