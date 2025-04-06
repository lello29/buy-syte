
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import DatePicker from "./DatePicker";

interface AdvancedTabProps {
  publicationDate: Date | undefined;
  expirationDate: Date | undefined;
  handlePublicationDateChange: (date: Date | undefined) => void;
  handleExpirationDateChange: (date: Date | undefined) => void;
  updateData: (data: any) => void;
}

const AdvancedTab: React.FC<AdvancedTabProps> = ({
  publicationDate,
  expirationDate,
  handlePublicationDateChange,
  handleExpirationDateChange,
  updateData
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programmazione</CardTitle>
        <CardDescription>
          Imposta quando il prodotto sarà visibile o nascosto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            id="publish-date"
            label="Data di pubblicazione"
            date={publicationDate}
            onDateChange={handlePublicationDateChange}
          />

          <DatePicker
            id="expiry-date"
            label="Data di scadenza"
            date={expirationDate}
            onDateChange={handleExpirationDateChange}
          />
        </div>

        <div className="pt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              handlePublicationDateChange(undefined);
              handleExpirationDateChange(undefined);
              updateData({ publicationDate: null, expirationDate: null });
              toast.info("Date di programmazione rimosse");
            }}
          >
            Rimuovi programmazione
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedTab;
