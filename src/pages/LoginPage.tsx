
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Accedi al tuo account"
      description="Inserisci le tue credenziali per accedere"
      footerText="Non hai un account?"
      footerLink={{ text: "Registrati", to: "/register" }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nome@esempio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Password dimenticata?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Demo accounts info */}
        <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 border border-blue-200">
          <p className="font-semibold mb-1">Account demo funzionanti:</p>
          <p>- Cliente: cliente@test.com</p>
          <p>- Negozio: negozio@test.com</p>
          <p>- Gelateria: info@gelateriaartigianale.it</p>
          <p>- Admin: admin@test.com</p>
          <p className="mt-1 text-xs italic">Usa qualsiasi password</p>
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Accedi
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
