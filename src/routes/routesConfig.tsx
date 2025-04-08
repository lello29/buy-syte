
import React from 'react';
import { User } from "@/types";
import DashboardLayout from '@/components/layout/DashboardLayout';
import RoleRoute from '@/components/routes/RoleRoute';
import { ProtectedRoute } from '@/components/routes/ProtectedRoutes';
import AppLayout from '@/components/layout/AppLayout';

// Import existing components and pages
import Index from '@/pages/Index';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardIndex from '@/pages/dashboard/DashboardIndex';
import OrdersPage from '@/pages/dashboard/user/OrdersPage';
import FavoritesPage from '@/pages/dashboard/user/FavoritesPage';
import LoyaltyPage from '@/pages/dashboard/user/LoyaltyPage';
import ConvertToShopPage from '@/pages/dashboard/profile/ConvertToShopPage';
import ConvertToCollaboratorPage from '@/pages/dashboard/profile/ConvertToCollaboratorPage';
import TasksPage from '@/pages/dashboard/collaborator/TasksPage';
import AdminUsersPage from '@/pages/dashboard/admin/UsersPage';
import AdminShopsPage from '@/pages/dashboard/admin/AdminShopsPage';
import AdminCollaboratorsPage from '@/pages/dashboard/admin/CollaboratorsPage';
import NotFound from '@/pages/NotFound';

// Define placeholder components for missing pages
const ProfilePage = () => <div>Profile Page</div>;
const NotificationsPage = () => <div>Notifications Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const ShopsPage = () => <div>Shops Page</div>;
const ShopDetailPage = () => <div>Shop Detail Page</div>;
const ProductsPage = () => <div>Products Page</div>;
const OrderManagementPage = () => <div>Order Management Page</div>;
const OfferManagementPage = () => <div>Offer Management Page</div>;
const CollaboratorsPage = () => <div>Collaborators Page</div>;
const CustomersPage = () => <div>Customers Page</div>;
const ShopSettingsPage = () => <div>Shop Settings Page</div>;
const ShopAnalyticsPage = () => <div>Shop AnalyticsPage</div>;
const ReviewsPage = () => <div>Reviews Page</div>;
const EarningsPage = () => <div>Earnings Page</div>;
const AvailableTasksPage = () => <div>Available Tasks Page</div>;
const CollaboratorSettingsPage = () => <div>Collaborator Settings Page</div>;
const AdminProductsPage = () => <div>Admin Products Page</div>;
const AdminOrdersPage = () => <div>Admin Orders Page</div>;
const AdminCategoriesPage = () => <div>Admin Categories Page</div>;

// Public routes configuration
export const publicRoutes = [
  { path: "/", element: <Index />, layout: AppLayout },
  { path: "/login", element: <LoginPage />, layout: AppLayout },
  { path: "/register", element: <RegisterPage />, layout: AppLayout },
  { path: "/shops", element: <ShopsPage />, layout: AppLayout },
  { path: "/shops/:id", element: <ShopDetailPage />, layout: AppLayout },
  { path: "/404", element: <NotFound />, layout: null },
  { path: "*", element: <NotFound />, layout: null }
];

// Dashboard routes common to all user roles
export const commonDashboardRoutes = [
  { path: "profile", element: <ProfilePage /> },
  { path: "notifications", element: <NotificationsPage /> },
  { path: "settings", element: <SettingsPage /> },
];

// User-specific dashboard routes
export const userDashboardRoutes = [
  { path: "orders", element: <OrdersPage /> },
  { path: "favorites", element: <FavoritesPage /> },
  { path: "loyalty", element: <LoyaltyPage /> },
  { path: "convert-to-shop", element: <ConvertToShopPage /> },
  { path: "convert-to-collaborator", element: <ConvertToCollaboratorPage /> }
];

// Shop-specific dashboard routes
export const shopDashboardRoutes = [
  { path: "products", element: <ProductsPage />, roles: ['shop', 'admin'] },
  { path: "orders-management", element: <OrderManagementPage />, roles: ['shop', 'admin'] },
  { path: "offers", element: <OfferManagementPage />, roles: ['shop', 'admin'] },
  { path: "collaborators", element: <CollaboratorsPage />, roles: ['shop', 'admin'] },
  { path: "customers", element: <CustomersPage />, roles: ['shop', 'admin'] },
  { path: "shop-settings", element: <ShopSettingsPage />, roles: ['shop', 'admin'] },
  { path: "analytics", element: <ShopAnalyticsPage />, roles: ['shop', 'admin'] }
];

// Collaborator-specific dashboard routes
export const collaboratorDashboardRoutes = [
  { path: "tasks", element: <TasksPage />, roles: ['collaborator', 'admin'] },
  { path: "reviews", element: <ReviewsPage />, roles: ['collaborator', 'admin'] },
  { path: "earnings", element: <EarningsPage />, roles: ['collaborator', 'admin'] },
  { path: "available-tasks", element: <AvailableTasksPage />, roles: ['collaborator', 'admin'] },
  { path: "collaborator-settings", element: <CollaboratorSettingsPage />, roles: ['collaborator', 'admin'] }
];

// Admin-specific dashboard routes
export const adminDashboardRoutes = [
  { path: "admin/users", element: <AdminUsersPage />, roles: ['admin'] },
  { path: "admin/shops", element: <AdminShopsPage />, roles: ['admin'] },
  { path: "admin/collaborators", element: <AdminCollaboratorsPage />, roles: ['admin'] },
  { path: "admin/products", element: <AdminProductsPage />, roles: ['admin'] },
  { path: "admin/orders", element: <AdminOrdersPage />, roles: ['admin'] },
  { path: "admin/categories", element: <AdminCategoriesPage />, roles: ['admin'] },
  // Nota: abbiamo rimosso questo percorso dall'array perché lo abbiamo già definito esplicitamente nel DashboardRoutes.tsx
  // { path: "admin/settings", element: <AdminSettingsPage />, roles: ['admin'] }
];

// Helper to wrap route elements with role protection if needed
export const getProtectedElement = (route, index) => {
  if (route.roles) {
    return (
      <RoleRoute key={index} allowedRoles={route.roles}>
        {route.element}
      </RoleRoute>
    );
  }
  return route.element;
};
