
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon, UserPlus } from "lucide-react";
import { User } from "@/types";
import UsersTable from "./UsersTable";

interface DesktopUsersViewProps {
  users: User[];
  onToggleStatus: (userId: string, isActive: boolean) => void;
  onEditUser: (user: User) => void;
  onViewUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onAddUser: () => void;
}

const DesktopUsersView: React.FC<DesktopUsersViewProps> = ({
  users,
  onToggleStatus,
  onEditUser,
  onViewUser,
  onDeleteUser,
  onAddUser,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestione Utenti</h1>
          <p className="text-gray-600">
            Visualizza e gestisci gli utenti registrati sulla piattaforma.
          </p>
        </div>
        <Button onClick={onAddUser}>
          <UserPlus className="mr-2 h-5 w-5" /> Aggiungi Utente
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-primary" />
            Lista Utenti ({users.length})
          </CardTitle>
          <CardDescription>
            Elenco di tutti gli utenti registrati sulla piattaforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nessun utente trovato.</p>
              <Button onClick={onAddUser} className="mt-4">
                <UserPlus className="mr-2 h-5 w-5" /> Aggiungi il primo utente
              </Button>
            </div>
          ) : (
            <UsersTable 
              users={users}
              onToggleStatus={onToggleStatus}
              onEditUser={onEditUser}
              onViewUser={onViewUser}
              onDeleteUser={onDeleteUser}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default DesktopUsersView;
