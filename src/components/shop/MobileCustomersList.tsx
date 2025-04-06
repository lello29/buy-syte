
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, ChevronRight, Phone, Mail } from 'lucide-react';
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
}

const MobileCustomersList: React.FC<MobileCustomersListProps> = ({ customers }) => {
  const handleContactClick = (customer: Customer) => {
    toast.info(`Contatto cliente: ${customer.name}`);
  };

  const handleCustomerClick = (customer: Customer) => {
    toast.info(`Visualizza dettagli cliente: ${customer.name}`);
  };

  return (
    <div className="space-y-4">
      {customers.length > 0 ? (
        customers.map((customer) => (
          <div key={customer.id} className="border rounded-md overflow-hidden">
            <div 
              className="p-4"
              onClick={() => handleCustomerClick(customer)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{customer.name}</h3>
                  <p className="text-gray-600 text-sm">{customer.email}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <div>
                  <span className="text-gray-500">Ultimo ordine: </span>
                  <span>{customer.lastOrderDate.toLocaleDateString()}</span>
                </div>
                <div className="font-semibold">
                  €{customer.totalSpent.toFixed(2)}
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {customer.orderCount} ordini totali
              </div>
            </div>
            <div className="flex border-t">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 py-2 justify-center"
                onClick={() => toast.info(`Chiamata a ${customer.name}`)}
              >
                <Phone className="h-4 w-4 mr-1" /> 
                Chiama
              </Button>
              <div className="w-px bg-gray-200"></div>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 py-2 justify-center"
                onClick={() => toast.info(`Email a ${customer.name}`)}
              >
                <Mail className="h-4 w-4 mr-1" /> 
                Email
              </Button>
              <div className="w-px bg-gray-200"></div>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 py-2 justify-center"
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
