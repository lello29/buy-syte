
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCustomersList from "@/components/shop/MobileCustomersList";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

const CustomersPage = () => {
  const { currentUser, getUserShop } = useAuth();
  const isMobile = useIsMobile();
  const [customers, setCustomers] = useState(mockCustomers);
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">I tuoi Clienti</h1>
            <p className="text-gray-600">
              Gestisci i clienti del tuo negozio e le loro informazioni.
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="mr-2 h-5 w-5" /> Aggiungi Cliente
          </Button>
        </div>
      )}

      {isMobile ? (
        <>
          <div className="md:hidden">
            <h1 className="text-3xl font-bold mb-2">I tuoi Clienti</h1>
            <p className="text-gray-600 mb-6">
              Gestisci i clienti del tuo negozio e le loro informazioni.
            </p>
          </div>
          <MobileCustomersList 
            customers={customers} 
            onAddCustomer={() => setIsAddDialogOpen(true)}
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Elenco Clienti</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Nome</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Ordini</th>
                  <th className="text-left py-2">Totale Speso</th>
                  <th className="text-left py-2">Ultimo Ordine</th>
                  <th className="text-right py-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="py-3">{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.orderCount}</td>
                    <td>€{customer.totalSpent.toFixed(2)}</td>
                    <td>{customer.lastOrderDate.toLocaleDateString()}</td>
                    <td className="text-right">
                      <Button size="sm" variant="outline">Contatta</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aggiungi Nuovo Cliente</DialogTitle>
            <DialogDescription>
              Inserisci i dettagli per creare un nuovo cliente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
                placeholder="Nome cliente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                placeholder="Email cliente"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annulla</Button>
            <Button onClick={handleAddCustomer}>Aggiungi Cliente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
