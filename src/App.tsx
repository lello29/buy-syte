
import React from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { SupabaseWrapper } from '@/components/supabase/SupabaseWrapper';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from '@/routes/PublicRoutes';
import DashboardRoutes from '@/routes/DashboardRoutes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <SupabaseWrapper>
        <AuthProvider>
          <BrowserRouter>
            <PublicRoutes />
            <DashboardRoutes />
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </SupabaseWrapper>
    </ThemeProvider>
  );
}

export default App;
