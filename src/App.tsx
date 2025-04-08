
import { Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { SupabaseWrapper } from '@/components/supabase/SupabaseWrapper';

// Import existing components and pages
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/routes/ProtectedRoutes';
import RoleRoute from '@/components/routes/RoleRoute';
import AppLayout from '@/components/layout/AppLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import Index from '@/pages/Index';
import LoginPage from '@/pages/LoginPage';

// Dashboard pages
import DashboardIndex from '@/pages/dashboard/DashboardIndex';
import OrdersPage from '@/pages/dashboard/user/OrdersPage';
import FavoritesPage from '@/pages/dashboard/user/FavoritesPage';
import LoyaltyPage from '@/pages/dashboard/user/LoyaltyPage';
import TasksPage from '@/pages/dashboard/collaborator/TasksPage';
import AdminDashboardPage from '@/pages/dashboard/admin/AdminDashboardPage';
import AdminUsersPage from '@/pages/dashboard/admin/UsersPage';
import AdminShopsPage from '@/pages/dashboard/admin/AdminShopsPage';
import AdminCollaboratorsPage from '@/pages/dashboard/admin/CollaboratorsPage';
import AdminSettingsPage from '@/pages/dashboard/admin/SettingsPage';

// Create placeholder components for missing pages
const ProfilePage = () => <div>Profile Page</div>;
const NotificationsPage = () => <div>Notifications Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const RegisterPage = () => <div>Register Page</div>;
const ShopsPage = () => <div>Shops Page</div>;
const ShopDetailPage = () => <div>Shop Detail Page</div>;
const NotFoundPage = () => <div>404 - Not Found</div>;
const ProductsPage = () => <div>Products Page</div>;
const OrderManagementPage = () => <div>Order Management Page</div>;
const OfferManagementPage = () => <div>Offer Management Page</div>;
const CollaboratorsPage = () => <div>Collaborators Page</div>;
const CustomersPage = () => <div>Customers Page</div>;
const ShopSettingsPage = () => <div>Shop Settings Page</div>;
const ShopAnalyticsPage = () => <div>Shop Analytics Page</div>;
const ReviewsPage = () => <div>Reviews Page</div>;
const EarningsPage = () => <div>Earnings Page</div>;
const AvailableTasksPage = () => <div>Available Tasks Page</div>;
const CollaboratorSettingsPage = () => <div>Collaborator Settings Page</div>;
const AdminProductsPage = () => <div>Admin Products Page</div>;
const AdminOrdersPage = () => <div>Admin Orders Page</div>;
const AdminCategoriesPage = () => <div>Admin Categories Page</div>;

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <SupabaseWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/login" element={<AppLayout><LoginPage /></AppLayout>} />
          <Route path="/register" element={<AppLayout><RegisterPage /></AppLayout>} />
          <Route path="/shops" element={<AppLayout><ShopsPage /></AppLayout>} />
          <Route path="/shops/:id" element={<AppLayout><ShopDetailPage /></AppLayout>} />
          
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
            
            {/* Admin Routes */}
            <Route path="admin" element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </RoleRoute>
            } />
            <Route path="admin/users" element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminUsersPage />
              </RoleRoute>
            } />
            <Route path="admin/shops" element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminShopsPage />
              </RoleRoute>
            } />
            <Route path="admin/collaborators" element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminCollaboratorsPage />
              </RoleRoute>
            } />
            <Route path="admin/products" element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminProductsPage />
              </RoleRoute>
            } />
            <Route path="admin/orders" element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminOrdersPage />
              </RoleRoute>
            } />
            <Route path="admin/categories" element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminCategoriesPage />
              </RoleRoute>
            } />
            <Route path="admin/settings" element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminSettingsPage />
              </RoleRoute>
            } />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </SupabaseWrapper>
    </ThemeProvider>
  );
}

export default App;
