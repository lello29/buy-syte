
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import CustomerDialog from "./components/CustomerDialog";
import CustomerHeader from "./components/CustomerHeader";
import CustomersTable from "./components/CustomersTable";
import MobileCustomerView from "./components/MobileCustomerView";
import ShopAuthCheck from "../components/ShopAuthCheck";
import { useCustomerForm } from "./hooks/useCustomerForm";
import { mockCustomers } from "./data/mockCustomers";

const CustomersPage: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    customers,
    isAddDialogOpen,
    setIsAddDialogOpen,
    newCustomer,
    handleInputChange,
    handleAddCustomer
  } = useCustomerForm(mockCustomers);
  
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
