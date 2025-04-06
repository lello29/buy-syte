
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const PromotionBanner: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-start space-x-4 mb-4 md:mb-0">
            <div className="bg-blue-100 rounded-full p-3">
              <Megaphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Aumenta le tue vendite!</h3>
              <p className="text-gray-600 max-w-md">
                Crea un'offerta promozionale per attirare nuovi clienti. Le offerte speciali
                possono aumentare le vendite fino al 30%.
              </p>
            </div>
          </div>
          <Link to="/dashboard/offers/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Crea Offerta
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionBanner;
