
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import ProductTableRow from "./ProductTableRow";
import { 
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow
} from "@/components/ui/table";

interface ProductsTableProps {
  products: any[];
  getShopName: (shopId: string) => string;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onViewProduct: (product: any) => void;
  onAddProduct: () => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  getShopName,
  onToggleStatus,
  onViewProduct,
  onAddProduct
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Lista Prodotti
          </CardTitle>
          <CardDescription>
            Elenco di tutti i prodotti disponibili sulla piattaforma
          </CardDescription>
        </div>
        <Button onClick={onAddProduct}>
          <Plus className="mr-1 h-4 w-4" /> Aggiungi Prodotto
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Negozio</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Prezzo</TableHead>
                  <TableHead>Inventario</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <ProductTableRow 
                    key={product.id}
                    product={product}
                    getShopName={getShopName}
                    onToggleStatus={onToggleStatus}
                    onViewProduct={onViewProduct}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;
