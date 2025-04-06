
import { useState } from "react";
import { Customer } from "../types";
import { toast } from "sonner";

export const useCustomerForm = (initialCustomers: Customer[]) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast.error("Inserisci nome e email");
      return;
    }

    const currentDate = new Date().toISOString();
    
    const newCustomerObj: Customer = {
      id: `cust-${Date.now()}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      orderCount: 0,
      totalSpent: 0,
      lastOrderDate: currentDate,
      createdAt: currentDate
    };

    setCustomers(prev => [...prev, newCustomerObj]);
    setNewCustomer({ name: '', email: '', phone: '' });
    setIsAddDialogOpen(false);
    toast.success("Cliente aggiunto con successo");
  };

  return {
    customers,
    isAddDialogOpen,
    setIsAddDialogOpen,
    newCustomer,
    handleInputChange,
    handleAddCustomer
  };
};
