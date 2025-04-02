import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, ShoppingBag, Users, Star, Search, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { shops, products } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import PromotedShopCard from "@/components/shops/PromotedShopCard";

const Index = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  
  // Filter shops that have active promotions (for demo purposes we'll consider shops with id < 3 as having active promotions)
  const promotedShops = shops.filter(shop => parseInt(shop.id) < 3);

  return (
    <>
      <Navbar />
      <div className="pt-16">
        {/* Search Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              Cerca il tuo prodotto vicino a te
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Cosa stai cercando?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-6 text-lg w-full"
                  />
                </div>
                <div className="relative md:w-1/3">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Località (opzionale)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 py-6 text-lg w-full"
                  />
                </div>
                <Button size="lg" className="text-lg px-8 py-6">
                  Cerca
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Promoted Shops Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8">Negozi con promozioni attive vicino a te</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotedShops.map((shop) => (
                <PromotedShopCard 
                  key={shop.id} 
                  shop={shop} 
                  distance={Math.floor(Math.random() * 10) + 1} // Random distance for demo
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Come funziona ShopHubConnect</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Per i Clienti</h3>
                <p className="text-gray-600">
                  Scopri negozi locali, ricevi offerte personalizzate e tieni traccia dei tuoi acquisti e punti fedeltà.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Per i Negozi</h3>
                <p className="text-gray-600">
                  Gestisci il tuo catalogo prodotti, crea offerte, monitora vendite e connettiti con i clienti.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Per i Collaboratori</h3>
                <p className="text-gray-600">
                  Offri i tuoi servizi ai negozi locali, gestisci le consegne e costruisci la tua reputazione.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Prodotti Popolari</h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img 
                      src={product.images[0] || "/placeholder.svg"} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.discountPrice ? (
                          <>
                            <span className="text-lg font-bold">{product.discountPrice} €</span>
                            <span className="text-sm text-gray-500 line-through ml-2">{product.price} €</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">{product.price} €</span>
                        )}
                      </div>
                      <Link to={`/products/${product.id}`}>
                        <Button size="sm" variant="outline">Dettagli</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/products">
                <Button variant="outline">Visualizza tutti i prodotti</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
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
      </div>
    </>
  );
};

export default Index;
