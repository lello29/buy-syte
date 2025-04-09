
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import CustomerDialog from "./components/CustomerDialog";
import CustomerHeader from "./components/CustomerHeader";
import CustomersTable from "./components/CustomersTable";
import MobileCustomerView from "./components/MobileCustomerView";
import ShopAuthCheck from "../components/ShopAuthCheck";
import { useCustomerForm } from "./hooks/useCustomerForm";
import { Customer } from "./types";
import { toast } from "sonner";

const CustomersPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [initialCustomers, setInitialCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial customers
  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      try {
        // This would normally fetch from the database
        // For now, we'll just use an empty array until the database is set up
        setInitialCustomers([]);
      } catch (error) {
        console.error("Error loading customers:", error);
        toast.error("Errore nel caricamento dei clienti");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCustomers();
  }, []);
  
  const {
    customers,
    isAddDialogOpen,
    setIsAddDialogOpen,
    newCustomer,
    handleInputChange,
    handleAddCustomer
  } = useCustomerForm(initialCustomers);
  
  return (
    <ShopAuthCheck>
      <div className="space-y-6">
        {!isMobile && (
          <CustomerHeader onAddClick={() => setIsAddDialogOpen(true)} />
        )}

        {isMobile ? (
          <MobileCustomerView 
            customers={customers} 
            onAddCustomer={() => setIsAddDialogOpen(true)} 
          />
        ) : (
          <CustomersTable customers={customers} />
        )}

        <CustomerDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          newCustomer={newCustomer}
          handleInputChange={handleInputChange}
          handleAddCustomer={handleAddCustomer}
        />
      </div>
    </ShopAuthCheck>
  );
};

export default CustomersPage;
