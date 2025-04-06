
import React from 'react';
import { Button } from '@/components/ui/button';
import { Ban, Trash2 } from 'lucide-react';
import { User } from '@/types';
import { toast } from 'sonner';

interface MobileUsersListProps {
  users: User[];
  onToggleStatus: (userId: string, isActive: boolean) => void;
  onDeleteUser: (userId: string) => void;
}

const MobileUsersList: React.FC<MobileUsersListProps> = ({ 
  users, 
  onToggleStatus, 
  onDeleteUser 
}) => {
  const handleDelete = (userId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className="space-y-1">
      {users.map((user) => (
        <div key={user.id} className="border rounded-md overflow-hidden mb-4 bg-white">
          <div className="p-4">
            <div className="text-2xl font-bold">{user.name}</div>
            <div className="text-gray-800">{user.email}</div>
            <div className="text-sm text-gray-500 mt-1">
              Registrato il {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex border-t">
            <Button 
              variant="ghost" 
              className="flex-1 rounded-none h-12 text-gray-700 hover:bg-gray-100"
              onClick={() => onToggleStatus(user.id, !user.isActive)}
            >
              <Ban className="h-5 w-5 mr-1" /> 
              Disattiva
            </Button>
            <Button 
              variant="ghost"
              className="flex-1 rounded-none h-12 text-green-700 bg-green-100 hover:bg-green-200"
            >
              Attivo
            </Button>
            <Button 
              variant="ghost" 
              className="flex-1 rounded-none h-12 text-red-600 hover:bg-red-50"
              onClick={() => handleDelete(user.id)}
            >
              Elimina
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileUsersList;
