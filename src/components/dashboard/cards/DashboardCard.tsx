
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
  linkTo: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  value, 
  icon, 
  linkTo 
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <Link to={linkTo}>
            <Button variant="ghost" size="sm" className="w-full justify-between">
              Visualizza dettagli
              <span>→</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
