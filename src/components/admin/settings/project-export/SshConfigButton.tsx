
import React from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSshConfig } from "@/utils/project-export/document-generators";
import { saveExportedDataToFile } from "@/utils/exportDatabase";
import { toast } from "sonner";

export function SshConfigButton() {
  const exportSshConfig = () => {
    try {
      const sshConfig = generateSshConfig();
      saveExportedDataToFile(sshConfig, "ssh_config");
      toast.success("Configurazione SSH esportata con successo!");
    } catch (error) {
      console.error("Errore durante l'esportazione della configurazione SSH:", error);
      toast.error("Errore durante l'esportazione della configurazione SSH");
    }
  };

  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-24 gap-2"
      onClick={exportSshConfig}
    >
      <KeyRound className="h-8 w-8 text-primary" />
      <span className="text-sm">SSH Config</span>
    </Button>
  );
}
