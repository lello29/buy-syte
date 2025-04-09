
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ShopFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isCreating?: boolean;
}

const ShopFormActions: React.FC<ShopFormActionsProps> = ({
  isSubmitting,
  onCancel,
  isCreating = true
}) => {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Annulla
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvataggio...
          </>
        ) : (
          isCreating ? 'Crea Negozio' : 'Salva Modifiche'
        )}
      </Button>
    </>
  );
};

export default ShopFormActions;
