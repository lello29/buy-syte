
import React from "react";
import { Customer } from "../types";
import MobileCustomersList from "@/components/shop/MobileCustomersList";

interface MobileCustomerViewProps {
  customers: Customer[];
  onAddCustomer: () => void;
  onEditCustomer?: (customer: Customer) => void;
  onDeleteCustomer?: (customerId: string) => void;
}

const MobileCustomerView: React.FC<MobileCustomerViewProps> = ({ 
  customers, 
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer
}) => {
  return (
    <>
      <div className="md:hidden">
        <h1 className="text-3xl font-bold mb-2">I tuoi Clienti</h1>
        <p className="text-gray-600 mb-6">
          Gestisci i clienti del tuo negozio e le loro informazioni.
        </p>
      </div>
      <MobileCustomersList 
        customers={customers} 
        onAddCustomer={onAddCustomer}
        onEditCustomer={onEditCustomer}
        onDeleteCustomer={onDeleteCustomer}
      />
    </>
  );
};

export default MobileCustomerView;
