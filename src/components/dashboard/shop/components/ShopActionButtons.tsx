
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Tag, Users, Layers, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface ShopActionButtonsProps {
  onAddProduct: () => void;
  onManageCategories: () => void;
}

const ShopActionButtons: React.FC<ShopActionButtonsProps> = ({
  onAddProduct,
  onManageCategories
}) => {
  const mainActions = [
    {
      label: "Aggiungi Prodotto",
      icon: <Package className="h-5 w-5 mr-2" />,
      onClick: onAddProduct,
      path: "/dashboard/products",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      label: "Gestione Clienti",
      icon: <Users className="h-5 w-5 mr-2" />,
      onClick: null,
      path: "/dashboard/customers",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      label: "Crea Offerta",
      icon: <Tag className="h-5 w-5 mr-2" />,
      onClick: null,
      path: "/dashboard/offers",
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      label: "Categorie",
      icon: <Layers className="h-5 w-5 mr-2" />,
      onClick: onManageCategories,
      color: "bg-orange-600 hover:bg-orange-700"
    }
  ];

  return (
    <Card className="p-5">
      <h2 className="font-bold text-xl mb-4">Azioni Rapide</h2>
      <div className="grid grid-cols-2 gap-3">
        {mainActions.map((action, idx) => (
          action.path ? (
            <Link 
              key={idx} 
              to={action.path} 
              className="no-underline"
              onClick={action.onClick}
            >
              <Button 
                className={`w-full ${action.color} border-0 text-white`}
              >
                {action.icon}
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button 
              key={idx}
              className={`w-full ${action.color} border-0 text-white`}
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </Button>
          )
        ))}
      </div>
    </Card>
  );
};

export default ShopActionButtons;
