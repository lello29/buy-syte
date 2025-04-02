import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getOrdersByUserId, getProductsByShopId, getUsersByRole, shops, products, getTasksByCollaboratorId, collaborators } from "@/data/mockData";
import { BarChart3, Package, Users, Heart, ShoppingBag, Store, User, Award, Calendar, Star } from "lucide-react";

const DashboardIndex = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Caricamento...</div>;
  }

  const renderDashboardByRole = () => {
    const role = currentUser.role;
    
    switch (role) {
      case "user":
        return <UserDashboard userId={currentUser.id} />;
      case "shop":
        return <ShopDashboard userId={currentUser.id} />;
      case "collaborator":
        return <CollaboratorDashboard userId={currentUser.id} />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <div>Ruolo non riconosciuto</div>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">
        Benvenuto, {currentUser.name}! Questa è la tua dashboard personale.
      </p>
      
      {renderDashboardByRole()}
    </div>
  );
};

const UserDashboard = ({ userId }: { userId: string }) => {
  const orders = getOrdersByUserId(userId);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Ordini Recenti"
          description="Monitora i tuoi ultimi acquisti"
          value={orders.length.toString()}
          icon={<ShoppingBag className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/orders"
        />
        
        <DashboardCard
          title="Negozi Preferiti"
          description="I negozi che segui"
          value={(Math.floor(Math.random() * 5) + 1).toString()}
          icon={<Heart className="h-8 w-8 text-red-500" />}
          linkTo="/dashboard/favorites"
        />
        
        <DashboardCard
          title="Punti Fedeltà"
          description="Accumula punti con i tuoi acquisti"
          value={Math.floor(Math.random() * 200 + 50).toString()}
          icon={<Award className="h-8 w-8 text-amber-500" />}
          linkTo="/dashboard/loyalty"
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Ordini Recenti</h2>
      {orders.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">ID Ordine</th>
                  <th className="px-4 py-3 text-left">Negozio</th>
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-4 py-3 text-left">Stato</th>
                  <th className="px-4 py-3 text-right">Totale</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">
                      {shops.find(shop => shop.id === order.shopId)?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'processing' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'delivered' 
                          ? 'Consegnato' 
                          : order.status === 'processing' 
                          ? 'In Lavorazione'
                          : order.status === 'shipped'
                          ? 'Spedito'
                          : 'In Attesa'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      €{order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost">Dettagli</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-gray-500">Non hai ancora effettuato ordini.</p>
            <Link to="/shops">
              <Button className="mt-4">Visita i negozi</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Prodotti consigliati</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="h-40 bg-gray-100">
              <img
                src={product.images[0] || "/placeholder.svg"} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                {product.description}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-bold">
                  {product.discountPrice ? (
                    <>
                      €{product.discountPrice.toFixed(2)}
                      <span className="text-xs text-gray-500 line-through ml-1">
                        €{product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    `€${product.price.toFixed(2)}`
                  )}
                </span>
                <Button size="sm" variant="outline">
                  Dettagli
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ShopDashboard = ({ userId }: { userId: string }) => {
  const shop = shops.find(shop => shop.userId === userId);
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }
  
  const shopProducts = getProductsByShopId(shop.id);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Prodotti"
          description="Gestisci il tuo catalogo"
          value={shopProducts.length.toString()}
          icon={<Package className="h-8 w-8 text-purple-600" />}
          linkTo="/dashboard/products"
        />
        
        <DashboardCard
          title="Ordini Ricevuti"
          description="Ordini da evadere"
          value={(Math.floor(Math.random() * 10) + 1).toString()}
          icon={<ShoppingBag className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/shop-orders"
        />
        
        <DashboardCard
          title="Crediti AI"
          description="Crediti disponibili per assistenza AI"
          value={shop.aiCredits.toString()}
          icon={<BarChart3 className="h-8 w-8 text-green-600" />}
          linkTo="/dashboard/ai-credits"
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Prodotti Recenti</h2>
      {shopProducts.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Nome Prodotto</th>
                  <th className="px-4 py-3 text-left">Categoria</th>
                  <th className="px-4 py-3 text-right">Prezzo</th>
                  <th className="px-4 py-3 text-right">Inventario</th>
                  <th className="px-4 py-3 text-left">Stato</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {shopProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 text-right">
                      €{product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {product.inventory}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        product.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isActive ? 'Attivo' : 'Disattivato'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost">Modifica</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-gray-500">Non hai ancora aggiunto prodotti.</p>
            <Button className="mt-4">Aggiungi Prodotto</Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Statistiche Negozio</CardTitle>
            <CardDescription>Dati degli ultimi 30 giorni</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Visite totali:</span>
                <span className="font-medium">{Math.floor(Math.random() * 500) + 100}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conversioni:</span>
                <span className="font-medium">{Math.floor(Math.random() * 50) + 10}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ultimo aggiornamento:</span>
                <span className="font-medium">
                  {new Date(shop.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Offerte attive:</span>
                <span className="font-medium">{shop.offers.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Azioni Rapide</CardTitle>
            <CardDescription>Gestisci il tuo negozio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" /> Aggiungi Nuovo Prodotto
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Crea Nuova Offerta
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" /> Cerca Collaboratori
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Store className="mr-2 h-4 w-4" /> Modifica Informazioni Negozio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CollaboratorDashboard = ({ userId }: { userId: string }) => {
  const collaborator = collaborators.find(collab => collab.userId === userId);
  
  if (!collaborator) {
    return <div>Profilo collaboratore non trovato</div>;
  }
  
  const tasks = getTasksByCollaboratorId(collaborator.id);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard
          title="Incarichi Completati"
          description="Il tuo storico di lavori"
          value={collaborator.completedTasks.toString()}
          icon={<Package className="h-8 w-8 text-green-600" />}
          linkTo="/dashboard/tasks"
        />
        
        <DashboardCard
          title="Valutazione"
          description="La tua reputazione"
          value={collaborator.rating.toString()}
          icon={<Star className="h-8 w-8 text-amber-500" />}
          linkTo="/dashboard/reviews"
        />
        
        <DashboardCard
          title="Incarichi Disponibili"
          description="Nuove opportunità di lavoro"
          value={(Math.floor(Math.random() * 8) + 2).toString()}
          icon={<Calendar className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/available-tasks"
        />
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Il tuo profilo</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Nome:</dt>
                <dd className="text-sm text-gray-900">{collaborator.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Email:</dt>
                <dd className="text-sm text-gray-900">{collaborator.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Telefono:</dt>
                <dd className="text-sm text-gray-900">{collaborator.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Area di copertura:</dt>
                <dd className="text-sm text-gray-900">{collaborator.coverageArea}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Disponibilità:</dt>
                <dd className="text-sm text-gray-900">{collaborator.availability}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Data registrazione:</dt>
                <dd className="text-sm text-gray-900">
                  {new Date(collaborator.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
            <Button variant="outline" className="w-full mt-4">
              <User className="mr-2 h-4 w-4" />
              Modifica profilo
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Incarichi recenti</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length > 0 ? (
              <ul className="space-y-4">
                {tasks.map((task) => {
                  const shop = shops.find(s => s.id === task.shopId);
                  return (
                    <li key={task.id} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          task.status === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : task.status === "assigned" 
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {task.status === "completed" 
                            ? "Completato" 
                            : task.status === "assigned" 
                            ? "Assegnato"
                            : "Aperto"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span>
                          Negozio: {shop?.name || "N/A"}
                        </span>
                        <span className="font-medium">
                          €{task.reward.toFixed(2)}
                        </span>
                      </div>
                    </li>
                  );
                })}
                <Button variant="ghost" size="sm" className="w-full">
                  Vedi tutti gli incarichi
                </Button>
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Nessun incarico recente</p>
                <Button variant="outline" className="mt-4">
                  Cerca incarichi
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const allUsers = getUsersByRole("user").length;
  const allShops = shops.length;
  const allProducts = products.length;
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Utenti"
          description="Utenti registrati"
          value={allUsers.toString()}
          icon={<Users className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/users"
        />
        
        <DashboardCard
          title="Negozi"
          description="Negozi attivi"
          value={allShops.toString()}
          icon={<Store className="h-8 w-8 text-green-600" />}
          linkTo="/dashboard/shops"
        />
        
        <DashboardCard
          title="Collaboratori"
          description="Collaboratori registrati"
          value={collaborators.length.toString()}
          icon={<User className="h-8 w-8 text-purple-600" />}
          linkTo="/dashboard/admin-collaborators"
        />
        
        <DashboardCard
          title="Prodotti"
          description="Prodotti totali"
          value={allProducts.toString()}
          icon={<Package className="h-8 w-8 text-orange-600" />}
          linkTo="/dashboard/admin-products"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Negozi recenti</CardTitle>
            <CardDescription>Ultimi negozi registrati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Nome</th>
                    <th className="px-4 py-3 text-left">Data</th>
                    <th className="px-4 py-3 text-left">Prodotti</th>
                    <th className="px-4 py-3 text-left">Stato</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {shops.slice(0, 4).map((shop) => (
                    <tr key={shop.id}>
                      <td className="px-4 py-3">{shop.name}</td>
                      <td className="px-4 py-3">
                        {new Date(shop.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {getProductsByShopId(shop.id).length}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Attivo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="ghost" size="sm" className="w-full mt-4">
                Visualizza tutti
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Attività recenti</CardTitle>
            <CardDescription>Ultime azioni sulla piattaforma</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Nuovo utente registrato</p>
                  <p className="text-xs text-gray-500">2 ore fa</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-green-100 text-green-700 p-2 rounded-full">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">5 nuovi prodotti aggiunti</p>
                  <p className="text-xs text-gray-500">3 ore fa</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Nuovo ordine completato</p>
                  <p className="text-xs text-gray-500">5 ore fa</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                  <Store className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Nuovo negozio registrato</p>
                  <p className="text-xs text-gray-500">6 ore fa</p>
                </div>
              </li>
            </ul>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Visualizza tutte le attività
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistiche Globali</CardTitle>
          <CardDescription>Panoramica della piattaforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Crediti AI utilizzati</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">
                  {shops.reduce((acc, shop) => acc + (100 - shop.aiCredits), 0)}
                </span>
                <span className="text-sm text-gray-500">di 1000</span>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ 
                    width: `${(shops.reduce((acc, shop) => acc + (100 - shop.aiCredits), 0) / 1000) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Prodotti inattivi</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">
                  {products.filter(p => !p.isActive).length}
                </span>
                <span className="text-sm text-gray-500">
                  prodotti
                </span>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Visualizza dettagli
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Negozi non aggiornati</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">
                  {shops.filter(shop => {
                    const lastUpdated = new Date(shop.lastUpdated);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return lastUpdated < thirtyDaysAgo;
                  }).length}
                </span>
                <span className="text-sm text-gray-500">
                  negozi
                </span>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Invia promemoria
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
  linkTo: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, value, icon, linkTo }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <Link to={linkTo}>
            <Button variant="ghost" size="sm" className="w-full justify-between">
              Visualizza dettagli
              <span>→</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardIndex;
