
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Phone, Store } from "lucide-react";

interface SellingOptionsProps {
  sellingOptions: {
    isOnlinePurchase: boolean;
    isReservationOnly: boolean;
    isInStoreOnly: boolean;
  };
  updateSellingOptions: (newOptions: any) => void;
}

const SellingOptionsCard: React.FC<SellingOptionsProps> = ({ 
  sellingOptions, 
  updateSellingOptions 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Modalità di vendita</CardTitle>
        <CardDescription>
          Scegli come i clienti possono acquistare il prodotto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4" />
            <Label htmlFor="online-purchase">Acquisto online</Label>
          </div>
          <Switch
            id="online-purchase"
            checked={sellingOptions.isOnlinePurchase}
            onCheckedChange={(checked) => updateSellingOptions({ isOnlinePurchase: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <Label htmlFor="reservation-only">Solo prenotazione</Label>
          </div>
          <Switch
            id="reservation-only"
            checked={sellingOptions.isReservationOnly}
            onCheckedChange={(checked) => updateSellingOptions({ isReservationOnly: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Store className="h-4 w-4" />
            <Label htmlFor="in-store-only">Solo vendita in negozio</Label>
          </div>
          <Switch
            id="in-store-only"
            checked={sellingOptions.isInStoreOnly}
            onCheckedChange={(checked) => updateSellingOptions({ isInStoreOnly: checked })}
          />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Puoi attivare più modalità contemporaneamente
        </p>
      </CardFooter>
    </Card>
  );
};

export default SellingOptionsCard;
