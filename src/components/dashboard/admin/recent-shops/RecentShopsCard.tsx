
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shop } from "@/types";
import { getProductsByShopId } from "@/data/products";

interface RecentShopsCardProps {
  shops: Shop[];
  limit?: number;
}

const RecentShopsCard: React.FC<RecentShopsCardProps> = ({ 
  shops, 
  limit = 4 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Negozi recenti</CardTitle>
        <CardDescription>Ultimi negozi registrati</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Nome</th>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Prodotti</th>
                <th className="px-4 py-3 text-left">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {shops.slice(0, limit).map((shop) => (
                <tr key={shop.id}>
                  <td className="px-4 py-3">{shop.name}</td>
                  <td className="px-4 py-3">
                    {new Date(shop.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {getProductsByShopId(shop.id).length}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Attivo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="ghost" size="sm" className="w-full mt-4">
            Visualizza tutti
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentShopsCard;
