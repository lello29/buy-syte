
import React from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { SupabaseWrapper } from '@/components/supabase/SupabaseWrapper';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from '@/routes/PublicRoutes';
import DashboardRoutes from '@/routes/DashboardRoutes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <SupabaseWrapper>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/dashboard/*" element={<DashboardRoutes />} />
              <Route path="/*" element={<PublicRoutes />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </Router>
      </SupabaseWrapper>
    </ThemeProvider>
  );
}

export default App;
