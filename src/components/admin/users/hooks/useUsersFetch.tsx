
import { useState, useEffect } from "react";
import { User } from "@/types";
import { toast } from "sonner";
import { fetchUsers } from "@/services/user";

export const useUsersFetch = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const userData = await fetchUsers();
        if (userData) {
          setUsers(userData);
        }
      } catch (error) {
        console.error("Error loading users:", error);
        toast.error("Errore nel caricamento degli utenti");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return {
    users,
    setUsers,
    loading
  };
};
