
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, DollarSign, TrendingUp, Users } from "lucide-react";
import SalesChart from "./components/SalesChart";
import VisitorsChart from "./components/VisitorsChart";
import TopProductsTable from "./components/TopProductsTable";
import CustomerStatsCard from "./components/CustomerStatsCard";

const ShopAnalyticsPage = () => {
  const { currentUser, getUserShop } = useAuth();
  
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
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistiche Negozio</h1>
        <p className="text-muted-foreground">
          Analizza l'andamento del tuo negozio e le performance di vendita
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendite Totali</CardTitle>
            <CardDescription>Nell'ultimo mese</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">€5,231.89</div>
              <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ordini</CardTitle>
            <CardDescription>Nell'ultimo mese</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">42</div>
              <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nuovi Clienti</CardTitle>
            <CardDescription>Nell'ultimo mese</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">18</div>
              <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23.1%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Vendite</TabsTrigger>
          <TabsTrigger value="customers">Clienti</TabsTrigger>
          <TabsTrigger value="products">Prodotti</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Andamento Vendite</CardTitle>
              <CardDescription>
                Visualizza l'andamento delle vendite negli ultimi 30 giorni
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <SalesChart />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Visite Negozio</CardTitle>
              <CardDescription>
                Tracciamento visite al tuo negozio online
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <VisitorsChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4">
          <CustomerStatsCard />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prodotti Più Venduti</CardTitle>
              <CardDescription>
                I prodotti che generano più vendite
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TopProductsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopAnalyticsPage;
