
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface ShopLocationFieldsProps {
  latitude?: number;
  longitude?: number;
  onShopChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetLocation?: () => void;
}

const ShopLocationFields: React.FC<ShopLocationFieldsProps> = ({
  latitude,
  longitude,
  onShopChange,
  onGetLocation
}) => {
  return (
    <div className="space-y-1">
      <Label>Posizione Geografica</Label>
      <div className="grid grid-cols-3 gap-2">
        <Button 
          type="button" 
          variant="outline" 
          className="col-span-1"
          onClick={onGetLocation}
        >
          <MapPin className="h-4 w-4 mr-1" /> Rileva
        </Button>
        <div className="col-span-1">
          <Input
            name="latitude"
            placeholder="Latitudine"
            type="number"
            step="0.000001"
            value={latitude || ""}
            onChange={onShopChange}
          />
        </div>
        <div className="col-span-1">
          <Input
            name="longitude"
            placeholder="Longitudine"
            type="number"
            step="0.000001"
            value={longitude || ""}
            onChange={onShopChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopLocationFields;
