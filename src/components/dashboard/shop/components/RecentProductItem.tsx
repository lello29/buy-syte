
import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentProductItemProps {
  product: any;
}

const RecentProductItem: React.FC<RecentProductItemProps> = ({ product }) => {
  return (
    <Link to={`/dashboard/products/${product.id}`}>
      <div className="flex items-center justify-between py-4 border-b last:border-b-0">
        <div className="flex items-center">
          <div className="h-16 w-16 bg-gray-100 rounded-lg mr-4 overflow-hidden">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-lg font-bold">€ {product.price.toFixed(2)}</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </Link>
  );
};

export default RecentProductItem;
