
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/auth';
import { Toaster } from '@/components/ui/toaster';
import { SupabaseWrapper } from '@/components/supabase/SupabaseWrapper';

// Layout components
import AppLayout from '@/components/layout/AppLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';

// Public pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ShopsPage from '@/pages/shops/ShopsPage';
import ShopDetailPage from '@/pages/shops/ShopDetailPage';

// Dashboard pages
import DashboardIndex from '@/pages/dashboard/DashboardIndex';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import OrdersPage from '@/pages/dashboard/user/OrdersPage';
import FavoritesPage from '@/pages/dashboard/user/FavoritesPage';
import LoyaltyPage from '@/pages/dashboard/user/LoyaltyPage';
import NotificationsPage from '@/pages/dashboard/NotificationsPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';

// Shop dashboard pages
import ProductsPage from '@/pages/dashboard/shop/ProductsPage';
import OrderManagementPage from '@/pages/dashboard/shop/OrderManagementPage';
import OfferManagementPage from '@/pages/dashboard/shop/OfferManagementPage';
import CollaboratorsPage from '@/pages/dashboard/shop/CollaboratorsPage';
import CustomersPage from '@/pages/dashboard/shop/customers/CustomersPage';
import ShopSettingsPage from '@/pages/dashboard/shop/ShopSettingsPage';
import ShopAnalyticsPage from '@/pages/dashboard/shop/ShopAnalyticsPage';

// Collaborator dashboard pages
import TasksPage from '@/pages/dashboard/collaborator/TasksPage';
import ReviewsPage from '@/pages/dashboard/collaborator/ReviewsPage';
import EarningsPage from '@/pages/dashboard/collaborator/EarningsPage';
import AvailableTasksPage from '@/pages/dashboard/collaborator/AvailableTasksPage';
import CollaboratorSettingsPage from '@/pages/dashboard/collaborator/CollaboratorSettingsPage';

// Admin dashboard pages
import AdminDashboardPage from '@/pages/dashboard/admin/AdminDashboardPage';
import AdminUsersPage from '@/pages/dashboard/admin/AdminUsersPage';
import AdminShopsPage from '@/pages/dashboard/admin/AdminShopsPage';
import AdminCollaboratorsPage from '@/pages/dashboard/admin/AdminCollaboratorsPage';
import AdminProductsPage from '@/pages/dashboard/admin/AdminProductsPage';
import AdminOrdersPage from '@/pages/dashboard/admin/AdminOrdersPage';
import AdminCategoriesPage from '@/pages/dashboard/admin/AdminCategoriesPage';
import AdminSettingsPage from '@/pages/dashboard/admin/AdminSettingsPage';

// Error pages
import NotFoundPage from '@/pages/errors/NotFoundPage';

// Protected routes
import ProtectedRoute from '@/components/routes/ProtectedRoutes';
import RoleRoute from '@/components/routes/RoleRoute';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <AuthProvider>
        <SupabaseWrapper>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="shops" element={<ShopsPage />} />
                <Route path="shops/:id" element={<ShopDetailPage />} />
              </Route>
              
              {/* Dashboard Routes (Protected) */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardIndex />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="loyalty" element={<LoyaltyPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                
                {/* Shop Dashboard Routes */}
                <Route path="products" element={
                  <RoleRoute allowedRoles={['shop', 'admin']}>
                    <ProductsPage />
                  </RoleRoute>
                } />
                <Route path="orders-management" element={
                  <RoleRoute allowedRoles={['shop', 'admin']}>
                    <OrderManagementPage />
                  </RoleRoute>
                } />
                <Route path="offers" element={
                  <RoleRoute allowedRoles={['shop', 'admin']}>
                    <OfferManagementPage />
                  </RoleRoute>
                } />
                <Route path="collaborators" element={
                  <RoleRoute allowedRoles={['shop', 'admin']}>
                    <CollaboratorsPage />
                  </RoleRoute>
                } />
                <Route path="customers" element={
                  <RoleRoute allowedRoles={['shop', 'admin']}>
                    <CustomersPage />
                  </RoleRoute>
                } />
                <Route path="shop-settings" element={
                  <RoleRoute allowedRoles={['shop', 'admin']}>
                    <ShopSettingsPage />
                  </RoleRoute>
                } />
                <Route path="analytics" element={
                  <RoleRoute allowedRoles={['shop', 'admin']}>
                    <ShopAnalyticsPage />
                  </RoleRoute>
                } />
                
                {/* Collaborator Dashboard Routes */}
                <Route path="tasks" element={
                  <RoleRoute allowedRoles={['collaborator', 'admin']}>
                    <TasksPage />
                  </RoleRoute>
                } />
                <Route path="reviews" element={
                  <RoleRoute allowedRoles={['collaborator', 'admin']}>
                    <ReviewsPage />
                  </RoleRoute>
                } />
                <Route path="earnings" element={
                  <RoleRoute allowedRoles={['collaborator', 'admin']}>
                    <EarningsPage />
                  </RoleRoute>
                } />
                <Route path="available-tasks" element={
                  <RoleRoute allowedRoles={['collaborator', 'admin']}>
                    <AvailableTasksPage />
                  </RoleRoute>
                } />
                <Route path="collaborator-settings" element={
                  <RoleRoute allowedRoles={['collaborator', 'admin']}>
                    <CollaboratorSettingsPage />
                  </RoleRoute>
                } />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/dashboard/admin" element={
                <RoleRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </RoleRoute>
              }>
                <Route index element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="shops" element={<AdminShopsPage />} />
                <Route path="collaborators" element={<AdminCollaboratorsPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Toaster />
        </SupabaseWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
