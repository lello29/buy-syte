
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Customer } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomersTableProps {
  customers: Customer[];
}

const CustomersTable: React.FC<CustomersTableProps> = ({ customers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Elenco Clienti</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ordini</TableHead>
              <TableHead>Totale Speso</TableHead>
              <TableHead>Ultimo Ordine</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orderCount}</TableCell>
                <TableCell>€{customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{customer.lastOrderDate.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">Contatta</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomersTable;
