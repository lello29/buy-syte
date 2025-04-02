
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Mail, Send } from "lucide-react";
import { shops, users, orders } from "@/data/mockData";

const CustomersPage = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  if (!currentUser || currentUser.role !== "shop") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const shop = shops.find((s) => s.userId === currentUser.id);

  if (!shop) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Negozio non trovato.</p>
      </div>
    );
  }

  // Get customers who have ordered from this shop
  const shopOrders = orders.filter((order) => order.shopId === shop.id);
  const customerIds = Array.from(new Set(shopOrders.map((order) => order.userId)));
  const customers = users.filter((user) => customerIds.includes(user.id));

  // Calculate total spent by each customer
  const customerStats = customers.map((customer) => {
    const customerOrders = shopOrders.filter((order) => order.userId === customer.id);
    const orderCount = customerOrders.length;
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const lastOrderDate = new Date(
      Math.max(...customerOrders.map((o) => new Date(o.createdAt).getTime()))
    );

    return {
      ...customer,
      orderCount,
      totalSpent,
      lastOrderDate,
    };
  });

  const filteredCustomers = customerStats.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">I tuoi clienti</h1>
        <p className="text-gray-600">
          Gestisci e visualizza informazioni sui clienti del tuo negozio
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border flex-1">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Cerca cliente per nome o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filtri
        </Button>
        <Button className="flex gap-2">
          <Mail className="h-4 w-4" />
          Marketing Email
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Totale clienti</span>
              <span className="text-3xl font-bold">{customers.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Totale ordini</span>
              <span className="text-3xl font-bold">{shopOrders.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Ordine medio</span>
              <span className="text-3xl font-bold">
                €{shopOrders.length > 0
                  ? (
                      shopOrders.reduce((sum, order) => sum + order.totalPrice, 0) /
                      shopOrders.length
                    ).toFixed(2)
                  : "0.00"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Nuovi clienti (30gg)</span>
              <span className="text-3xl font-bold">
                {
                  customers.filter(
                    (c) =>
                      new Date(c.createdAt).getTime() >
                      Date.now() - 30 * 24 * 60 * 60 * 1000
                  ).length
                }
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Clienti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Nome</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-right">Ordini</th>
                    <th className="px-4 py-3 text-right">Spesa totale</th>
                    <th className="px-4 py-3 text-left">Ultimo ordine</th>
                    <th className="px-4 py-3 text-right">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-4 py-3">{customer.name}</td>
                      <td className="px-4 py-3 text-gray-600">{customer.email}</td>
                      <td className="px-4 py-3 text-right">{customer.orderCount}</td>
                      <td className="px-4 py-3 text-right">
                        €{customer.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        {customer.lastOrderDate.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="ghost" className="flex gap-1">
                          <Send className="h-4 w-4" />
                          Contatta
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCustomers.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <p className="text-gray-500">Nessun cliente trovato</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
