
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ProductsSalesHints: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Suggerimenti per aumentare le vendite</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm">
            <div className="rounded-full w-5 h-5 bg-primary text-white flex items-center justify-center text-xs mt-0.5">1</div>
            <span>Aggiungi <strong>immagini di alta qualità</strong> per tutti i tuoi prodotti</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <div className="rounded-full w-5 h-5 bg-primary text-white flex items-center justify-center text-xs mt-0.5">2</div>
            <span>Scrivi <strong>descrizioni dettagliate</strong> che rispondano alle domande dei clienti</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <div className="rounded-full w-5 h-5 bg-primary text-white flex items-center justify-center text-xs mt-0.5">3</div>
            <span>Crea <strong>offerte speciali</strong> per i prodotti più popolari</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <div className="rounded-full w-5 h-5 bg-primary text-white flex items-center justify-center text-xs mt-0.5">4</div>
            <span>Utilizza l'<strong>assistenza AI</strong> per ottimizzare le tue schede prodotto</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProductsSalesHints;
