
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, UserPlus, Phone, Mail } from 'lucide-react';
import { Customer } from '@/pages/dashboard/shop/customers/types';

interface MobileCustomersListProps {
  customers: Customer[];
  onAddCustomer: () => void;
  onEditCustomer?: (customer: Customer) => void;
  onDeleteCustomer?: (customerId: string) => void;
}

const MobileCustomersList: React.FC<MobileCustomersListProps> = ({ 
  customers, 
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer
}) => {
  const handleDelete = (customerId: string) => {
    if (onDeleteCustomer && window.confirm('Sei sicuro di voler eliminare questo cliente?')) {
      onDeleteCustomer(customerId);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        className="w-full bg-[#0a3276] hover:bg-[#0a3276]/90 text-white font-bold py-3 rounded-md flex items-center justify-center"
        onClick={onAddCustomer}
      >
        <UserPlus className="h-5 w-5 mr-2" />
        Aggiungi nuovo cliente
      </Button>
      
      <div className="space-y-1">
        {customers.map((customer) => (
          <div key={customer.id} className="border rounded-md overflow-hidden mb-4 bg-white">
            <div className="p-4">
              <div className="text-2xl font-bold">{customer.name}</div>
              
              {customer.email && (
                <div className="flex items-center text-gray-800 mt-1">
                  <Mail className="h-4 w-4 mr-1 text-gray-500" />
                  {customer.email}
                </div>
              )}
              
              {customer.phone && (
                <div className="flex items-center text-gray-800 mt-1">
                  <Phone className="h-4 w-4 mr-1 text-gray-500" />
                  {customer.phone}
                </div>
              )}
              
              <div className="text-sm text-gray-500 mt-1">
                Ordini: {customer.orderCount || 0}
              </div>
              
              <div className="text-sm text-gray-500 mt-1">
                Totale speso: €{customer.totalSpent?.toFixed(2) || '0.00'}
              </div>
              
              {customer.lastOrderDate && (
                <div className="text-sm text-gray-500 mt-1">
                  Ultimo ordine: {new Date(customer.lastOrderDate).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <div className="flex border-t">
              {onEditCustomer && (
                <Button 
                  variant="ghost" 
                  className="flex-1 rounded-none h-12 text-blue-700 hover:bg-blue-50"
                  onClick={() => onEditCustomer(customer)}
                >
                  <Pencil className="h-5 w-5 mr-1" />
                  Modifica
                </Button>
              )}
              
              {onDeleteCustomer && (
                <Button 
                  variant="ghost" 
                  className="flex-1 rounded-none h-12 text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(customer.id)}
                >
                  <Trash2 className="h-5 w-5 mr-1" />
                  Elimina
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {customers.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border">
            <p className="text-gray-500 mb-4">Nessun cliente trovato.</p>
            <Button onClick={onAddCustomer} size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Aggiungi il primo cliente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileCustomersList;
