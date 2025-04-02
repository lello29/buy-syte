
import React from 'react';
import { shops } from '@/data/shops';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { getProductsByShopId } from '@/data/products';

const AdminShopsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestione Negozi</h1>
        <Button>Aggiungi Negozio</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tutti i Negozi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Indirizzo</TableHead>
                <TableHead>Prodotti</TableHead>
                <TableHead>Crediti AI</TableHead>
                <TableHead>Ultimo aggiornamento</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{shop.address}</TableCell>
                  <TableCell>{getProductsByShopId(shop.id).length}</TableCell>
                  <TableCell>{shop.aiCredits}</TableCell>
                  <TableCell>{new Date(shop.lastUpdated).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={shop.isApproved === false ? "warning" : "success"}>
                      {shop.isApproved === false ? "In attesa" : "Approvato"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Visualizza</Button>
                      <Button variant="outline" size="sm">Modifica</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminShopsPage;
