
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routesConfig';

const PublicRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        // For routes with layout
        if (route.layout) {
          const Layout = route.layout;
          return (
            <Route 
              key={index} 
              path={route.path.replace(/^\/+/, '')} 
              element={<Layout>{route.element}</Layout>} 
            />
          );
        }
        
        // For routes without layout
        return (
          <Route 
            key={index} 
            path={route.path.replace(/^\/+/, '')} 
            element={route.element} 
          />
        );
      })}
    </Routes>
  );
};

export default PublicRoutes;
