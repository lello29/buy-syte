
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ban, Trash2, CheckSquare } from 'lucide-react';
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
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: ''
  });

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setEditFormData({
      name: user.name,
      email: user.email
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSave = (userId: string) => {
    // This would be an API call in a real application
    toast.success('Modifiche salvate con successo');
    setEditingUserId(null);
  };

  const handleEditCancel = () => {
    setEditingUserId(null);
  };

  const handleToggleStatus = (userId: string, currentStatus: boolean) => {
    onToggleStatus(userId, !currentStatus);
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className="space-y-1">
      {users.map((user) => (
        <div key={user.id} className="border rounded-md overflow-hidden mb-4">
          {editingUserId === user.id ? (
            // Edit mode
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm text-gray-500">Nome</label>
                <input 
                  type="text" 
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditSave(user.id)}
                >
                  Salva
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleEditCancel}
                >
                  Annulla
                </Button>
              </div>
            </div>
          ) : (
            // View mode
            <>
              <div className="p-4" onClick={() => handleEditClick(user)}>
                <div className="text-xl font-semibold">{user.name}</div>
                <div className="text-gray-600">{user.email}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Registrato il {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex border-t">
                <Button 
                  variant="ghost" 
                  className={`flex-1 rounded-none h-12 ${!user.isActive ? 'text-green-600' : 'text-red-600'}`}
                  onClick={() => handleToggleStatus(user.id, user.isActive)}
                >
                  {user.isActive ? (
                    <>
                      <Ban className="h-5 w-5 mr-1" /> 
                      Disattiva
                    </>
                  ) : (
                    <>
                      <CheckSquare className="h-5 w-5 mr-1" /> 
                      Attivo
                    </>
                  )}
                </Button>
                <div className="w-px bg-gray-200"></div>
                <Button 
                  variant={user.isActive ? "ghost" : "default"}
                  className={`flex-1 rounded-none h-12 ${user.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}`}
                >
                  {user.isActive ? "Attivo" : "Disattiva"}
                </Button>
                <div className="w-px bg-gray-200"></div>
                <Button 
                  variant="ghost" 
                  className="flex-1 rounded-none h-12 text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(user.id)}
                >
                  Elimina
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileUsersList;
