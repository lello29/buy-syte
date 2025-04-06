
import React from "react";
import { Loader2 } from "lucide-react";

const UserLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-gray-600">Caricamento utenti in corso...</p>
    </div>
  );
};

export default UserLoadingState;
