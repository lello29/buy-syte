
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <div className="flex justify-center mb-4">
          <FileQuestion className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Pagina non trovata</p>
        <p className="text-gray-500 mb-8">
          La pagina che stai cercando potrebbe essere stata rimossa o temporaneamente non disponibile.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Torna alla Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Vai alla Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
