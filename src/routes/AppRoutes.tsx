
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import { ProtectedRoute, AdminRoute, ShopRoute, CollaboratorRoute } from "../components/routes/ProtectedRoutes";
import ShopsPage from "../pages/shops/ShopsPage";
import ShopDetailPage from "../pages/shops/ShopDetailPage";
import NearestShopsPage from "../pages/shops/NearestShopsPage";
import OffersPage from "../pages/offers/OffersPage";
import ProductsPage from "../pages/dashboard/shop/ProductsPage";
import CustomersPage from "../pages/dashboard/shop/CustomersPage";
import FavoritesPage from "../pages/dashboard/user/FavoritesPage";
import OrdersPage from "../pages/dashboard/user/OrdersPage";
import LoyaltyPage from "../pages/dashboard/user/LoyaltyPage";
import ConvertToShopPage from "../pages/dashboard/profile/ConvertToShopPage";
import ConvertToCollaboratorPage from "../pages/dashboard/profile/ConvertToCollaboratorPage";
import TasksPage from "../pages/dashboard/collaborator/TasksPage";
import AdminDashboardPage from "../pages/dashboard/admin/AdminDashboardPage";
import AdminShopsPage from "../pages/dashboard/admin/ShopsPage";
import CollaboratorsPage from "../pages/dashboard/admin/CollaboratorsPage";
import ProductsAdminPage from "../pages/dashboard/admin/ProductsPage";
import UsersPage from "../pages/dashboard/admin/UsersPage";
import SettingsPage from "../pages/dashboard/admin/SettingsPage";
import ShopSettingsPage from "../pages/dashboard/shop/ShopSettingsPage";
import ShopAnalyticsPage from "../pages/dashboard/shop/analytics/ShopAnalyticsPage";
import AddProductForm from "../components/products/AddProductForm";
import DashboardLayout from "../components/layout/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/shops" element={<ShopsPage />} />
      <Route path="/shops/:id" element={<ShopDetailPage />} />
      <Route path="/shops/nearest" element={<NearestShopsPage />} />
      <Route path="/offers" element={<OffersPage />} />

      {/* Dashboard routes with layout */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardIndex />} />
        
        {/* Shop routes */}
        <Route path="products" element={<ShopRoute><ProductsPage /></ShopRoute>} />
        <Route path="products/add" element={<ShopRoute><AddProductForm /></ShopRoute>} />
        <Route path="products/:id" element={<ShopRoute><AddProductForm /></ShopRoute>} />
        <Route path="products/inventory" element={<ShopRoute><div>Gestione Inventario</div></ShopRoute>} />
        <Route path="customers" element={<ShopRoute><CustomersPage /></ShopRoute>} />
        <Route path="shop/settings" element={<ShopRoute><ShopSettingsPage /></ShopRoute>} />
        <Route path="shop/analytics" element={<ShopRoute><ShopAnalyticsPage /></ShopRoute>} />
        <Route path="shop-orders" element={<ShopRoute><div>Ordini Negozio</div></ShopRoute>} />
        <Route path="shop-orders/:id" element={<ShopRoute><div>Dettaglio Ordine</div></ShopRoute>} />
        <Route path="collaborators" element={<ShopRoute><div>Gestione collaboratori</div></ShopRoute>} />
        <Route path="offers" element={<ShopRoute><div>Gestione offerte</div></ShopRoute>} />
        <Route path="offers/create" element={<ShopRoute><div>Crea Offerta</div></ShopRoute>} />
        <Route path="notifications" element={<ShopRoute><div>Notifiche</div></ShopRoute>} />
        
        {/* User routes */}
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="loyalty" element={<LoyaltyPage />} />
        
        {/* Profile conversion routes */}
        <Route path="convert-to-shop" element={<ConvertToShopPage />} />
        <Route path="convert-to-collaborator" element={<ConvertToCollaboratorPage />} />
        
        {/* Collaborator routes */}
        <Route path="tasks" element={<CollaboratorRoute><TasksPage /></CollaboratorRoute>} />
        <Route path="availability" element={<CollaboratorRoute><div>Disponibilità</div></CollaboratorRoute>} />
        <Route path="reviews" element={<CollaboratorRoute><div>Recensioni</div></CollaboratorRoute>} />
        
        {/* Admin routes */}
        <Route path="admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
        <Route path="admin/shops" element={<AdminRoute><AdminShopsPage /></AdminRoute>} />
        <Route path="admin/collaborators" element={<AdminRoute><CollaboratorsPage /></AdminRoute>} />
        <Route path="admin/products" element={<AdminRoute><ProductsAdminPage /></AdminRoute>} />
        <Route path="admin/products/add" element={<AdminRoute><AddProductForm /></AdminRoute>} />
        <Route path="admin/products/:id" element={<AdminRoute><AddProductForm /></AdminRoute>} />
        <Route path="admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
        <Route path="admin/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />
        <Route path="settings" element={<ProtectedRoute><div>Impostazioni profilo</div></ProtectedRoute>} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
