
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LocationCardProps {
  location: string;
  handleLocationChange: (value: string) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, handleLocationChange }) => {
  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle>Posizione prodotto</CardTitle>
        <CardDescription>
          Seleziona in quale negozio o sede è disponibile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={location} onValueChange={handleLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Seleziona sede" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sede-principale">Sede principale</SelectItem>
            <SelectItem value="sede-secondaria">Sede secondaria</SelectItem>
            <SelectItem value="magazzino">Solo magazzino</SelectItem>
            <SelectItem value="tutte">Tutte le sedi</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
