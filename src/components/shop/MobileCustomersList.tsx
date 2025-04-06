
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, Phone, Mail, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface Customer {
  id: string;
  name: string;
  email: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: Date;
}

interface MobileCustomersListProps {
  customers: Customer[];
  onAddCustomer?: () => void;
}

const MobileCustomersList: React.FC<MobileCustomersListProps> = ({ 
  customers,
  onAddCustomer 
}) => {
  const handleContactClick = (customer: Customer) => {
    toast.info(`Contatto cliente: ${customer.name}`);
  };

  return (
    <div className="space-y-4">
      {onAddCustomer && (
        <Button 
          className="w-full bg-[#0a3276] hover:bg-[#0a3276]/90 text-white font-bold py-3 rounded-md flex items-center justify-center"
          onClick={onAddCustomer}
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Aggiungi nuovo cliente
        </Button>
      )}
      
      {customers.length > 0 ? (
        customers.map((customer) => (
          <div key={customer.id} className="border rounded-md overflow-hidden bg-white mb-4">
            <div className="p-4">
              <div className="text-2xl font-bold">{customer.name}</div>
              <div className="text-gray-800">{customer.email}</div>
              <div className="text-sm text-gray-500 mt-1">
                Ultimo ordine: {customer.lastOrderDate.toLocaleDateString()}
              </div>
              <div className="mt-1 text-sm">
                <span className="font-semibold">{customer.orderCount} ordini</span> - 
                <span className="font-semibold ml-1">€{customer.totalSpent.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex border-t">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 py-2 justify-center text-gray-700 hover:bg-gray-100"
                onClick={() => toast.info(`Chiamata a ${customer.name}`)}
              >
                <Phone className="h-4 w-4 mr-1" /> 
                Chiama
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 py-2 justify-center text-gray-700 hover:bg-gray-100"
                onClick={() => toast.info(`Email a ${customer.name}`)}
              >
                <Mail className="h-4 w-4 mr-1" /> 
                Email
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 py-2 justify-center text-gray-700 hover:bg-gray-100"
                onClick={() => handleContactClick(customer)}
              >
                <Send className="h-4 w-4 mr-1" /> 
                Messaggio
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">Nessun cliente trovato</p>
        </div>
      )}
    </div>
  );
};

export default MobileCustomersList;
