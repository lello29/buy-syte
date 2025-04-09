
import { useState, useCallback, useEffect } from 'react';
import { Customer } from '../types';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { createCustomersTable } from '@/utils/customerDataHelpers';

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

  // Update customers when initialCustomers changes
  useEffect(() => {
    setCustomers(initialCustomers);
  }, [initialCustomers]);

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
      // Create customer ID
      const customerId = crypto.randomUUID();
      
      // Format customer with complete data
      const customerWithId = {
        ...newCustomer,
        id: customerId,
        points: newCustomer.points || 0,
        orders: newCustomer.orders || 0,
        lastPurchase: new Date().toISOString().split('T')[0],
        orderCount: newCustomer.orders || 0,
        totalSpent: 0,
        lastOrderDate: new Date().toISOString().split('T')[0]
      };
      
      // Try to save to database if Supabase is configured
      const tableExists = await createCustomersTable();
      
      if (tableExists) {
        // Convert to snake_case for database
        const customerForDB = {
          id: customerWithId.id,
          name: customerWithId.name,
          email: customerWithId.email,
          phone: customerWithId.phone,
          points: customerWithId.points,
          orders: customerWithId.orders,
          last_purchase: customerWithId.lastPurchase,
          notes: customerWithId.notes,
          address: customerWithId.address,
          order_count: customerWithId.orderCount,
          total_spent: customerWithId.totalSpent,
          last_order_date: customerWithId.lastOrderDate
        };
        
        const { error } = await supabase
          .from('customers')
          .insert(customerForDB);
          
        if (error) {
          console.error('Error saving customer to database:', error);
          // Continue with local state update despite DB error
        }
      }
      
      // Always update local state
      setCustomers(prev => [...prev, customerWithId]);
      
      // Reset form
      setNewCustomer({
        id: '',
        name: '',
        email: '',
        phone: '',
        points: 0,
        orders: 0
      });
      
      // Close dialog
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
