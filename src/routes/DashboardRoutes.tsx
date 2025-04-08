
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProtectedRoute, AdminRoute } from '@/components/routes/ProtectedRoutes';
import DashboardIndex from '@/pages/dashboard/DashboardIndex';
import AdminDashboardPage from '@/pages/dashboard/admin/AdminDashboardPage';
import SettingsPage from '@/pages/dashboard/admin/SettingsPage';
import { 
  commonDashboardRoutes, 
  userDashboardRoutes, 
  shopDashboardRoutes, 
  collaboratorDashboardRoutes, 
  adminDashboardRoutes,
  getProtectedElement
} from './routesConfig';

const DashboardRoutes = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Routes>
          {/* Index route - dashboard home */}
          <Route path="/" element={<DashboardIndex />} />
          
          {/* Admin routes explicitly defined */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            } 
          />
          
          <Route 
            path="/admin/settings" 
            element={
              <AdminRoute>
                <SettingsPage />
              </AdminRoute>
            } 
          />
          
          {/* Common dashboard routes */}
          {commonDashboardRoutes.map((route, index) => (
            <Route 
              key={`common-${index}`} 
              path={`/${route.path}`} 
              element={route.element} 
            />
          ))}
          
          {/* User-specific dashboard routes */}
          {userDashboardRoutes.map((route, index) => (
            <Route 
              key={`user-${index}`} 
              path={`/${route.path}`} 
              element={route.element} 
            />
          ))}
          
          {/* Shop-specific dashboard routes */}
          {shopDashboardRoutes.map((route, index) => (
            <Route 
              key={`shop-${index}`} 
              path={`/${route.path}`} 
              element={getProtectedElement(route, index)}
            />
          ))}
          
          {/* Collaborator-specific dashboard routes */}
          {collaboratorDashboardRoutes.map((route, index) => (
            <Route 
              key={`collab-${index}`} 
              path={`/${route.path}`} 
              element={getProtectedElement(route, index)}
            />
          ))}
          
          {/* Admin-specific dashboard routes */}
          {adminDashboardRoutes.map((route, index) => (
            <Route 
              key={`admin-${index}`} 
              path={`/${route.path}`} 
              element={
                <AdminRoute>
                  {route.element}
                </AdminRoute>
              }
            />
          ))}
        </Routes>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardRoutes;
