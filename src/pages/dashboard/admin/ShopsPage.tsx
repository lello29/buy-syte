
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Store, Package, ShoppingBag, Check, X } from "lucide-react";
import { shops, getProductsByShopId } from "@/data/mockData";

const ShopsPage = () => {
  const { currentUser } = useAuth();
  const [approvalFilters, setApprovalFilters] = useState<"all" | "approved" | "pending">("all");

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleApproveShop = (shopId: string) => {
    toast.success("Negozio approvato con successo");
  };
  
  const handleRejectShop = (shopId: string) => {
    toast.success("Negozio rifiutato");
  };

  const filteredShops = approvalFilters === "all" 
    ? shops 
    : shops.filter(shop => 
        approvalFilters === "approved" ? shop.isApproved : !shop.isApproved
      );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestione Negozi</h1>
      <p className="text-gray-600">
        Visualizza e gestisci i negozi registrati sulla piattaforma.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          variant={approvalFilters === "all" ? "default" : "outline"} 
          onClick={() => setApprovalFilters("all")}
        >
          Tutti
        </Button>
        <Button 
          variant={approvalFilters === "approved" ? "default" : "outline"} 
          onClick={() => setApprovalFilters("approved")}
        >
          Approvati
        </Button>
        <Button 
          variant={approvalFilters === "pending" ? "default" : "outline"} 
          onClick={() => setApprovalFilters("pending")}
        >
          In attesa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            Lista Negozi
          </CardTitle>
          <CardDescription>
            Elenco di tutti i negozi registrati sulla piattaforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Nome</th>
                    <th className="px-4 py-3 text-left font-medium">Indirizzo</th>
                    <th className="px-4 py-3 text-left font-medium">Prodotti</th>
                    <th className="px-4 py-3 text-left font-medium">Creato</th>
                    <th className="px-4 py-3 text-left font-medium">Stato</th>
                    <th className="px-4 py-3 text-right font-medium">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredShops.map((shop) => (
                    <tr key={shop.id}>
                      <td className="px-4 py-3 text-left">
                        <div className="font-medium">{shop.name}</div>
                        <div className="text-xs text-muted-foreground">{shop.email}</div>
                      </td>
                      <td className="px-4 py-3 text-left">{shop.address}</td>
                      <td className="px-4 py-3 text-left">
                        {getProductsByShopId(shop.id).length}
                      </td>
                      <td className="px-4 py-3 text-left">
                        {new Date(shop.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-left">
                        <Badge variant={shop.isApproved ? "success" : "warning"}>
                          {shop.isApproved ? "Approvato" : "In Attesa"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          {!shop.isApproved && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleApproveShop(shop.id)}
                              >
                                <Check className="mr-1 h-4 w-4" /> Approva
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-destructive border-destructive hover:bg-destructive/10"
                                onClick={() => handleRejectShop(shop.id)}
                              >
                                <X className="mr-1 h-4 w-4" /> Rifiuta
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            Dettagli
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopsPage;
