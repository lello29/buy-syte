
import React, { useState, useEffect } from "react";
import DashboardCard from "../cards/DashboardCard";
import { Users, Store, User, Package, Loader2 } from "lucide-react";
import RecentShopsCard from "./recent-shops/RecentShopsCard";
import RecentActivitiesCard from "./activity/RecentActivitiesCard";
import GlobalStatisticsCard from "./statistics/GlobalStatisticsCard";
import { Shop, Product } from "@/types";
import { toast } from "sonner";
import { DatabaseAdapter } from "@/lib/databaseAdapter";
import { mockShops, mockProducts } from "@/data/mockData";

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    shops: 0,
    collaborators: 0,
    products: 0
  });
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch counts using our database adapter (fixed by removing second argument)
        const [usersCount, shopsCount, collaboratorsCount, productsCount] = await Promise.all([
          DatabaseAdapter.count('users'),
          DatabaseAdapter.count('shops'),
          DatabaseAdapter.count('collaborators'),
          DatabaseAdapter.count('products')
        ]);
        
        // Fetch shops data with mocks as fallback
        const shopsData = await DatabaseAdapter.select<any>('shops', mockShops);
        
        // Fetch products data with mocks as fallback
        const productsData = await DatabaseAdapter.select<any>('products', mockProducts.slice(0, 20));
        
        // Update counts
        setStats({
          users: usersCount,
          shops: shopsCount,
          collaborators: collaboratorsCount,
          products: productsCount
        });
        
        // Format shops data
        const formattedShops: Shop[] = shopsData.map((shop: any) => ({
          id: shop.id,
          userId: shop.user_id,
          name: shop.name,
          description: shop.description,
          address: shop.address,
          phone: shop.phone,
          email: shop.email,
          products: [],
          offers: [],
          aiCredits: shop.ai_credits || 100,
          isApproved: shop.is_approved,
          lastUpdated: shop.last_updated,
          createdAt: shop.created_at,
          logoImage: shop.logo_image,
          bannerImage: shop.banner_image,
          fiscalCode: shop.fiscal_code,
          vatNumber: shop.vat_number,
          location: shop.latitude && shop.longitude ? {
            latitude: shop.latitude,
            longitude: shop.longitude
          } : undefined,
          category: shop.category
        }));
        
        // Format products data
        const formattedProducts: Product[] = productsData.map((product: any) => ({
          id: product.id,
          shopId: product.shop_id,
          name: product.name,
          description: product.description,
          price: product.price,
          discountPrice: product.discount_price,
          category: product.category,
          inventory: product.inventory,
          images: product.images,
          isActive: product.is_active,
          createdAt: product.created_at,
          updatedAt: product.updated_at
        }));
        
        setShopsList(formattedShops);
        setProductsList(formattedProducts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Errore nel caricamento dei dati della dashboard");
        
        // Use mock data as fallback
        setStats({
          users: 10,
          shops: 5,
          collaborators: 8,
          products: 25
        });
        setShopsList(mockShops.map(shop => ({
          ...shop,
          aiCredits: shop.aiCredits || 100
        })));
        setProductsList(mockProducts.slice(0, 20));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600">Caricamento dashboard in corso...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Summary cards section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Utenti"
          description="Utenti registrati"
          value={stats.users.toString()}
          icon={<Users className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/admin/users"
        />
        
        <DashboardCard
          title="Negozi"
          description="Negozi attivi"
          value={stats.shops.toString()}
          icon={<Store className="h-8 w-8 text-green-600" />}
          linkTo="/dashboard/admin/shops"
        />
        
        <DashboardCard
          title="Collaboratori"
          description="Collaboratori registrati"
          value={stats.collaborators.toString()}
          icon={<User className="h-8 w-8 text-purple-600" />}
          linkTo="/dashboard/admin/collaborators"
        />
        
        <DashboardCard
          title="Prodotti"
          description="Prodotti totali"
          value={stats.products.toString()}
          icon={<Package className="h-8 w-8 text-orange-600" />}
          linkTo="/dashboard/admin/products"
        />
      </div>

      {/* Recent shops and activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <RecentShopsCard shops={shopsList} />
        <RecentActivitiesCard />
      </div>

      {/* Global statistics */}
      <GlobalStatisticsCard shops={shopsList} products={productsList} />
    </div>
  );
};

export default AdminDashboard;
