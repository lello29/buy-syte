
import { useState, useCallback } from 'react';
import { Customer } from '../types';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export const useCustomerForm = (initialCustomers: Customer[] = []) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: '',
    name: '',
    email: '',
    phone: '',
    points: 0,
    orders: 0
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: name === 'points' || name === 'orders' ? parseInt(value) || 0 : value
    }));
  }, []);

  const handleAddCustomer = useCallback(async () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast.error('Nome e email sono obbligatori');
      return;
    }

    try {
      // In a real application, you would save this to the database
      // For now, we'll just add it to the state
      const customerId = crypto.randomUUID();
      const customerWithId = {
        ...newCustomer,
        id: customerId,
        points: newCustomer.points || 0,
        orders: newCustomer.orders || 0,
        lastPurchase: new Date().toISOString().split('T')[0]
      };
      
      setCustomers(prev => [...prev, customerWithId]);
      setNewCustomer({
        id: '',
        name: '',
        email: '',
        phone: '',
        points: 0,
        orders: 0
      });
      
      setIsAddDialogOpen(false);
      toast.success('Cliente aggiunto con successo');
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error('Errore durante l\'aggiunta del cliente');
    }
  }, [newCustomer]);

  return {
    customers,
    isAddDialogOpen,
    setIsAddDialogOpen,
    newCustomer,
    handleInputChange,
    handleAddCustomer
  };
};
