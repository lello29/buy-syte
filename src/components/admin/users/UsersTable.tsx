
import React from "react";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserX, UserCheck, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UsersTableProps {
  users: User[];
  onToggleStatus: (userId: string, isActive: boolean) => void;
  onEditUser: (user: User) => void;
  onViewUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onToggleStatus,
  onEditUser,
  onViewUser,
  onDeleteUser,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Ruolo</TableHead>
          <TableHead>Registrato il</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead className="text-right">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-mono text-sm">{user.id.slice(0, 8)}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="capitalize">{user.role}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant={user.isActive ? "success" : "destructive"}>
                {user.isActive ? "Attivo" : "Inattivo"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onEditUser(user)}
                >
                  <Edit className="mr-1 h-4 w-4" /> Modifica
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onToggleStatus(user.id, !user.isActive)}
                >
                  {user.isActive ? (
                    <><UserX className="mr-1 h-4 w-4" /> Disattiva</>
                  ) : (
                    <><UserCheck className="mr-1 h-4 w-4" /> Attiva</>
                  )}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onViewUser(user)}
                >
                  Dettagli
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => onDeleteUser(user)}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Elimina
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
