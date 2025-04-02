
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, ShoppingBag, Users, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { shops, products } from "@/data/mockData";

const Index = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Store className="h-16 w-16 mx-auto text-primary mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ShopHubConnect
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              La piattaforma che connette negozi fisici e clienti.
              Scopri offerte esclusive e gestisci il tuo negozio in un'unica soluzione.
            </p>
            
            {!currentUser ? (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8">
                    Inizia ora
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Accedi
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8">
                  Vai alla Dashboard
                </Button>
              </Link>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
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

        {/* Featured Shops Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Negozi in Evidenza</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {shops.slice(0, 3).map((shop) => (
                <Card key={shop.id} className="overflow-hidden">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <Store className="h-16 w-16 text-gray-400" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                    <div className="flex items-center text-amber-500 mb-4">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5" />
                      <span className="ml-2 text-gray-600">4.0</span>
                    </div>
                    <Link to={`/shops/${shop.id}`}>
                      <Button variant="outline" className="w-full">
                        Visualizza negozio
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/shops">
                <Button variant="outline">Visualizza tutti i negozi</Button>
              </Link>
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
