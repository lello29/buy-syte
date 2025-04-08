
import React from 'react';
import { Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { SupabaseWrapper } from '@/components/supabase/SupabaseWrapper';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import PublicRoutes from '@/routes/PublicRoutes';
import DashboardRoutes from '@/routes/DashboardRoutes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <SupabaseWrapper>
        <AuthProvider>
          <Routes>
            <PublicRoutes />
            <DashboardRoutes />
          </Routes>
          <Toaster />
        </AuthProvider>
      </SupabaseWrapper>
    </ThemeProvider>
  );
}

export default App;
