
import React, { useState, useEffect } from "react";
import DashboardCard from "../cards/DashboardCard";
import { Users, Store, User, Package, Loader2 } from "lucide-react";
import RecentShopsCard from "./recent-shops/RecentShopsCard";
import RecentActivitiesCard from "./activity/RecentActivitiesCard";
import GlobalStatisticsCard from "./statistics/GlobalStatisticsCard";
import { supabase } from "@/lib/supabase";
import { Shop, Product } from "@/types";
import { toast } from "sonner";

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
        
        // Fetch counts
        const [usersRes, shopsRes, collaboratorsRes, productsRes] = await Promise.all([
          supabase.from('users').select('id', { count: 'exact' }),
          supabase.from('shops').select('id', { count: 'exact' }),
          supabase.from('collaborators').select('id', { count: 'exact' }),
          supabase.from('products').select('id', { count: 'exact' })
        ]);
        
        // Fetch shops for recent shops card
        const { data: shopsData } = await supabase
          .from('shops')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
          
        // Fetch products for statistics
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .limit(20);
        
        // Update counts
        setStats({
          users: usersRes.count || 0,
          shops: shopsRes.count || 0,
          collaborators: collaboratorsRes.count || 0,
          products: productsRes.count || 0
        });
        
        // Format shops data
        if (shopsData) {
          const formattedShops: Shop[] = shopsData.map(shop => ({
            id: shop.id,
            userId: shop.user_id,
            name: shop.name,
            description: shop.description,
            address: shop.address,
            phone: shop.phone,
            email: shop.email,
            products: [],
            offers: [],
            aiCredits: shop.ai_credits,
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
          
          setShopsList(formattedShops);
        }
        
        // Format products data
        if (productsData) {
          const formattedProducts: Product[] = productsData.map(product => ({
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
          
          setProductsList(formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Errore nel caricamento dei dati della dashboard");
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
