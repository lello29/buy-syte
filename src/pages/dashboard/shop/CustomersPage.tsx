
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { users, orders, shops } from "@/data/mockData";
import { Search, Mail, MessageSquare, UserCheck, UserX, Users, Award, ChevronDown, ChevronUp } from "lucide-react";

const CustomersPage = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<string>("orders");
  
  if (!currentUser || currentUser.role !== "shop") {
    return <div>Accesso non autorizzato</div>;
  }

  // Trova il negozio dell'utente corrente
  const shop = shops.find(shop => shop.userId === currentUser.id);
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }
  
  // Trova gli ordini del negozio
  const shopOrders = orders.filter(order => order.shopId === shop.id);
  
  // Trova i clienti unici che hanno effettuato ordini
  const customerIds = [...new Set(shopOrders.map(order => order.userId))];
  
  // Ottieni i dati completi dei clienti
  const customers = customerIds.map(customerId => {
    const customer = users.find(user => user.id === customerId);
    const customerOrders = shopOrders.filter(order => order.userId === customerId);
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);
    
    return {
      id: customerId,
      name: customer?.name || "Cliente sconosciuto",
      email: customer?.email || "email@sconosciuta.it",
      orders: customerOrders.length,
      lastOrder: new Date(Math.max(...customerOrders.map(order => new Date(order.createdAt).getTime()))),
      totalSpent,
      loyaltyPoints: customer?.loyaltyPoints || 0,
      status: customerOrders.length > 3 ? "loyal" : "regular"
    };
  });

  // Filtra i clienti in base al termine di ricerca
  const filteredCustomers = customers.filter(
    customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordina i clienti
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let comparison = 0;

    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === "lastOrder") {
      comparison = b.lastOrder.getTime() - a.lastOrder.getTime();
    } else if (sortField === "orders") {
      comparison = b.orders - a.orders;
    } else if (sortField === "spent") {
      comparison = b.totalSpent - a.totalSpent;
    } else if (sortField === "loyalty") {
      comparison = b.loyaltyPoints - a.loyaltyPoints;
    }

    return sortOrder === "asc" ? -comparison : comparison;
  });

  // Calcola i clienti attivi (che hanno effettuato ordini negli ultimi 30 giorni)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const activeCustomers = customers.filter(
    customer => customer.lastOrder > thirtyDaysAgo
  ).length;
  
  // Calcola la spesa media dei clienti
  const averageSpent = customers.length > 0 
    ? customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.length
    : 0;
  
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };
  
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Clienti</h1>
        <p className="text-gray-600">
          Gestisci e analizza i clienti del tuo negozio.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Clienti totali</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Clienti attivi</p>
                <p className="text-2xl font-bold">{activeCustomers}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Spesa media</p>
                <p className="text-2xl font-bold">€{averageSpent.toFixed(2)}</p>
              </div>
              <Award className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Tutti i clienti</TabsTrigger>
          <TabsTrigger value="loyal">Clienti fedeli</TabsTrigger>
          <TabsTrigger value="regular">Clienti regolari</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cerca cliente per nome o email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Elenco clienti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-gray-50">
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center gap-1">
                            Cliente 
                            {renderSortIcon("name")}
                          </div>
                        </th>
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("orders")}
                        >
                          <div className="flex items-center gap-1">
                            Ordini 
                            {renderSortIcon("orders")}
                          </div>
                        </th>
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("spent")}
                        >
                          <div className="flex items-center gap-1">
                            Spesa totale 
                            {renderSortIcon("spent")}
                          </div>
                        </th>
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("lastOrder")}
                        >
                          <div className="flex items-center gap-1">
                            Ultimo ordine 
                            {renderSortIcon("lastOrder")}
                          </div>
                        </th>
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                          onClick={() => handleSort("loyalty")}
                        >
                          <div className="flex items-center gap-1">
                            Punti fedeltà 
                            {renderSortIcon("loyalty")}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Azioni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b transition-colors hover:bg-gray-50">
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span className="font-medium">{customer.name}</span>
                              <span className="text-xs text-gray-500">{customer.email}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{customer.orders}</td>
                          <td className="p-4 align-middle">€{customer.totalSpent.toFixed(2)}</td>
                          <td className="p-4 align-middle">{customer.lastOrder.toLocaleDateString()}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-amber-500 mr-1" />
                              {customer.loyaltyPoints}
                            </div>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {sortedCustomers.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <UserX className="h-10 w-10 text-gray-400 mb-2" />
                      <h3 className="font-medium">Nessun cliente trovato</h3>
                      <p className="text-sm text-gray-500">
                        {searchTerm ? 'Prova con un altro termine di ricerca.' : 'Non ci sono clienti registrati.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loyal">
          {/* Contenuto simile per i clienti fedeli */}
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <UserCheck className="h-10 w-10 text-primary mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-2">Clienti fedeli</h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    Qui vedrai un elenco dei clienti che hanno effettuato più di 3 ordini nel tuo negozio.
                  </p>
                  <Badge className="mt-4" variant="outline">
                    {customers.filter(c => c.status === "loyal").length} Clienti fedeli
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regular">
          {/* Contenuto simile per i clienti regolari */}
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-10 w-10 text-primary mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-2">Clienti regolari</h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    Qui vedrai un elenco dei clienti che hanno effettuato meno di 3 ordini nel tuo negozio.
                  </p>
                  <Badge className="mt-4" variant="outline">
                    {customers.filter(c => c.status === "regular").length} Clienti regolari
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomersPage;
