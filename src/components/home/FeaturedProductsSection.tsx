
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";

interface FeaturedProductsSectionProps {
  products: Product[];
}

const FeaturedProductsSection = ({ products }: FeaturedProductsSectionProps) => {
  return (
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
  );
};

export default FeaturedProductsSection;
