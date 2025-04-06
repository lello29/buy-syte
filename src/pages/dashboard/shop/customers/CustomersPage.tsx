
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { Customer } from "./types";
import CustomerDialog from "./components/CustomerDialog";
import CustomerHeader from "./components/CustomerHeader";
import CustomersTable from "./components/CustomersTable";
import MobileCustomerView from "./components/MobileCustomerView";

// Mock data for customers
const mockCustomers = [
  {
    id: "cust1",
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    orderCount: 5,
    totalSpent: 350.50,
    lastOrderDate: new Date("2023-03-15"),
  },
  {
    id: "cust2",
    name: "Giulia Bianchi",
    email: "giulia.bianchi@example.com",
    orderCount: 3,
    totalSpent: 220.75,
    lastOrderDate: new Date("2023-04-20"),
  },
  {
    id: "cust3",
    name: "Luca Verdi",
    email: "luca.verdi@example.com",
    orderCount: 8,
    totalSpent: 560.25,
    lastOrderDate: new Date("2023-05-10"),
  },
];

const CustomersPage: React.FC = () => {
  const { currentUser, getUserShop } = useAuth();
  const isMobile = useIsMobile();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
  });
  
  if (!currentUser || currentUser.role !== "shop") {
    return <div>Accesso non autorizzato</div>;
  }
  
  const shop = getUserShop();
  
  if (!shop) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Negozio non configurato</h2>
        <p className="text-muted-foreground mb-6">
          Il tuo account negozio non è ancora associato a un profilo negozio. 
          Contatta l'amministratore per configurare il tuo profilo.
        </p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast.error("Inserisci nome e email");
      return;
    }

    const newCustomerObj = {
      id: `cust-${Date.now()}`,
      name: newCustomer.name,
      email: newCustomer.email,
      orderCount: 0,
      totalSpent: 0,
      lastOrderDate: new Date(),
    };

    setCustomers(prev => [...prev, newCustomerObj]);
    setNewCustomer({ name: '', email: '' });
    setIsAddDialogOpen(false);
    toast.success("Cliente aggiunto con successo");
  };
  
  return (
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
  );
};

export default CustomersPage;
