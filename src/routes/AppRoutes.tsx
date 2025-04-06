
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import { ProtectedRoute } from "../components/routes/ProtectedRoutes";
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
import AdminShopsPage from "../pages/dashboard/admin/AdminShopsPage";
import CollaboratorsPage from "../pages/dashboard/admin/CollaboratorsPage";
import ProductsAdminPage from "../pages/dashboard/admin/ProductsPage";
import UsersPage from "../pages/dashboard/admin/UsersPage";
import SettingsPage from "../pages/dashboard/admin/SettingsPage";
import ShopSettingsPage from "../pages/dashboard/shop/ShopSettingsPage";
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
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/add" element={<AddProductForm />} />
        <Route path="products/:id" element={<AddProductForm />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="shop/settings" element={<ShopSettingsPage />} />
        
        {/* User routes */}
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="loyalty" element={<LoyaltyPage />} />
        
        {/* Profile conversion routes */}
        <Route path="convert-to-shop" element={<ConvertToShopPage />} />
        <Route path="convert-to-collaborator" element={<ConvertToCollaboratorPage />} />
        
        {/* Collaborator routes */}
        <Route path="tasks" element={<TasksPage />} />
        
        {/* Admin routes */}
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="admin/shops" element={<AdminShopsPage />} />
        <Route path="admin/collaborators" element={<CollaboratorsPage />} />
        <Route path="admin/products" element={<ProductsAdminPage />} />
        <Route path="admin/products/:id" element={<AddProductForm />} />
        <Route path="admin/users" element={<UsersPage />} />
        <Route path="admin/settings" element={<SettingsPage />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
