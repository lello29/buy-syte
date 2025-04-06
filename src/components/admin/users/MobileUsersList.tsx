
import React from 'react';
import { Button } from '@/components/ui/button';
import { Ban, Trash2, UserPlus, Edit } from 'lucide-react';
import { User } from '@/types';
import { toast } from 'sonner';

interface MobileUsersListProps {
  users: User[];
  onToggleStatus: (userId: string, isActive: boolean) => void;
  onDeleteUser: (userId: string) => void;
  onAddUser: () => void;
  onEditUser: (user: User) => void;
}

const MobileUsersList: React.FC<MobileUsersListProps> = ({ 
  users, 
  onToggleStatus, 
  onDeleteUser,
  onAddUser,
  onEditUser
}) => {
  const handleDelete = (userId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        className="w-full bg-[#0a3276] hover:bg-[#0a3276]/90 text-white font-bold py-3 rounded-md flex items-center justify-center"
        onClick={onAddUser}
      >
        <UserPlus className="h-5 w-5 mr-2" />
        Aggiungi nuovo utente
      </Button>
      
      <div className="space-y-1">
        {users.map((user) => (
          <div key={user.id} className="border rounded-md overflow-hidden mb-4 bg-white">
            <div className="p-4">
              <div className="text-2xl font-bold">{user.name}</div>
              <div className="text-gray-800">{user.email}</div>
              <div className="text-sm text-gray-600 mt-1 capitalize">
                Ruolo: {user.role}
              </div>
              {user.fiscalCode && (
                <div className="text-sm text-gray-600 mt-1">
                  Codice Fiscale: {user.fiscalCode}
                </div>
              )}
              {user.vatNumber && (
                <div className="text-sm text-gray-600 mt-1">
                  Partita IVA: {user.vatNumber}
                </div>
              )}
              <div className="text-sm text-gray-500 mt-1">
                Registrato il {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex flex-wrap border-t">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-gray-700 hover:bg-gray-100"
                onClick={() => onToggleStatus(user.id, !user.isActive)}
              >
                <Ban className="h-5 w-5 mr-1" /> 
                {user.isActive ? "Disattiva" : "Attiva"}
              </Button>
              <Button 
                variant="ghost"
                className={`flex-1 rounded-none h-12 ${user.isActive ? "text-green-700 bg-green-100 hover:bg-green-200" : "text-red-700 bg-red-100 hover:bg-red-200"}`}
              >
                {user.isActive ? "Attivo" : "Inattivo"}
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-blue-600 hover:bg-blue-50"
                onClick={() => onEditUser(user)}
              >
                <Edit className="h-5 w-5 mr-1" />
                Modifica
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-red-600 hover:bg-red-50"
                onClick={() => handleDelete(user.id)}
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

export default MobileUsersList;
