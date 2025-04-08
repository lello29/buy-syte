
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { SupabaseWrapper } from '@/components/supabase/SupabaseWrapper';

// Import existing components and pages
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/routes/ProtectedRoutes';
import RoleRoute from '@/components/routes/RoleRoute';

// Dashboard pages
import DashboardIndex from '@/pages/dashboard/DashboardIndex';
import OrdersPage from '@/pages/dashboard/user/OrdersPage';
import FavoritesPage from '@/pages/dashboard/user/FavoritesPage';
import LoyaltyPage from '@/pages/dashboard/user/LoyaltyPage';
import TasksPage from '@/pages/dashboard/collaborator/TasksPage';

// Create placeholder components for missing pages
const AppLayout = ({ children }) => <>{children}</>;
const AdminLayout = ({ children }) => <>{children}</>;
const ProfilePage = () => <div>Profile Page</div>;
const NotificationsPage = () => <div>Notifications Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const HomePage = () => <div>Home Page</div>;
const LoginPage = () => <div>Login Page</div>;
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
const AdminDashboardPage = () => <div>Admin Dashboard Page</div>;
const AdminUsersPage = () => <div>Admin Users Page</div>;
const AdminShopsPage = () => <div>Admin Shops Page</div>;
const AdminCollaboratorsPage = () => <div>Admin Collaborators Page</div>;
const AdminProductsPage = () => <div>Admin Products Page</div>;
const AdminOrdersPage = () => <div>Admin Orders Page</div>;
const AdminCategoriesPage = () => <div>Admin Categories Page</div>;
const AdminSettingsPage = () => <div>Admin Settings Page</div>;

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <SupabaseWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AppLayout>Content goes here</AppLayout>}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="shops" element={<ShopsPage />} />
            <Route path="shops/:id" element={<ShopDetailPage />} />
          </Route>
          
          {/* Dashboard Routes (Protected) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>Content goes here</DashboardLayout>
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
              <AdminLayout>Content goes here</AdminLayout>
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
        <Toaster />
      </SupabaseWrapper>
    </ThemeProvider>
  );
}

export default App;
