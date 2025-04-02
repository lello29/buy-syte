import React, { useState } from "react";
import { Link } from "react-router-dom";
import { shops, getShopById } from "@/data/mockData";
import { Store, Search, Heart, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ShopsPage = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShops, setFilteredShops] = useState(shops);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = shops.filter(shop =>
      shop.name.toLowerCase().includes(term.toLowerCase()) ||
      shop.description.toLowerCase().includes(term.toLowerCase()) ||
      shop.categories?.some(category => category.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredShops(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold tracking-tight">Negozi</h1>
      <p className="text-muted-foreground">
        Esplora i negozi disponibili e scopri i loro prodotti.
      </p>

      <div className="mt-4">
        <Input
          type="search"
          placeholder="Cerca negozi..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredShops.map((shop) => (
          <Card key={shop.id} className="overflow-hidden h-full flex flex-col">
            <div className="h-40 bg-gray-100 relative">
              {shop.bannerImage ? (
                <img
                  src={shop.bannerImage}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  <Store className="h-12 w-12 text-primary/40" />
                </div>
              )}
              
              {shop.logoImage && (
                <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-md bg-white shadow-md overflow-hidden border-2 border-white">
                  <img
                    src={shop.logoImage}
                    alt={`${shop.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            <CardContent className="flex-grow flex flex-col p-4 pt-8">
              <h3 className="text-xl font-semibold">{shop.name}</h3>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm flex-grow">
                {shop.description}
              </p>
              
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">{shop.address}</span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button asChild size="sm">
                  <Link to={`/shops/${shop.id}`}>Visita Negozio</Link>
                </Button>
                
                {/* Favorite Button (Placeholder) */}
                {/* <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-1" />
                  Preferiti
                </Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredShops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nessun negozio trovato.</p>
        </div>
      )}
    </div>
  );
};

export default ShopsPage;
