
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopsPage from "./pages/shops/ShopsPage";
import NearestShopsPage from "./pages/shops/NearestShopsPage";
import OffersPage from "./pages/offers/OffersPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import ConvertToShopPage from "./pages/dashboard/profile/ConvertToShopPage";
import ConvertToCollaboratorPage from "./pages/dashboard/profile/ConvertToCollaboratorPage";
import FavoritesPage from "./pages/dashboard/user/FavoritesPage";
import OrdersPage from "./pages/dashboard/user/OrdersPage";
import LoyaltyPage from "./pages/dashboard/user/LoyaltyPage";
import ProductsPage from "./pages/dashboard/shop/ProductsPage";
import CustomersPage from "./pages/dashboard/shop/CustomersPage";
import TasksPage from "./pages/dashboard/collaborator/TasksPage";

// Admin pages
import AdminDashboardPage from "./pages/dashboard/admin/AdminDashboardPage";
import UsersPage from "./pages/dashboard/admin/UsersPage";
import { default as AdminShopsPage } from "./pages/dashboard/admin/ShopsPage";
import CollaboratorsPage from "./pages/dashboard/admin/CollaboratorsPage";
import { default as AdminProductsPage } from "./pages/dashboard/admin/ProductsPage";
import SettingsPage from "./pages/dashboard/admin/SettingsPage";

const queryClient = new QueryClient();

// Create a protected route component
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

// Create an admin route component
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

// Create a shop route component
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

// Create a collaborator route component
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
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/nearest-shops" element={<NearestShopsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        
        {/* Protected dashboard routes */}
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
          <Route path="admin-settings" element={
            <AdminRoute>
              <SettingsPage />
            </AdminRoute>
          } />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

// The main App component must wrap all providers in the correct order
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
