
import React from 'react';
import { Route } from 'react-router-dom';
import { publicRoutes } from './routesConfig';

const PublicRoutes = () => {
  return (
    <>
      {publicRoutes.map((route, index) => {
        // For routes with layout
        if (route.layout) {
          return (
            <Route 
              key={index} 
              path={route.path} 
              element={<route.layout>{route.element}</route.layout>} 
            />
          );
        }
        
        // For routes without layout
        return (
          <Route key={index} path={route.path} element={route.element} />
        );
      })}
    </>
  );
};

export default PublicRoutes;
