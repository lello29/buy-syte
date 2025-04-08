
import React from 'react';
import { Route } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/routes/ProtectedRoutes';
import DashboardIndex from '@/pages/dashboard/DashboardIndex';
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
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      {/* Index route - dashboard home */}
      <Route index element={<DashboardIndex />} />
      
      {/* Common dashboard routes */}
      {commonDashboardRoutes.map((route, index) => (
        <Route key={`common-${index}`} path={route.path} element={route.element} />
      ))}
      
      {/* User-specific dashboard routes */}
      {userDashboardRoutes.map((route, index) => (
        <Route key={`user-${index}`} path={route.path} element={route.element} />
      ))}
      
      {/* Shop-specific dashboard routes */}
      {shopDashboardRoutes.map((route, index) => (
        <Route 
          key={`shop-${index}`} 
          path={route.path} 
          element={getProtectedElement(route, index)}
        />
      ))}
      
      {/* Collaborator-specific dashboard routes */}
      {collaboratorDashboardRoutes.map((route, index) => (
        <Route 
          key={`collab-${index}`} 
          path={route.path} 
          element={getProtectedElement(route, index)}
        />
      ))}
      
      {/* Admin-specific dashboard routes */}
      {adminDashboardRoutes.map((route, index) => (
        <Route 
          key={`admin-${index}`} 
          path={route.path} 
          element={getProtectedElement(route, index)}
        />
      ))}
    </Route>
  );
};

export default DashboardRoutes;
