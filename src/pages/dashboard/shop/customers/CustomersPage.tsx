
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
import { supabase } from "@/lib/supabase";
import { mockCustomers } from "./data/mockCustomers";
import { Button } from "@/components/ui/button";
import { DatabaseIcon } from "lucide-react";

const CustomersPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [initialCustomers, setInitialCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMockDataButton, setShowMockDataButton] = useState(false);
  
  // Load customers from database
  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      try {
        // Try to fetch customers from Supabase
        const { data, error } = await supabase
          .from('customers')
          .select('*');
          
        if (error) {
          console.error("Error loading customers:", error);
          setShowMockDataButton(true);
          setInitialCustomers([]);
        } else {
          // If we have customers from database, use them
          if (data && data.length > 0) {
            setInitialCustomers(data as Customer[]);
          } else {
            // Database exists but is empty, show option to load mock data
            setShowMockDataButton(true);
            setInitialCustomers([]);
          }
        }
      } catch (error) {
        console.error("Error loading customers:", error);
        setShowMockDataButton(true);
        setInitialCustomers([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCustomers();
  }, []);
  
  const loadMockData = () => {
    setInitialCustomers(mockCustomers);
    toast.success("Dati di esempio caricati con successo");
    setShowMockDataButton(false);
  };
  
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

        {showMockDataButton && (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Nessun cliente trovato</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Non sono stati trovati clienti nel database. Vuoi caricare dei dati di esempio per testare la funzionalità?
            </p>
            <Button 
              onClick={loadMockData} 
              variant="outline"
              className="gap-2"
            >
              <DatabaseIcon className="h-4 w-4" />
              Carica dati di esempio
            </Button>
          </div>
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
