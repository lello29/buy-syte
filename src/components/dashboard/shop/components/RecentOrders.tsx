
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  customerName: string;
  date: Date;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

interface RecentOrdersProps {
  orders: Order[];
}

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'In attesa';
    case 'processing':
      return 'In lavorazione';
    case 'completed':
      return 'Completato';
    case 'cancelled':
      return 'Annullato';
    default:
      return status;
  }
};

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Ordini Recenti
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="divide-y">
            {orders.map((order) => (
              <div key={order.id} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-gray-500">
                    {order.date.toLocaleDateString()} - €{order.total.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={`${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </Badge>
                  <Link to={`/dashboard/shop-orders/${order.id}`}>
                    <Button size="sm" variant="ghost">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-gray-500">
            <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nessun ordine recente</p>
          </div>
        )}
        
        <div className="mt-4 text-center">
          <Link to="/dashboard/shop-orders">
            <Button variant="outline" size="sm">
              Vedi tutti gli ordini
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
