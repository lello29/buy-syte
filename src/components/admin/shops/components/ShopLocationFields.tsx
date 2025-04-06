
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
  isLocating?: boolean;
}

const ShopLocationFields: React.FC<ShopLocationFieldsProps> = ({
  latitude,
  longitude,
  onShopChange,
  onGetLocation,
  isLocating = false
}) => {
  return (
    <div className="border p-4 rounded-md space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium">Posizione</h3>
        {onGetLocation && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={onGetLocation}
            disabled={isLocating}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {isLocating ? 'Rilevamento...' : 'Rileva posizione'}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="latitude">Latitudine</Label>
          <Input 
            id="latitude"
            name="latitude"
            type="number"
            step="0.000001"
            value={latitude || ''}
            onChange={onShopChange}
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <Label htmlFor="longitude">Longitudine</Label>
          <Input 
            id="longitude"
            name="longitude"
            type="number"
            step="0.000001"
            value={longitude || ''}
            onChange={onShopChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopLocationFields;
