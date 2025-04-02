
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart3,
  Users,
  Store,
  Package,
  UserCog,
  Bell,
  CreditCard,
  AlertTriangle,
  Check,
  ArrowUpRight,
  Briefcase,
  Archive,
  Clock,
} from "lucide-react";
import { shops, products, collaborators, getUsersByRole } from "@/data/mockData";

const AdminDashboardPage = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  // Calculate inactive shops (not updated in the last 30 days)
  const inactiveShops = shops.filter(shop => {
    const lastUpdated = new Date(shop.lastUpdated);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return lastUpdated < thirtyDaysAgo;
  });

  // Calculate inactive products
  const inactiveProducts = products.filter(product => !product.isActive);

  // Calculate pending shops (not approved yet)
  const pendingShops = shops.filter(shop => !shop.isApproved);

  // Calculate total AI credits consumed
  const totalAICreditsConsumed = shops.reduce((acc, shop) => acc + (100 - shop.aiCredits), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Amministratore</h1>
          <p className="text-gray-600">
            Panoramica completa della piattaforma
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Notifiche
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Report Completo
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Utenti Totali</p>
                <p className="text-3xl font-bold">{getUsersByRole("user").length}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/users">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Visualizza Dettagli
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Negozi</p>
                <p className="text-3xl font-bold">{shops.length}</p>
                <div className="mt-1 flex items-center text-xs">
                  <Badge variant="warning" className="mr-1">
                    {pendingShops.length} in attesa
                  </Badge>
                </div>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Store className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/shops">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Visualizza Dettagli
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collaboratori</p>
                <p className="text-3xl font-bold">{collaborators.length}</p>
                <div className="mt-1 flex items-center text-xs">
                  <Badge variant="success" className="mr-1">
                    {collaborators.filter(c => c.isActive).length} attivi
                  </Badge>
                </div>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/admin-collaborators">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Visualizza Dettagli
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Prodotti</p>
                <p className="text-3xl font-bold">{products.length}</p>
                <div className="mt-1 flex items-center text-xs">
                  <Badge variant={inactiveProducts.length > 0 ? "warning" : "success"} className="mr-1">
                    {inactiveProducts.length} inattivi
                  </Badge>
                </div>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Package className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/admin-products">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Visualizza Dettagli
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Elementi che richiedono attenzione
          </CardTitle>
          <CardDescription>
            Problemi o attività che richiedono intervento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingShops.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-md">
                <div className="flex items-center">
                  <Store className="h-5 w-5 text-yellow-600 mr-2" />
                  <span>{pendingShops.length} negozi in attesa di approvazione</span>
                </div>
                <Link to="/dashboard/shops">
                  <Button size="sm" variant="outline">Rivedi</Button>
                </Link>
              </div>
            )}
            
            {inactiveShops.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-md">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                  <span>{inactiveShops.length} negozi non aggiornati da 30+ giorni</span>
                </div>
                <Button size="sm" variant="outline">Notifica</Button>
              </div>
            )}

            {inactiveProducts.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md">
                <div className="flex items-center">
                  <Archive className="h-5 w-5 text-blue-600 mr-2" />
                  <span>{inactiveProducts.length} prodotti inattivi nel sistema</span>
                </div>
                <Link to="/dashboard/admin-products">
                  <Button size="sm" variant="outline">Rivedi</Button>
                </Link>
              </div>
            )}

            {pendingShops.length === 0 && inactiveShops.length === 0 && inactiveProducts.length === 0 && (
              <div className="flex items-center justify-center p-6 bg-green-50 rounded-md">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <span>Nessun elemento richiede attenzione</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Utilizzo Crediti AI
            </CardTitle>
            <CardDescription>
              Monitoraggio del consumo di crediti AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Totale crediti consumati</span>
                <span className="font-medium">{totalAICreditsConsumed} / 1000</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(totalAICreditsConsumed / 1000) * 100}%` }}
                />
              </div>
            </div>
            
            <h4 className="font-medium mb-2">Consumo per negozio</h4>
            <div className="space-y-2">
              {shops.slice(0, 5).map(shop => (
                <div key={shop.id} className="flex items-center justify-between text-sm">
                  <span className="truncate max-w-[70%]">{shop.name}</span>
                  <span className="font-medium">{100 - shop.aiCredits} crediti</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                Rapporto Completo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-primary" />
              Attività Recenti
            </CardTitle>
            <CardDescription>
              Log delle attività amministrative recenti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                  <Store className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nuovo negozio approvato</p>
                  <p className="text-xs text-muted-foreground">2 ore fa</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="bg-green-100 text-green-700 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">5 nuovi utenti registrati</p>
                  <p className="text-xs text-muted-foreground">ieri</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="bg-yellow-100 text-yellow-700 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Pacchetti AI aggiornati</p>
                  <p className="text-xs text-muted-foreground">2 giorni fa</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="bg-red-100 text-red-700 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Utente bloccato per attività sospetta</p>
                  <p className="text-xs text-muted-foreground">3 giorni fa</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm">
                Visualizza tutte le attività
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
