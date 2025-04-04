
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "@/pages/Index";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ShopsPage from "@/pages/shops/ShopsPage";
import NearestShopsPage from "@/pages/shops/NearestShopsPage";
import ShopDetailPage from "@/pages/shops/ShopDetailPage";
import OffersPage from "@/pages/offers/OffersPage";
import NotFound from "@/pages/NotFound";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardIndex from "@/pages/dashboard/DashboardIndex";
import ConvertToShopPage from "@/pages/dashboard/profile/ConvertToShopPage";
import ConvertToCollaboratorPage from "@/pages/dashboard/profile/ConvertToCollaboratorPage";
import FavoritesPage from "@/pages/dashboard/user/FavoritesPage";
import OrdersPage from "@/pages/dashboard/user/OrdersPage";
import LoyaltyPage from "@/pages/dashboard/user/LoyaltyPage";
import ProductsPage from "@/pages/dashboard/shop/ProductsPage";
import CustomersPage from "@/pages/dashboard/shop/CustomersPage";
import ShopSettingsPage from "@/pages/dashboard/shop/ShopSettingsPage";
import TasksPage from "@/pages/dashboard/collaborator/TasksPage";
import AdminDashboardPage from "@/pages/dashboard/admin/AdminDashboardPage";
import SettingsPage from "@/pages/dashboard/admin/SettingsPage";
import UsersPage from "@/pages/dashboard/admin/UsersPage";
import AdminShopsPage from "@/pages/dashboard/admin/AdminShopsPage";
import CollaboratorsPage from "@/pages/dashboard/admin/CollaboratorsPage";
import { default as AdminProductsPage } from "@/pages/dashboard/admin/ProductsPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const ShopRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser || currentUser.role !== "shop") {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const CollaboratorRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser || currentUser.role !== "collaborator") {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/shops/:shopId" element={<ShopDetailPage />} />
        <Route path="/shops/nearest" element={<NearestShopsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/not-found" element={<NotFound />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardIndex />} />
          
          {/* User routes */}
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="loyalty" element={<LoyaltyPage />} />
          <Route path="convert-shop" element={<ConvertToShopPage />} />
          <Route path="convert-collaborator" element={<ConvertToCollaboratorPage />} />
          
          {/* Shop routes */}
          <Route path="products" element={
            <ShopRoute>
              <ProductsPage />
            </ShopRoute>
          } />
          <Route path="customers" element={
            <ShopRoute>
              <CustomersPage />
            </ShopRoute>
          } />
          <Route path="shop-orders" element={
            <ShopRoute>
              <OrdersPage />
            </ShopRoute>
          } />
          <Route path="offers" element={
            <ShopRoute>
              <OffersPage />
            </ShopRoute>
          } />
          <Route path="shop-settings" element={
            <ShopRoute>
              <ShopSettingsPage />
            </ShopRoute>
          } />
          
          {/* Collaborator routes */}
          <Route path="tasks" element={
            <CollaboratorRoute>
              <TasksPage />
            </CollaboratorRoute>
          } />
          
          {/* Admin routes */}
          <Route path="admin" element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          } />
          <Route path="admin/settings" element={
            <AdminRoute>
              <SettingsPage />
            </AdminRoute>
          } />
          <Route path="users" element={
            <AdminRoute>
              <UsersPage />
            </AdminRoute>
          } />
          <Route path="admin-shops" element={
            <AdminRoute>
              <AdminShopsPage />
            </AdminRoute>
          } />
          <Route path="admin-collaborators" element={
            <AdminRoute>
              <CollaboratorsPage />
            </AdminRoute>
          } />
          <Route path="admin-products" element={
            <AdminRoute>
              <AdminProductsPage />
            </AdminRoute>
          } />
        </Route>
        
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
