
import React from "react";
import { Link } from "react-router-dom";
import { Store } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Store className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold">ShopHubConnect</span>
            </div>
            <p className="text-gray-300">
              La piattaforma che connette negozi fisici e clienti.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Link Rapidi</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/shops" className="text-gray-300 hover:text-white">Negozi</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white">Prodotti</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white">Registrati</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Servizi</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Per Negozi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Per Clienti</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Per Collaboratori</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Assistenza AI</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Contatti</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">info@shophubconnect.com</li>
              <li className="text-gray-300">+39 02 1234567</li>
              <li className="text-gray-300">Via Roma 123, Milano</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ShopHubConnect. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
