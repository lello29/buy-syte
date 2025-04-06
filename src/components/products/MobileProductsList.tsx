
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Check, X, Plus, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  shopId: string;
  category: string;
  price: number;
  discountPrice?: number;
  inventory: number;
  isActive: boolean;
}

interface MobileProductsListProps {
  products: Product[];
  shopNames: Record<string, string>;
  onToggleProductStatus: (id: string, isActive: boolean) => void;
  onAddProduct: () => void;
  onViewProduct: (product: Product) => void;
}

const MobileProductsList: React.FC<MobileProductsListProps> = ({
  products,
  shopNames,
  onToggleProductStatus,
  onAddProduct,
  onViewProduct
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button 
        className="w-full bg-[#0a3276] hover:bg-[#0a3276]/90 text-white font-bold py-3 rounded-md flex items-center justify-center"
        onClick={onAddProduct}
      >
        <Plus className="h-5 w-5 mr-2" />
        Aggiungi nuovo prodotto
      </Button>
      
      <div className="space-y-1">
        {products.map((product) => (
          <div key={product.id} className="border rounded-md overflow-hidden mb-4 bg-white">
            <div className="p-4">
              <div className="text-2xl font-bold">{product.name}</div>
              <div className="text-gray-600 text-sm mt-1 truncate">{product.description.substring(0, 60)}...</div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <Badge className="mr-2">{product.category}</Badge>
                  <Badge variant={product.isActive ? "success" : "destructive"}>
                    {product.isActive ? "Attivo" : "Inattivo"}
                  </Badge>
                </div>
                <div className="font-bold">
                  {product.discountPrice ? (
                    <div>
                      <span className="text-green-600">€{product.discountPrice.toFixed(2)}</span>
                      <span className="text-gray-500 line-through text-sm ml-1">€{product.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span>€{product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Negozio: {shopNames[product.shopId] || "Sconosciuto"}
              </div>
              <div className="text-sm mt-1">
                Inventario: <span className="font-semibold">{product.inventory}</span> unità
              </div>
            </div>
            <div className="flex border-t">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-gray-700 hover:bg-gray-100"
                onClick={() => onToggleProductStatus(product.id, !product.isActive)}
              >
                {product.isActive ? (
                  <><X className="h-5 w-5 mr-1" /> Disattiva</>
                ) : (
                  <><Check className="h-5 w-5 mr-1" /> Attiva</>
                )}
              </Button>
              <Link 
                to={`/dashboard/products/${product.id}`}
                className="flex-1 flex items-center justify-center rounded-none h-12 text-blue-700 hover:bg-blue-50"
              >
                <Eye className="h-5 w-5 mr-1" />
                Visualizza
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileProductsList;
