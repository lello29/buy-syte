
import React from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ShopDialogFooterProps {
  onCancel: () => void;
  onSave: () => void;
}

const ShopDialogFooter: React.FC<ShopDialogFooterProps> = ({
  onCancel,
  onSave
}) => {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onCancel}>
        Annulla
      </Button>
      <Button onClick={onSave}>
        Salva Modifiche
      </Button>
    </DialogFooter>
  );
};

export default ShopDialogFooter;
